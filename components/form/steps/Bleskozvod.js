import { useEffect } from "react";
import { useStepperContext } from "../../../context/StepperContext";
import { useStepper } from "../../../context/StepperContext";
import IntroText from "../IntroText";
import Divider from "../Divider"
import FormLayout from "../FormLayout";

import SingleChoice from "../SingleChoice";
import NumberInput from "../NumberInput";
import IconInput from "../IconInput"

export default function Bleskozvod() {
  const { hsdata, sethsdata, color, setColor, ChangeHsValue } = useStepper();


  return (
    <>
        <IntroText title={"bleskozvod"}/>

        <FormLayout>
{/* 
            <Divider title={"Typ strechy"}
            component={ <SingleChoice path={["e", "bleskozvod", "strecha"]} labels={["sedlová", "plochá", "stanová"]}/>} /> */}

            <Divider title={"Plocha strechy"}
            component={ <NumberInput path={["e", "bleskozvod", "strecha"]} unit={"m"} sup={"2"} decimal={true} />} />

            <Divider title={"Dĺžka hrebeňa"}
            component={ <NumberInput path={["e", "bleskozvod", "hreben"]} unit={"m"} />} />

            <Divider title={"Počet zvodov"}
            component={ <NumberInput path={["e", "bleskozvod", "zvody"]} unit={"ks"} />} />

            {/* <Divider title={"Vedenie zvodov"}
            component={ <SingleChoice path={["e", "bleskozvod", "vedenie"]} labels={["priznané", "vo fasáde"]}/>} />
            

            <Divider title={"Dodatočné uzemnenie"}
            component={ <SingleChoice path={["e", "bleskozvod", "uzemnenie"]} labels={["áno", "nie"]}/>} /> */}



            {/* <Divider title={"Počet zachytávacích tyčí"}
            component={ <NumberInput path={["e", "bleskozvod", "tyce"]} unit={"ks"} />} /> */}

            
        </FormLayout>
    
    </>
  );
}



