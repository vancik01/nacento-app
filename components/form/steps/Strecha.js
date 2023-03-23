import { useEffect } from "react";
import { useStepperContext } from "../../../context/StepperContext";
import { useStepper } from "../../../context/StepperContext";
import IntroSection from "../IntroSection";
import FormLayout from "../FormLayout";
import NumberInput from "../NumberInput";
import Divider from "../Divider"

export default function Strecha() {
  const { hsdata, sethsdata, color, setColor, ChangeHsValue } = useStepper();

  return (
    <>
        <IntroSection title={"strchu"} text={"pôdorys strechy"} type={"ST"}/>

        <FormLayout>

          <Divider title={"Obsah strechy"}
          component={<NumberInput id={"14"} unit={"m"} sup={"2"} />}
        />
    

        </FormLayout>
    
    </>
  );
}


