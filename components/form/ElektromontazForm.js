import { useState, useEffect } from "react";
import Stepper from "./Stepper";
import StepperControl from "./StepperControl";
import { useStepper } from "../../context/StepperContext";
import { useApi } from "../../context/ApiContext";
import FullPageLoading from "../loading/FullPageLoading";

import Zakladovka from "./steps/Zakladovka";
import Murivo from "./steps/Murivo";
import Strecha from "./steps/Strecha";

function ElektromontazForm({ theme_color }) {
  const [ currentStep, setCurrentStep ] = useState(1);
  const { color, setColor } = useStepper()
  const { dataloading } = useApi()

  // console.log(PredictParameters)

  useEffect(() => {
    setColor(theme_color)
  }, []);

  
  const steps = [
    "Elektroinštalácie",
    "Prípojka nízkeho napätia",
    "Predprípravy",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <div> step1 </div>;
      case 2:
        return <div> step2 </div>;
      case 3:
        return <div> step3 </div>;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className="bg-gray-100 p-8 shadow-xl md:w-full">
      {/* Stepper */}
      <div className="">
        <Stepper steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />

        <div className="mt-6">
          <hr className="w-full h-[1px] bg-black border-0"></hr>

          <FullPageLoading loading={dataloading}></FullPageLoading>

          <div className={"bg-white py-10 px-4"}>
            {displayStep(currentStep)}
          </div>
          

        </div>
      </div>

      {/* navigation button */}
      
        <div className="bg-white">
          <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
      </div>
        
      
    </div>
  );
}

export default ElektromontazForm;
