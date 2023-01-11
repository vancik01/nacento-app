import React, { useEffect, useState } from 'react'
import { useData } from '../context/AppWrap'
import Block from './Block'
import BottomBar from './BottomBar'
import { DownloadLink } from './Pdf'
import {motion} from "framer-motion"
import { AnimatePresence } from 'framer-motion'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Switch } from '@mui/material'
import Modal from './Modal'
import { Button } from '@mui/material'
import Logo from '../public/SVG/Logo'
import { Input } from '@mui/material'
import { TextField } from '@mui/material'
import SupplyerInfo from './SupplyerInfo'

export default function CenovaPonuka() {
    const [winReady, setwinReady] = useState(false)
    const [scrollPosition, setScrollPosition] = useState(0);
    const [reorderingBlocks, setreorderingBlocks] = useState(false)
    const {data,headers,total,reorderBlocks, name, setname} = useData()
    const [download, setdownload] = useState(false)
    useEffect(() => {
      setwinReady(true)      
    },)

    useEffect(() => {
        window.addEventListener("scroll", ()=>{setScrollPosition(window.pageYOffset)});

        return () => {
            window.removeEventListener("scroll", ()=>{null});
        };

    }, []);

    
    

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
    }
    return (
        <div className='mx-auto max-w-6xl my-20 py-10'>
            <AnimatePresence>
                { scrollPosition > 300 &&
                    
                        <motion.div initial={{y:"100%"}} exit={{y:"100%"}} animate={{y:0}} className="fixed bottom-0 left-0 right-0 z-50 ">
                            <BottomBar></BottomBar>
                        </motion.div>
                }
            </AnimatePresence>
            <div className='w-32'>
                <Logo></Logo>
            </div>
            <div className='mt-10'>
                <Input 
                    className='text-3xl w-3/4' 
                    variant="outlined" 
                    placeholder="Zadajte názov..." 
                    value={name} 
                    onChange={(e)=>{setname(e.target.value)}} 
                />
               
            </div>
            <div className="flex flex-row gap-20 my-8">
                <div>
                    <h3>Objednavatel:</h3>
                    <div>
                        <div>{data.customer}</div>
                    </div>
                </div>

                <div>
                    <SupplyerInfo></SupplyerInfo>
                </div>

                <div>
                <h3>Cena:</h3>
                <div>
                    <div>Cena Montáže: {numberWithCommas(total.montaz.toFixed(2))} €</div>
                    <div>Cena Dodávky: {numberWithCommas(total.dodavka.toFixed(2))} €</div>
                    <div className="w-full h-[1px] bg-row-odd my-3"></div>
                    <div>Spolu: {numberWithCommas(total.total.toFixed(2))} € <span className='text-[10px]'>bez DPH</span></div>
                    <div>DPH 20%: {numberWithCommas((total.total * 0.2).toFixed(2))} €</div>
                    <div className='mt-2 font-medium text-lg'>Cena spolu: {numberWithCommas((total.total * 1.2).toFixed(2))} € <span className='text-[10px]'>vrátane DPH</span></div>
                </div>
                </div>  

            </div>
            <AnimatePresence>
                {
                    download &&
                    <Modal title="Stiahnuť ponuku" close={()=>{setdownload(false)}} >
                        <DownloadLink close={()=>{setdownload(false)}} />
                    </Modal>
                }
            </AnimatePresence>

            <div className='flex-row gap-7 flex items-center justify-between'>
                <div className='flex  items-center'>
                    <div onClick={()=>{setreorderingBlocks(!reorderingBlocks)}}>Usporiadať bloky</div>
                    <Switch value={reorderingBlocks} onChange={()=>{setreorderingBlocks(!reorderingBlocks)}}/>
                </div>
                <div className='flex items-center'>
                    <Button variant='contained' className='text-row-header hover:text-white' onClick={()=>{setdownload(!download)}}> Stiahnuť ponuku </Button>
                </div>

            </div>
            
            <DragDropContext onDragEnd={reorderBlocks} onDragUpdate={(e)=>{console.log(e)}} >
                <Droppable droppableId={`block`}>
                    {(provided)=>(
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {winReady && data.blocks.map((block,i)=>{
                                    return(                                        
                                        <Draggable key={i} draggableId={`block-${i}`} index={i}>
                                            {(provided)=>(
                                                <div {...provided.draggableProps} ref={provided.innerRef}  >
                                                    <Block key={i} block={block} headers={headers} number={i} collapsed={reorderingBlocks} dragHandleProps={{...provided.dragHandleProps}} />
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                })
                            }
                            {provided.placeholder}
                        </div>                        
                    )}
                </Droppable>
            </DragDropContext>            
        </div>
    )
}


