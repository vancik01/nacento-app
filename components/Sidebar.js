import { AccordionSummary } from '@mui/material'
import { Switch } from '@mui/material'
import { Button } from '@mui/material'
import { AccordionDetails } from '@mui/material'
import { Accordion } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useData } from '../context/AppWrap'
import { useLayout } from '../context/LayoutContext'
import ArrowDown from '../public/SVG/ArrowDown'
import Logo from '../public/SVG/Logo'
import PaintBrush from "../public/SVG/PaintBrush"
import TableIcon from '../public/SVG/TableIcon'
import {motion} from "framer-motion"
import { layoutConfig } from '../lib/data'
import ButtonPrimary from './ButtonPrimary'
import Paper from '../public/SVG/Paper'
import { AnimatePresence } from 'framer-motion'
import { AnimateSharedLayout } from 'framer-motion'
import CloseSidebar from '../public/SVG/CloseSidebar'

export default function Sidebar() {
    const {getTitle, headers, reorderingBlocks, setreorderingBlocks, setdownload, download, displaySidebar, setdisplaySidebar} = useData()
    const {displayColumns, handleDisplayColumnsChange, setprimaryColor, primaryColor, isHorizontal, setisHorizontal} = useLayout()
    const [opened, setopened] = useState("")

    function handleSetOpen(id){
        if(opened === "blok" && reorderingBlocks)
        {
            setreorderingBlocks(false)
        }
        if(opened === id){
            setopened("")
        }else{
            setopened(id)
        }
    }
    

    return (
    <div className='fixed left-0 top-0 bottom-0 z-40 w-[300px] '>
        <div className='relative w-fit'>  
            <div className='py-10 px-6  shadow-lg bg-white h-screen'>
                    <div className='flex flex-col min-h-full'>
                        <div className='min-w-28 w-28'>
                            <Logo></Logo>
                        </div>
                        
                        <div className='mt-10'>
                            <Accordion expanded={opened === "strana"} >
                                <AccordionSummary expandIcon={<ArrowDown />} onClick={()=>{handleSetOpen("strana")}}>
                                    <div className='flex items-center gap-2'>
                                        <TableIcon color={primaryColor}></TableIcon>
                                        <div>
                                            Strana
                                        </div>
                                    </div>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <div>
                                        <h3>Orientácia:</h3>
                                        <div className='flex items-center gap-4 mt-3'>
                                            <button onClick={()=>{setisHorizontal(false)}} style={{backgroundColor:!isHorizontal ? primaryColor: ""} } className='w-10 h-10 bg-gray-100 flex items-center justify-center rounded-md'>
                                                <div className='w-5'>
                                                    <Paper color={isHorizontal?"#d6d6d6":"#fff"}></Paper>
                                                </div>

                                            </button>

                                            <button onClick={()=>{setisHorizontal(true)}} style={{backgroundColor:isHorizontal ? primaryColor: ""} } className='w-10 h-10 bg-gray-100 flex items-center justify-center rounded-md'>
                                                <div className='w-5 -rotate-90'>
                                                    <Paper color={!isHorizontal?"#d6d6d6":"#fff"}></Paper>
                                                </div>

                                            </button>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>      

                            <Accordion expanded={opened === "blok"} >
                                <AccordionSummary expandIcon={<ArrowDown />} onClick={()=>{handleSetOpen("blok")}}>
                                    <div className='flex items-center gap-2'>
                                        <TableIcon color={primaryColor}></TableIcon>
                                        <div>
                                            Blok
                                        </div>
                                    </div>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <div className='flex  items-center'>
                                        <ButtonPrimary className='w-full' variant='outlined' style={{fontSize:12}}  onClick={()=>{setreorderingBlocks(!reorderingBlocks)}}>
                                            {reorderingBlocks ?"Uložiť" : "Usporiadať bloky"}
                                        </ButtonPrimary>
                                        
                                    </div>
                                </AccordionDetails>
                            </Accordion>   


                            
                            <Accordion expanded={opened === "tabulka"} >
                                <AccordionSummary expandIcon={<ArrowDown />} onClick={()=>{handleSetOpen("tabulka")}}>
                                    <div className='flex items-center gap-2'>
                                        <TableIcon color={primaryColor}></TableIcon>
                                        <div>
                                            Tabulka
                                        </div>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='flex flex-col items-start justify-between flex-wrap gap-4'>
                                        {headers.map((header, i)=>{
                                            return(
                                                <div key={i} className='flex items-center justify-between w-full text-xs'>
                                                    <div>{getTitle(header, "sk").long}{" "} 
                                                        <span className='text-gray-300'>
                                                            ({getTitle(header, "sk").short})
                                                        </span>
                                                    </div>
                                                    <Switch 
                                                        size='small'
                                                        defaultChecked={displayColumns.includes(header)} 
                                                        onChange={()=>{handleDisplayColumnsChange(header)}}
                                                        />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </AccordionDetails>
                            </Accordion> 

                            <Accordion expanded={opened === "vzhlad"} >
                                <AccordionSummary expandIcon={<ArrowDown />} onClick={()=>{handleSetOpen("vzhlad")}}>
                                    <div className='flex items-center gap-2'>
                                        <div className='w-4'>
                                            <PaintBrush color={primaryColor}></PaintBrush>
                                        </div>
                                        <div>
                                            Vzhľad
                                        </div>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='mb-2 font-medium'>Hlavná farba</div>
                                    
                                    <div className='grid grid-cols-5 gap-2 w-52'>
                                        {layoutConfig.defaultColors.map((color, i)=>{
                                            return(
                                                <button 
                                                    key={i}
                                                    className={`rounded-lg w-full aspect-square bg-opacity-40 transition-all duration-75 ${color == primaryColor ?"shadow-md border-white border-opacity-60 border-4" : ""}`} 
                                                    style={{backgroundColor:color}}
                                                    onClick={()=>{setprimaryColor(color)}}
                                                >
                                                </button>
                                            )
                                        })}
                                    </div>
                                </AccordionDetails>
                            </Accordion> 

                        </div>
                        <div className='mt-auto w-full'>
                            <ButtonPrimary 
                                scale={0.98}
                                className='w-full'
                                onClick={()=>{setdownload(!download)}}> 
                                Stiahnuť ponuku 
                            </ButtonPrimary>

                            <div className="flex w-full mt-6">
                                <button className='w-2 ml-auto' onClick={()=>{setdisplaySidebar(false)}}>
                                    <CloseSidebar></CloseSidebar>
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
  )
}
