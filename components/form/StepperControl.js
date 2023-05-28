import { useRef } from "react";
import ArrowDown from "../../public/assets/general/ArrowDown";
import { useStepper } from "../../context/StepperContext";
import { useApi } from "../../context/ApiContext";

export default function StepperControl({ handleClick, currentStep, steps, typ }) {
  const { color, redire } = useStepper()
  const { DataToPriceOffer } = useApi()

  const scrollRef = useRef(null)

  const executeScroll = () => scrollRef.current.scrollIntoView() 

  const colors = {
    "red": 'bg-rose-600',
    "green": 'bg-emerald-600',
    "blue": 'bg-blue-700',
  }

  return (
    <>
    <hr className="w-[90%] bg-slate-800 h-[1px]"></hr>
    
    <div className="container pt-8 pb-8 w-[80%] flex justify-between " style={{margin: "0 auto"}}>
         {currentStep !== 1 ?  
         <div onClick={() => handleClick()} className="flex gap-3 items-center cursor-pointer bg-gray-300 py-3 px-4 hover:bg-gray-400 trans">
      
          <div style={{transform: "rotate(90deg)"}}><ArrowDown color={"black"}></ArrowDown></div>
          
          <button className="font-medium text-black">
            Spať
          </button>

      </div> : <div className="py-2 px-4"></div> }
      

      <div onClick={currentStep !== steps.length? () => handleClick("next") : () => DataToPriceOffer(typ)}  ref={scrollRef}  
      className={`flex gap-3 items-center cursor-pointer ${colors[color]} py-3 px-4 hover:opacity-80 trans`}>
        <button onClick={executeScroll} className="font-medium text-white">
          {currentStep === steps.length ? "Vytvoriť cenovú ponuku" : "Ďalej"}
        </button>

        <div style={{transform: "rotate(270deg)"}}><ArrowDown color={"white"}></ArrowDown></div>
      </div>
      
    </div>
    </>
  );
}
