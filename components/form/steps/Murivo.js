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
        <IntroSection title={"murovacie práce"} ix={1}  text={"pôdorysu 1. NP"} type={"MP"}/>

        <FormLayout>

          <Divider title={"Murovací materiál"}
          component={<SingleChoice path={["h", "murivo", "material"]} labels={["Tehla", "YTONG"]}/>}/>


          {hsdata["murivo"]["material"][0] === "" || hsdata["murivo"]["material"][0] !== "1" ? 
            <Divider title={"Počty tehál"} subtitle={"(na jedno poschodie)"}
            component={<TehlaItems/>}
            textTop={true}/> 
            
            : <Divider title={"Počty Ytongu"} subtitle={"(na jedno poschodie)"}
            component={<YtongItems/>}
            textTop={true}/> 
          }

      <Divider title={"Počet poschodí"}
        component={<SingleChoice path={["h", "murivo", "poschodia"]} labels={[1,2,3]}/>}
      />


        </FormLayout>
    
    </>
  );
}

function TehlaItems(){
  return(
    <div className="grid icon-grid">
        <IconInput path={["h", "murivo", "t10"]} label={"50x10x25"} add={100} />
        <IconInput path={["h", "murivo", "t15"]} label={"50x15x25"} add={100} />
        <IconInput path={["h", "murivo", "t25"]} label={"50x25x25"} add={100} />
        <IconInput path={["h", "murivo", "t30"]} label={"50x30x25"} add={100} />
        <IconInput path={["h", "murivo", "t45"]} label={"50x45x25"} add={100} />
    </div>
  )
}


function YtongItems(){
  return(
    <div className="grid icon-grid">
        <IconInput path={["h", "murivo", "t10"]} label={"60x10x25"} add={100} />
        <IconInput path={["h", "murivo", "t15"]} label={"60x15x25"} add={100} />
        <IconInput path={["h", "murivo", "t25"]} label={"60x25x25"} add={100} />
        <IconInput path={["h", "murivo", "t30"]} label={"60x30x25"} add={100} />
        <IconInput path={["h", "murivo", "t45"]} label={"60x45x25"} add={100} />
     
    </div>
  )
}



