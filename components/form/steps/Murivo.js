import { useEffect } from "react";
import { useStepperContext } from "../../../context/StepperContext";
import { useStepper } from "../../../context/StepperContext";
import IntroSection from "../IntroSection";
import FormLayout from "../FormLayout";
import Divider from "../Divider";
import SingleChoice from "../SingleChoice";
import IconInput from "../IconInput";

export default function Murivo() {
  const { hsdata, sethsdata, color, setColor, ChangeHsValue } = useStepper();

  return (
    <>
        <IntroSection title={"murovacie práce"} text={"pôdorysu 1. NP"} type={"MP"}/>

        <FormLayout>

          <Divider title={"Murovací materiál"}
          component={<SingleChoice id={7} labels={["Tehla", "YTONG"]}/>}/>


          {hsdata[7] === "" || hsdata[7] === "1" ? 
            <Divider title={"Počty tehál"} subtitle={"(na jedno poschodie)"}
            component={<TehlaItems/>}
            textTop={true}/> 
            
            : <Divider title={"Počty Ytongu"} subtitle={"(na jedno poschodie)"}
            component={<YtongItems/>}
            textTop={true}/> 
          }

      <Divider title={"Počet poschodí"}
        component={<SingleChoice id={13} labels={[1,2,3]}/>}
      />


        </FormLayout>
    
    </>
  );
}

function TehlaItems(){
  return(
    <div className="grid icon-grid">
        <IconInput label={"50x10x25"} id={"8"} />
        <IconInput label={"50x15x25"} id={"9"} />
        <IconInput label={"50x25x25"} id={"10"} />
        <IconInput label={"50x30x25"} id={"11"} />
        <IconInput label={"50x45x25"} id={"12"} />
    </div>
  )
}


function YtongItems(){
  return(
    <div className="grid icon-grid">
        <IconInput label={"50x45x25"} id={"12"} />
        <IconInput label={"50x30x25"} id={"11"} />
        <IconInput label={"50x25x25"} id={"10"} />
        <IconInput label={"50x15x25"} id={"9"} />
        <IconInput label={"50x10x25"} id={"8"} />
     
    </div>
  )
}



