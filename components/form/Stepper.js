import React, { useState, useEffect, useRef } from "react";
import { useStepper } from "../../context/StepperContext";

const Stepper = ({ steps, currentStep, setCurrentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepsRef = useRef();
  const { color } = useStepper()

  const colors = {
    "red" : 'text-rose-600 font-bold',
    "green" : 'text-emerald-600',
  }

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    
    let count = 0;
    while (count < newSteps.length) {
      //current step
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          // completed: true,
        };
        count++;
      }

      //step completed
      else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          // completed: true,
        };
        count++;
      }
      //step pending
      else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          // completed: false,
        };
        count++;
      }
    }

    return newSteps;
  };

  useEffect(() => {
    const stepsState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          // completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    );

    stepsRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepsRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  

  const stepsDisplay = newStep.map((step, index) => {
    return (

      <>   
          <div onClick={() => setCurrentStep(index+1)} key={`title${index}`}
            className={`text-sm font-medium cursor-pointer ${
              step.highlighted ? colors[color] : "text-gray-400"
            }`}>

            {`0${index+1} ` + step.description}
          </div>

          
            { index < steps.length-1 && <div key={`dot${index}`}
            className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-1 w-1 flex items-center justify-center  ${
              step.selected
                // ? "bg-green-600 text-white font-bold border border-green-600 "
                ? ""
                : ""
            }`}
          >
            
          </div> }

      </>
    );
  });

  return (
    <>
      <div className="flex justify-start gap-8 items-center">
        {stepsDisplay}
      </div>

      <br/>


      <div className="text-2xl font-semibold mt-3 text-left">
          {steps[currentStep-1]}
      </div>
     
    </>
  );
};
export default Stepper;
