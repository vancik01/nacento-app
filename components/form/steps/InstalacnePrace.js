import { useEffect } from "react";
import { useStepperContext } from "../../../context/StepperContext";
import { useStepper } from "../../../context/StepperContext";
import IntroText from "../IntroText";
import Divider from "../Divider"
import FormLayout from "../FormLayout";
import NumberInput from "../NumberInput";
import IconInput from "../IconInput"
import Bed from "../icons/Bed";

export default function InstalacnePrace() {
  const { hsdata, sethsdata, color, setColor, ChangeHsValue } = useStepper();

  return (
    <>
        <IntroText title={"elektroinštalačné práce"}/>

        <FormLayout>

            {/* <Divider title={"Obsah strechy"}
            component={<NumberInput id={"14"} unit={"m"} sup={"2"} />} /> */}

            <Divider title={"Počet obytných miestností"}
            component={<IconInput label={"Miestnosti"} add={1} id={"1"} img={<Bed color={"black"}></Bed>}/>} />

            


        </FormLayout>
    
    </>
  );
}



