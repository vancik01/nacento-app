import { useEffect } from "react";
import { useStepperContext } from "../../../context/StepperContext";
import { useStepper } from "../../../context/StepperContext";
import IntroText from "../IntroText";
import Divider from "../Divider"
import FormLayout from "../FormLayout";

import SingleChoice from "../SingleChoice";
import NumberInput from "../NumberInput";
import IconInput from "../IconInput"

export default function PripojkaNN() {
  const { hsdata, sethsdata, color, setColor, ChangeHsValue } = useStepper();

  const info=[
    "HDS - poistková skriňa",
    "RE - elektromerový rozvádzač",
    "RD - domový rozvádzač"
  ]

  return (
    <>
        <IntroText title={"prípojku nízkeho napätia"} info={info}/>

        <FormLayout>

            <Divider title={"Poloha prípojného bodu na elektrickú sieť"}
            component={ <SingleChoice path={["e", "pripojka", "poloha"]} labels={["na pozemku", "protľahlá strana cesty"]}/>} />


            <Divider title={"Vedenie prípojky"}
            component={ <SingleChoice path={["e", "pripojka", "vedenie"]} labels={["zemou", "vzduchom"]}/>} />


            <Divider title={"Vzdialenosť HDS do RE"}
            component={ <NumberInput path={["e", "pripojka", "hds-re"]} unit={"m"} />} />

            <Divider title={"Typ káblu z HDS do RE"}
            component={ <SingleChoice path={["e", "pripojka", "k-hds-re"]} labels={["AYKY4x25", "AYKY4x16", "CYKY4x10", "CYKY4x16"]}/>} />


            <Divider title={"Vzdialenosť RE do RD"}
            component={ <NumberInput path={["e", "pripojka", "re-rd"]} unit={"m"} />} />

            <Divider title={"Typ káblu z RE do RD"}
            component={ <SingleChoice path={["e", "pripojka", "k-re-rd"]} labels={["AYKY4x25", "AYKY4x16", "CYKY4x10", "CYKY4x16"]}/>} />


            <Divider title={"Typ elektromerovej skrinky"}
            component={ <SingleChoice path={["e", "pripojka", "eskrinka"]} labels={["plastová", "oceľovo-plechová"]}/>} />


            <Divider title={"Typ elektromerovej skrinky"}
            component={ <SingleChoice path={["e", "pripojka", "tarif"]} labels={["jendotarif", "dvojtarif"]}/>} />


            <Divider title={"Veľkosť hlavného ističa"}
            component={ <SingleChoice path={["e", "pripojka", "istic"]} labels={["B25", "B32", "B40"]}/>} />


        </FormLayout>
    
    </>
  );
}


