import { useState, useEffect } from "react";
import Stepper from "./Stepper";
import StepperControl from "./StepperControl";
import { useStepper } from "../../context/StepperContext";
import { useApi } from "../../context/ApiContext";
import FullPageLoading from "../loading/FullPageLoading";

import PripojkaNN from "./steps/PripojkaNN";
import InstalacnePrace from "./steps/InstalacnePrace";
import Predpripravy from "./steps/Predpripravy"
import Bleskozvod from "./steps/Bleskozvod";
import Administrativa from "./steps/Administrativa";


function ElektromontazForm({ theme_color }) {
  const [ currentStep, setCurrentStep ] = useState(1);
  const { color, setColor } = useStepper()
  const { dataloading } = useApi()

  // console.log(PredictParameters)

  useEffect(() => {
    setColor(theme_color)
  }, []);

  
  const steps = [
    "Prípojka nízkeho napätia",
    "Elektroinštalačné práce",
    "Predprípravy",
    "Bleskozvod",
    "Administratíva",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <PripojkaNN/>;
      case 2:
        return <InstalacnePrace/>;
      case 3:
        return <Predpripravy/>;
      case 4:
        return <Bleskozvod/>;
      case 5:
        return <Administrativa/>;
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
