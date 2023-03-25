import React from 'react'
import {useStepper} from "../../context/StepperContext"

function IconInput({ label, add, img, path}) {
    const { ChangeValue, hsdata, edata, setedata, sethsdata, color } = useStepper()

    const colors={
        "red" : ["text-rose-600", "border-rose-600", "input-red"],
        "green" : ["text-emerald-600", "border-emerald-600", "input-green"]
    }

    
   function handeAdd(path){
        let newData = {...data}

        if(!newData[path[1]][path[2]]) newData[path[1]][path[2]] = `${add}`
        else{
            let count = parseInt(newData[path[1]][path[2]])
            newData[path[1]][path[2]] = `${count+add}`
        }

        if (path[0] == "e" ) setedata(newData)
        if (path[0] == "h" ) sethsdata(newData)
   }

   function handeSub(path){

    let newData = {...data}

    if(!newData[path[1]][path[2]] || parseInt(newData[path[1]][path[2]])<add) newData[path[1]][path[2]] = ""
    else{
        let count = parseInt(newData[path[1]][path[2]])
        newData[path[1]][path[2]] = `${count-add}`
    }

    if (path[0] == "e" ) setedata(newData)
    if (path[0] == "h" ) sethsdata(newData)
   }

    var data = {}
    if(path[0] == "e") data = edata
    if(path[0] == "h") data = hsdata
    var value = data[path[1]][path[2]]

  return (
    <div className='w-[200px] shadow-sm'>

        <div className={`w-[200px] ${value !== "" && parseInt(value)>0? colors[color][1]: ""} border rounded-sm p-3 pb-6 flex gap-0 flex-col items-center justify-center`}>
            { img }
        <div className='text-base'>{label}</div>
        
        </div>

        <div className='relative'>
            
            <button onClick={() => handeSub(path)} className={`${colors[color][0]} text-4xl absolute top-[3px] left-[15px] font-light hover:text-black trans`}> - </button>

            <input id='form-input' onChange={(e) => ChangeValue(e, path)} className={`w-[200px] ${colors[color][2]} ${value !== "" && parseInt(value)>0 && colors[color][1]} trans text-center py-2 mt-[-1px]`} 
            placeholder='0' min={1} type={"number"} value={value}
            style={{outline: "none", }}
            />

            <button onClick={() => handeAdd(path)} className={`${colors[color][0]} text-3xl absolute top-[6px] right-[15px] font-light hover:text-black trans`}> + </button>

        </div>
        

    </div>
  )
}

export default IconInput
