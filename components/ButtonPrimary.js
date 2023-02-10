import React from 'react'
import {useLayout} from "../context/LayoutContext"
import {motion} from "framer-motion"
import { Link } from '@mui/material'

export default function ButtonPrimary({children, className, onClick, scale, disabled, href}) {
    const {primaryColor} = useLayout()
  return (
    <motion.button 
        whileHover={{scale:scale ? scale : 0.95, transition:{duration:0.2, ease:"circIn"}}}
        whileTap={{scale:0.90}}
        className={`text-white py-1 px-4 font-medium disabled:!bg-gray-300 rounded-sm shadow-xl ${className?className : ""}`}
        style={{backgroundColor:primaryColor}}
        onClick={onClick}
        disabled={disabled}
    >

        {href && <div href={href}>
          <Link>{children}</Link>
        </div>}
        
        {!href && 
          <>{children}</>
        }

    </motion.button>
  )
}
