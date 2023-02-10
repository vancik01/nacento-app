import React from 'react'
import {motion} from "framer-motion"
import Close from '../public/SVG/Close'

export default function Modal({children, title, close}) {
  return (
    <motion.div initial={{opacity:0}} exit={{}} animate={{y:0, opacity:1}} className='fixed top-0 left-0 right-0 bottom-0 bg-[#000] bg-opacity-50 z-50 flex justify-center items-center'>
       <div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.1}} className='bg-white rounded-md min-h-[300px] min-w-[400px] p-6 relative'>
          <button onClick={close} className='absolute right-6 top-6'><Close></Close></button>
          <h2>{title}</h2>
          {children}
       </div>
    </motion.div>
  )
}
