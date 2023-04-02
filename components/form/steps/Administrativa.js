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


        <Divider title={"Revízne správy - prípojka"}
          component={<SingleChoice path={["e", "admin", "pripojka"]} labels={["nie", "áno"]}/>}
        />

        <Divider title={"Revízne správy - elektroinštalácia"}
          component={<SingleChoice path={["e", "admin", "elektroinstalacia"]} labels={["nie", "áno"]}/>}
        />


         <Divider title={"Revízne správy - bleskozvod"}
          component={<SingleChoice path={["e", "admin", "bleskozvod"]} labels={["nie", "áno"]}/>}
        />

        <Divider title={"Projekty - zmena"}
          component={<SingleChoice path={["e", "admin", "projekty"]} labels={["nie", "áno"]}/>}
        />


        <Divider title={"Jednopólová schéma"}
        component={<SingleChoice path={["e", "admin", "schema"]} labels={["nie", "áno"]}/>}
        />

        <Divider title={"Skutkový stav"}
          component={<SingleChoice path={["e", "admin", "skutok"]} labels={["nie", "áno"]}/>}
        />
    

        </FormLayout>
    
    </>
  );
}



