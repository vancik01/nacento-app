import { act } from '@react-three/fiber'
import React, { useState }  from 'react'
import { useStepper } from '../../context/StepperContext'

function SingleChoice({ id, labels, onClick, path }) {

  const {hsdata, sethsdata, edata, setedata, color} = useStepper()
  hsdata[parseInt(id)] = "1"
  
  const [active, setActive] = useState(0)

  const colors = {
    "red" : ["hover:text-rose-600", "rgb(225 29 72)"],
    "green" : ["hover:text-emerald-600", "rgb(5 150 105)"],
    "blue" : ["hover:text-blue-700", "rgb(29 78 216)"]
  }


  var data = {}
  if(path[0] == "e") data = edata
  if(path[0] == "h") data = {...hsdata} 

  // function handleSet(i){
  //   let newData = [...hsdata]
  //   newData[parseInt(id)] = `${i+1}`
  //   sethsdata(newData)

  //   setActive(i)
  // }

  function data_change(i){

    var data
    if(path[0] == "e") data = {...edata} 
    if(path[0] == "h") data = {...hsdata} 

    data[path[1]][path[2]][0] = `${i}`

    if(path[0] == "e") setedata(data)
    if(path[0] == "h") sethsdata(data)

  }

  const buttons = []

  for(let i=0; i<labels.length; i++){
    buttons.push(
        <button onClick={() => data_change(i)} key={`choice${i}`}
        className={`text-lg w-[200px] ${data[path[1]][path[2]][0] !== `${i}` && colors[color][0]}  shadow-sm font-medium border border-slate-300 rounded-sm  py-2 px-4 trans`}
        // style={{borderColor : active === i ? colors[color][1] : "", color: active === i ? colors[color][1] : ""}}
          style={{borderColor : data[path[1]][path[2]][0] === `${i}` ? colors[color][1] : ""}}

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
