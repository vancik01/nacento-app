import React from 'react'

export default function ButtonTag({onClick, children, color}) {
  return (
    <div>
        <button onClick={onClick} style={{background:color}} className={`${color ? "" : "bg-row-header"}  text-white bg-opacity-70 w-fit px-[4px] py-[3px] text-xs rounded-md`}>
            {children}
        </button>
    </div>
  )
}
