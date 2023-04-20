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
    <div className="bg-white pb-10">
        <IntroSection title={"strechu"} ix={2}  text={"pôdorys strechy"} type={"ST"}/>

        <FormLayout>

          <Divider title={"Plocha strechy"}
          component={<NumberInput path={["h", "strecha", "plocha"]} unit={"m"} sup={"2"} />}
        />
    

        </FormLayout>
    
    </div>
  );
}



