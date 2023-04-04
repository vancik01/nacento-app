import { useEffect } from "react";
import { useStepperContext } from "../../../context/StepperContext";
import { useStepper } from "../../../context/StepperContext";
import IntroText from "../IntroText";
import FormLayout from "../FormLayout";
import NumberInput from "../NumberInput";
import Divider from "../Divider"
import SingleChoice from "../SingleChoice";

export default function Vykurovanie() {
  const { vdata, sethsdata, color, setColor, ChangeHsValue } = useStepper();

  return (
    <>
        <IntroText title={"vykurovanie"} comment="bez zariaďovacích predmetov"/>

        <FormLayout>

            <Divider title={"Zdroj tepla"}
            component={ <SingleChoice path={["v", "vykurovanie", "zdroj"]} labels={["Plynový kotol", "Peletky", "TČ vzduch/voda", "TČ zem/voda"]}/>} />

            <Divider title={"Teplovodný krb"}
            component={ <SingleChoice path={["v", "vykurovanie", "tv_krb"]} labels={["nie", "áno"]}/>} />


            <Divider title={"Solár"}
            component={ <SingleChoice path={["v", "vykurovanie", "solar"]} labels={["nie", "áno"]}/>} />

            
            <Divider title={"Podlahové kúrenie"}
            component={ <SingleChoice path={["v", "vykurovanie", "podlahove"]} labels={["nie", "áno"]}/>} />

            {vdata["vykurovanie"]["podlahove"][0] == "1" && 
            <>
              <Divider title={"Podlažná plocha"}
              component={ <NumberInput path={["v", "vykurovanie", "podlahove", 1]} unit={"m"} sup={"2"} />} />
              
              <Divider title={"Podkladový polystyrén"}
              component={ <SingleChoice path={["v", "vykurovanie", "podlahove", 2]} labels={["dodá majiteľ", "dodám ja"]}/>} />
            </>
            }

            

            <Divider title={"Počet radiátorov"}
            component={ <NumberInput path={["v", "vykurovanie", "radiatory"]} unit={"ks"} />} />


            <Divider title={"Ležatá kanalizácia"}
            component={ <SingleChoice path={["v", "vykurovanie", "lezata_kanalizacia"]} labels={["zhotovená", "nezhotovená"]}/>} />
            
            <Divider title={"Rekuperácia"}/>
            

            <Divider title={"Rozvod vody - počet vývodov"}
            component={ <NumberInput path={["v", "vykurovanie", "voda_vyvody"]} unit={"ks"} />} />
            
            <Divider title={"Priemerná vzdialenosť k vývodu"}
            component={ <NumberInput path={["v", "vykurovanie", "voda_vzdialenost"]} unit={"m"} />} />
            

            <Divider title={"Vnútorná kanalizácia - počet vývodov"}
            component={ <NumberInput path={["v", "vykurovanie", "kanalizacia_vyvody"]} unit={"ks"} />} />
            
            <Divider title={"Priemerná vzdialenosť ku kanalizácii"}
            component={ <NumberInput path={["v", "vykurovanie", "kanalizacia_vzidalenost"]} unit={"m"} />} />
            

            <Divider title={"Komín"}
            component={ <SingleChoice path={["v", "vykurovanie", "komin"]} labels={["murovaný", "montovaný"]}/>} />
            
          

        </FormLayout>
    
    </>
  );
}



