import React, {useState, useRef, useEffect } from 'react'
import { useStepper } from '../../context/StepperContext'


function IntroText({title, info, comment}) {


  const colors={
    "red" : ["hover:border-rose-600 hover:text-rose-600", "bg-rose-600 hover:bg-rose-400", "hover:text-rose-600"],
    "green" : ["hover:border-emerald-600 hover:text-emerald-600", "bg-emerald-600 hover:bg-emerald-400", "hover:text-emerald-600"],
    "blue" : ["hover:border-blue-700 hover:text-blue-700", "bg-blue-700 hover:bg-blue-400", "hover:text-blue-700"]
  }


  return (
    <div className='flex flex-col items-center gap-0 justify-between'>
        <div className="text-base inline-block pb-6 mt-4 relative">
          Vyplnte prosím čo najviac parametrov. Čím viac ich zadáte, tým <span className='font-semibold'>presnejšia</span> bude ponuka.
          {/* <div className="text-sm absolute bottom-7 text-gray-400 text-left">
              (ak nechcete naceniť {title}, všetky políčka nechajte prázdne)
          </div> */}

        </div>   


        { info && <div className="text-base text-gray-600 text-left py-3 w-3/4 mr-28">
            <div className='text-black'> Vysvetlivky: </div>
            <div className='ml-1'>
                {info.map((text, ix) => {
                    return(
                    <div  key={`info${ix}`}>{text}</div>
                    )
                })} 
            </div>
        </div>}

        {comment && <div className='w-3/4 text-left pb-5 text-sm mr-28 text-gray-400'>*{comment}</div>}
        

        <hr className="w-[94%] bg-slate-800 h-[1px]" ></hr>
    </div>
  )
}

export default IntroText
