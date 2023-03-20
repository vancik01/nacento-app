import { act } from '@react-three/fiber'
import React, { useState }  from 'react'
import { useStepper } from '../../context/StepperContext'

function SingleChoice({ id, labels }) {

  const {hsdata, sethsdata, color} = useStepper()
  hsdata[parseInt(id)] = "1"
  
  const [active, setActive] = useState(0)

  const colors = {
    "red" : ["hover:text-rose-600", "rgb(225 29 72)"],
    "green" : ["hover:text-emerald-600", "rgb(5 150 105)"]
  }

  function handleSet(i){
    let newData = [...hsdata]
    newData[parseInt(id)] = `${i+1}`
    sethsdata(newData)

    setActive(i)
  }

  const buttons = []

  for(let i=0; i<labels.length; i++){
    buttons.push(
        <button onClick={() => handleSet(i)} key={`choice${i}`}
        className={`text-lg w-[200px] ${colors[color][0]}  shadow-sm font-medium border border-slate-300 rounded-sm  py-2 px-4 trans`}
        // style={{borderColor : active === i ? colors[color][1] : "", color: active === i ? colors[color][1] : ""}}
          style={{borderColor : active === i ? colors[color][1] : ""}}

        >
             
             {labels[i]}       
        </button>
    )
  }

  return (

    <div className='flex gap-1'>
        { buttons }
    </div>
  )
}

export default SingleChoice
