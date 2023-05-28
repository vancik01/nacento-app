import React from 'react'
import { useStepper } from '../../context/StepperContext'
import ArrowDown from '../../public/assets/general/ArrowDown'
import { useApi } from '../../context/ApiContext'

function PageLayout(props) {
    const { color } = useStepper()
    const { DataToSectionList } = useApi()


    const colors = {
        "red": 'bg-rose-600',
        "green": 'bg-emerald-600',
        "blue": 'bg-blue-700',
    }

  return (
    <div className={"bg-white pb-10"}>
        {props.children}


            <div onClick={() => DataToSectionList(props.type)}
             className={`flex gap-3 w-fit items-center justify-center cursor-pointer bg-rose-600 mt-10 mr-10 py-3 px-4 hover:opacity-80 trans`} style={{marginLeft: "auto"}}>
                <button className="font-medium text-white">
                    Pridať do ponuky
                </button>

                <div style={{transform: "rotate(270deg)"}}><ArrowDown color={"white"}></ArrowDown></div>
            </div>
    </div>
  )
}

export default PageLayout
