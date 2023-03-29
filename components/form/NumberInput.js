import React from 'react'
import { useStepper } from '../../context/StepperContext';


function NumberInput({ id, unit, sup, decimal, path }) {
    const { color, hsdata, edata, ChangeValue } = useStepper()

    const colors = {
        "red" : "input-red",
        "green" : "input-green",
        "blue" : "input-blue"
    }

    var data = {}
    if(path[0] == "e") data = edata
    if(path[0] == "h") data = hsdata

    var value
    if(path.length == 4)  value = data[path[1]][path[2]][path[3]]
    else value = data[path[1]][path[2]]


    return (

        <div className='flex items-center relative'>

            <input id={"form-input"} value={value} type={"number"} min={1} placeholder={"0"} onChange={(e) => ChangeValue(e,path)}
                className={`${colors[color]} py-2 px-4  w-[300px] trans` }
                style={{outline: "none", }} step={decimal?  .01 : 1} >
            
            </input>

            <div className={"absolute right-4  text-lg opacity-50"}>
                {unit} 
                <sup>{sup}</sup>
            </div>

        </div>
    );

}

export default NumberInput


