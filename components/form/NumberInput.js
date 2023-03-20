import React from 'react'
import { useStepper } from '../../context/StepperContext';


function NumberInput({ id, unit, sup, decimal }) {
    const { color, hsdata, ChangeHsValue } = useStepper()

    const colors = {
        "red" : "input-red",
        "green" : "input-green"
    }

    var value = hsdata[parseInt(id)]

    return (

        <div className='flex items-center relative'>

            <input id={id} value={value} type={"number"} min={1} placeholder={"0"} onChange={ChangeHsValue}
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


