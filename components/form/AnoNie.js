import React, {useState, useEffect} from 'react'
import SingleChoice from './SingleChoice';
import { useStepper } from '../../context/StepperContext';

function AnoNie({path, component}) {
  const [on, seton] = useState(false)
  const {hsdata, sethsdata, edata, setedata, color} = useStepper()
  
  var data = {}
  if(path[0] == "e") data = edata
  if(path[0] == "h") data = {...hsdata} 


  return (
    <div>
        <SingleChoice path={path} labels={["nie", "áno"]}/>

        {data[path[1]][path[2]][0] === `1` && component}
    </div>
  )
}

export default AnoNie
