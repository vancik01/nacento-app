import React from 'react'
import {useStepper} from "../../context/StepperContext"

function IconInput({ label, id, img, }) {
    const { ChangeHsValue, hsdata, sethsdata, color } = useStepper()

    const colors={
        "red" : ["text-rose-600", "border-rose-600", "input-red"],
        "green" : ["text-emerald-600", "border-emerald-600", "input-green"]
    }

    
   function handeAdd(id){
        id = parseInt(id)
        let newData = [...hsdata]

        if(!newData[id]) newData[id] = "100"
        else{
            let count = parseInt(newData[id])
            newData[id] = `${count+100}`
        }
        sethsdata(newData)
   }

   function handeSub(id){
    id = parseInt(id)
    let newData = [...hsdata]

    if(!newData[id] || parseInt(newData[id])<100) return
    else{
        let count = parseInt(newData[id])
        newData[id] = `${count-100}`
    }
    sethsdata(newData)
   }

   var value = hsdata[parseInt(id)]

  return (
    <div className='w-[200px] shadow-sm'>

        <div className={`w-[200px] ${value !== "" && parseInt(value)>0? colors[color][1]: ""} border rounded-sm p-3 pb-6 flex gap-0 flex-col items-center justify-center`}>
            { img }
        <div className='text-base'>{label}</div>
        
        </div>

        <div className='relative'>
            
            <button onClick={() => handeSub(id)} className={`${colors[color][0]} text-4xl absolute top-[3px] left-[15px] font-light hover:text-black trans`}> - </button>

            <input id={id} onChange={ChangeHsValue} className={`w-[200px] ${colors[color][2]} ${value !== "" && parseInt(value)>0 && colors[color][1]} trans text-center py-2 mt-[-1px]`} 
            placeholder='0' min={1} type={"number"} value={value}
            style={{outline: "none", }}
            />

            <button onClick={() => handeAdd(id)} className={`${colors[color][0]} text-3xl absolute top-[6px] right-[15px] font-light hover:text-black trans`}> + </button>

        </div>
        

    </div>
  )
}

export default IconInput
