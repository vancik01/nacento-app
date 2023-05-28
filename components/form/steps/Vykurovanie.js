import { useEffect } from "react";
import { useStepperContext } from "../../../context/StepperContext";
import { useStepper } from "../../../context/StepperContext";
import IntroText from "../IntroText";
import FormLayout from "../FormLayout";
import NumberInput from "../NumberInput";
import Divider from "../Divider"
import SingleChoice from "../SingleChoice";
import PageLayout from "../PageLayout";

export default function Vykurovanie() {
  const { vdata, sethsdata, color, setColor, ChangeHsValue } = useStepper();

  return (
    <PageLayout type={"vykurovanie"}>
        <IntroText title={"vykurovanie"} comment="bez zariaďovacích predmetov"/>

        <FormLayout>

            <Divider title={"Zdroj tepla"}
            component={ <SingleChoice path={["v", "vykurovanie", "zdroj"]} grid labels={["Plynový kotol", "Peletky", "TČ vzduch/voda", "TČ zem/voda"]}/>} />

            {(vdata["vykurovanie"]["zdroj"][0] == "0" || vdata["vykurovanie"]["zdroj"][0] == "1") && 
              <Divider title={"Odvod spalín"}
              component={ <SingleChoice path={["v", "vykurovanie", "zdroj", 1]} labels={["komín nový", "úprava existujúceho"]}/>} />
            }

            {vdata["vykurovanie"]["zdroj"][0] == "2" && 
              <Divider title={"Vonkajšia stavebná pripravenosť"}
              component={ <SingleChoice path={["v", "vykurovanie", "zdroj", 2]} labels={["majiteľ", "ja"]}/>} />
            }

           {vdata["vykurovanie"]["zdroj"][0] == "3" && 
              <Divider title={"Náklady na zdroj tepla"}
              component={ <SingleChoice path={["v", "vykurovanie", "zdroj", 3]} labels={["vrty", "zemný kolektor"]}/>} />
            }

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


            <Divider title={"Radiátorové kúrenie"}
            component={ <SingleChoice path={["v", "vykurovanie", "radiatory", 0]} labels={["nie", "áno"]}/>} />
            
            {vdata["vykurovanie"]["radiatory"][0] == "1" &&
            <>
            <Divider title={"Počet radiátorov"}
            component={ <NumberInput path={["v", "vykurovanie", "radiatory", 1]} unit={"ks"} />} />
            
            <Divider title={"Rozvod"}
            component={ <SingleChoice path={["v", "vykurovanie", "radiatory", 2]} labels={["medený", "hlinníkový"]}/>} />
            </> 
            }

            <Divider title={"Ležatá kanalizácia"}
            component={ <SingleChoice path={["v", "vykurovanie", "lezata_kanalizacia"]} labels={["zhotovená", "nezhotovená"]}/>} />
            
            <Divider title={"Rekuperácia"}/>
            

            <Divider title={"Rozvod vody - počet vývodov"}
            component={ <NumberInput path={["v", "vykurovanie", "voda_vyvody"]} unit={"ks"} />} />
            
            <Divider title={"Priemerná vzdialenosť k vývodu"}
            component={ <NumberInput path={["v", "vykurovanie", "voda_vzdialenost"]} unit={"m"} />} />
            

            <Divider title={"Vnútorná kanalizácia - počet vývodov"}
            component={ <NumberInput path={["v", "vykurovanie", "kanalizacia_vyvody"]} unit={"ks"} />} />
            
            {/* <Divider title={"Priemerná vzdialenosť ku kanalizácii"}
            component={ <NumberInput path={["v", "vykurovanie", "kanalizacia_vzidalenost"]} unit={"m"} />} /> */}
            

            {/* <Divider title={"Komín"}
            component={ <SingleChoice path={["v", "vykurovanie", "komin"]} labels={["murovaný", "montovaný"]}/>} /> */}
            
          

        </FormLayout>
    
    </PageLayout>
  );
}



