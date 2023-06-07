import React, { useState, useEffect } from 'react'
import Close from '../../public/assets/general/Close'
import { motion } from "framer-motion"
import { AnimatePresence } from 'framer-motion'

function PopUp({ title, open, setOpen, children}) {

  useEffect(() => {
    if(open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    }, [open]);

  return (
        <>
        {open && 
        <AnimatePresence>

            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className='fixed inset-0 bg-black bg-opacity-60 z-[200] flex justify-center items-center'>
    
                <motion.div
                    key="template-body"
                    initial={{ opacity: 0, y: 20 }}
                    exit={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="relative z-[100]"
                >				
                        <div className='px-14 py-14 bg-white rounded-md shadow-2xl'>
                            <div className="p-2 absolute right-5 top-5 hover:bg-gray-300 hover:opacity-100 opacity-50 rounded cursor-pointer trans" 
                                onClick={() => setOpen(false)}>
                                <Close/>
                            </div>
                            {title && <h1 className="text-2xl font-semibold pb-4">{title}</h1>}
                            {children}
                        </div>	

                        
                </motion.div> 
            </motion.div>
        </AnimatePresence>
        }
    </>
  )
}

export default PopUp
