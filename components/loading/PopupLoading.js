import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { motion } from 'framer-motion'

export default function PopupLoading({loading}) {
  return (
    <AnimatePresence>
      {loading && <motion.div 
        
        exit={{opacity:0}} animate={{opacity:1}}
        className='absolute top-0 bottom-0 left-0 right-0 bg-[#ffffffcf] z-50 rounded-lg'
      >
        <div className='h-full w-full flex justify-center items-center'>
          <svg height={10} width={10} className="spinner" viewBox="0 0 50 50">
              <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="3"></circle>
          </svg>
          
        </div>
      </motion.div>}
    </AnimatePresence>
  )
}
