import React from 'react'
import {motion} from "framer-motion"

export default function Modal({children, title, close}) {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className='fixed top-0 left-0 right-0 bottom-0 bg-[#000] bg-opacity-50 z-50 flex justify-center items-center' >
       
       <div className='bg-white rounded-md min-h-[300px] min-w-[400px] p-6 relative'>
        <button onClick={close} className='absolute right-6 top-6'>Close</button>
        <h2>{title}</h2>
        {children}
       </div>
    </motion.div>
  )
}
