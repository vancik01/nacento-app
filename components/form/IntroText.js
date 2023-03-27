import React, {useState, useRef, useEffect } from 'react'
import { useStepper } from '../../context/StepperContext'


function IntroText({title, info}) {


  const colors={
    "red" : ["hover:border-rose-600 hover:text-rose-600", "bg-rose-600 hover:bg-rose-400", "hover:text-rose-600"],
    "green" : ["hover:border-emerald-600 hover:text-emerald-600", "bg-emerald-600 hover:bg-emerald-400", "hover:text-emerald-600"],
    "blue" : ["hover:border-blue-700 hover:text-blue-700", "bg-blue-700 hover:bg-blue-400", "hover:text-blue-700"]
  }


  return (
    <div className='flex flex-col items-center gap-0 justify-between'>
        <div className="text-lg inline-block pb-12 relative">
          Vypíšte prosím všetky údaje, ktoré poznáte. Čím viac toho vyplníte, tým presnejšia bude ponuka.
          <div className="text-sm absolute bottom-7 text-gray-400 text-left">
              (ak nechcete naceniť {title}, všetky políčka nechajte prázdne)
          </div>

        </div>   


        { info && <div className="text-base w-full text-gray-600 text-left py-3 ml-16">
            <div className='text-black'> Vysvetlivky: </div>
            <div className='ml-1'>
                {info.map((text, ix) => {
                    return(
                    <div  key={`info${ix}`}>{text}</div>
                    )
                })} 
            </div>
        </div>}
        

        <hr className="w-[94%] bg-slate-800 h-[1px]" ></hr>
    </div>
  )
}

export default IntroText
