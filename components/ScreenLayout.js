import { AnimatePresence } from 'framer-motion'
import { AnimateSharedLayout } from 'framer-motion'
import React from 'react'
import { useData } from '../context/AppWrap'
import { useLayout } from '../context/LayoutContext'
import CenovaPonuka from './CenovaPonuka'
import Sidebar from './Sidebar'
import {motion} from "framer-motion"
import OpenSidebar from '../public/SVG/OpenSidebar'

export default function ScreenLayout() {
    const {displaySidebar, setdisplaySidebar} = useData()
  return (
    <div>
        
            
                <div className='grid' style={{gridTemplateColumns:"auto 1fr"}}>
                    <div className='w-fit relative h-screen'>
                        <AnimatePresence mode='wait'>
                            {displaySidebar &&
                                <motion.div key={"sidebar"} initial={{x:-300, width:0}} animate={{x:0,width:300}} exit={{x:-300, width:0}}>
                                    <Sidebar></Sidebar>
                                </motion.div>
                            }
                            {!displaySidebar&&<div></div>}
                            {!displaySidebar&&<motion.button initial={{x:-50}} animate={{x:0}} onClick={()=>{setdisplaySidebar(!displaySidebar)}} className='absolute top-12 p-3 -right-12 z-50 bg-white shadow-lg'>
                                <div className='w-6'><OpenSidebar></OpenSidebar></div>
                            </motion.button>}
                        </AnimatePresence>
                        
                    </div>

                    

                    <div>
                        <CenovaPonuka></CenovaPonuka>
                    </div>
                </div>

            
        
        <div>

            
        </div>
        
    </div>
  )
}
