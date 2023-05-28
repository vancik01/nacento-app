import React from 'react'

function Divider({title, subtitle, component, textTop}) {
  return (
    <div className='flex'>
        <div className={`w-[25%] ml-10 text-left text-lg flex ${textTop? "mt-2": "items-center"}`}>
            <div>
                {title} 
                {subtitle && <div className='text-base text-slate-500 mt-1'> {subtitle} </div>}
            </div>
             
             
        </div>
        {component}
    </div>
  )
}

export default Divider
