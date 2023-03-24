import { useEffect } from "react";
import { useStepperContext } from "../../../context/StepperContext";
import { useStepper } from "../../../context/StepperContext";
import IntroText from "../IntroText";
import FormLayout from "../FormLayout";

import NumberInput from "../NumberInput";
import Divider from "../Divider"
import AnoNie from "../AnoNie";
import SingleChoice from "../SingleChoice";

export default function Administrativa() {

  return (
    <>
        <IntroText title={"administratívu"} />

        <FormLayout>

          <Divider title={"Revízne správy"}
          component={<SingleChoice path={["e", "admin", "revizia"]} labels={["prípojka", "elektroinšťalácia", "bleskozvod"]}/>} />


        <Divider title={"Projekty - zmena"}
          component={<AnoNie path={["e", "admin", "projekty"]} component={<div></div>}/>}
        />

        <Divider title={"Jednopólová schéma"}
          component={<AnoNie path={["e", "admin", "schema"]} component={<div></div>}/>}
        />

        <Divider title={"Skutkový stav"}
          component={<AnoNie path={["e", "admin", "skutok"]} component={<div></div>}/>}
        />
    

        </FormLayout>
    
    </>
  );
}



