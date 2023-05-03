import { useEffect } from "react";
import { useStepperContext } from "../../../context/StepperContext";
import { useStepper } from "../../../context/StepperContext";
import IntroSection from "../IntroSection";
import FormLayout from "../FormLayout";
import NumberInput from "../NumberInput";
import Divider from "../Divider"
import SingleChoice from "../SingleChoice";

export default function Strecha() {
  const { hsdata, sethsdata, color, setColor, ChangeHsValue } = useStepper();
  console.log(hsdata)
  return (
    <div className="bg-white pb-10">
        <IntroSection title={"strechu"} ix={2}  text={"pôdorys strechy"} type={"ST"}/>

        <FormLayout>

        <Divider title={"Plocha strechy"}
          component={<NumberInput path={["h", "strecha", "plocha"]} unit={"m"} sup={"2"} />}
        />

          <Divider title={"Typ strechy"}
            component={<SingleChoice grid path={["h", "strecha", "typ"]} labels={["sedlová", "valbová", "stanová", "plochá", "pultová"]}/>} />
            

           <Divider title={"Typ krytiny"}
            component={ <SingleChoice path={["h", "strecha", "krytina", 0]} labels={["škridla", "plech"]}/>} />
          
          {hsdata["strecha"]["krytina"][0] == "0" ? 
            <Divider title={"škridla"}
            component={ <SingleChoice path={["h", "strecha", "krytina", 1]} labels={["betónová", "pálená"]}/>} />
          :
          <Divider title={"plech"}
          component={ <SingleChoice path={["h", "strecha", "krytina", 2]} labels={["škridloplech", "falcovačka"]}/>} />
        }

        <Divider title={"Počet strešných okien"}
          component={<NumberInput path={["h", "strecha", "okna"]} unit={"ks"} />}
        />

        <Divider title={"Počet komínov"}
          component={<NumberInput path={["h", "strecha", "kominy"]} unit={"ks"} />}
        />  

        <Divider title={"Typ krovu"}
            component={ <SingleChoice path={["h", "strecha", "krov"]} labels={["väzníkový", "klasický"]}/>} />
            

    

        </FormLayout>
    
    </div>
  );
}



