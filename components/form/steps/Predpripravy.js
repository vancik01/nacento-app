import { useEffect } from "react";
import { useStepperContext } from "../../../context/StepperContext";
import { useStepper } from "../../../context/StepperContext";
import IntroText from "../IntroText";
import FormLayout from "../FormLayout";
import SingleChoice from "../SingleChoice";

import NumberInput from "../NumberInput";
import Divider from "../Divider"
import AnoNie from "../AnoNie";

export default function Strecha() {
  const { edata, sethsdata, color, setColor, ChangeHsValue } = useStepper();

  return (
    <>
        <IntroText title={"žiadne predprípravy"} />

        <FormLayout>

          <Divider title={"Kamery"}
          component={<SingleChoice path={["e", "pripravy", "kamery"]} labels={["nie", "áno"]}/>}
              />

          {edata["pripravy"]["kamery"][0] == `1` && 
            <Divider title="Počet kamier"
            component={<NumberInput path={["e", "pripravy", "kamery", 1]} unit={"ks"} />} />
          }


        <Divider title={"Koaxiál"}
        component={<SingleChoice path={["e", "pripravy", "koaxial"]} labels={["nie", "áno"]}/>}
        />

          {edata["pripravy"]["koaxial"][0] == `1` && 
            <Divider title="Vzdialenosť antény od prijímača"
            component={<NumberInput path={["e", "pripravy", "koaxial", 1]} unit={"m"} />} />
          }


        <Divider title={"Fotovoltika"}
        component={<SingleChoice path={["e", "pripravy", "fotovoltika"]} labels={["nie", "áno"]}/>}
        />

        <Divider title={"Elektrická brána"}
        component={<SingleChoice path={["e", "pripravy", "brana"]} labels={["nie", "áno"]}/>}
        />

        {edata["pripravy"]["brana"][0] == `1` && 
            <Divider title="Vzdialenosť brány od RD"
            component={<NumberInput path={["e", "pripravy", "brana", 1]} unit={"m"} />} />
          }

        <Divider title={"Pridružená budova"}
        component={<SingleChoice path={["e", "pripravy", "budova"]} labels={["nie", "áno"]}/>}
        />

        {edata["pripravy"]["budova"][0] == `1` && 
            <Divider title="Vzdialenosť budovy od RD"
            component={<NumberInput path={["e", "pripravy", "budova", 1]} unit={"m"} />} />
          }

        <Divider title={"Ekvimetrika ku plynovému kotlu"}
        component={<SingleChoice path={["e", "pripravy", "ekvimetrika"]} labels={["nie", "áno"]}/>}
        />

        <Divider title={"Orientačné osvetlenie"}
        component={<SingleChoice path={["e", "pripravy", "osvetlenie"]} labels={["nie", "áno"]}/>}
        />

        {edata["pripravy"]["osvetlenie"][0] == `1` && 
            <Divider title="Počet orientačných svietidiel"
            component={<NumberInput path={["e", "pripravy", "osvetlenie", 1]} unit={"ks"} />} />
          }

        <Divider title={"Dátové zásuvky"}
        component={<SingleChoice path={["e", "pripravy", "datovky"]} labels={["nie", "áno"]}/>}
        />

        <Divider title={"Elektrické žalúzie"}
        component={<SingleChoice path={["e", "pripravy", "zaluzie"]} labels={["nie", "áno"]}/>}
        />

          {edata["pripravy"]["zaluzie"][0] == `1` && 
            <Divider title="Počet okien s el. žalúziami"
            component={<NumberInput path={["e", "pripravy", "zaluzie", 1]} unit={"ks"} />} />
          }

        <Divider title={"Ozvučenie miestností"}
        component={<SingleChoice path={["e", "pripravy", "ozvucenie"]} labels={["nie", "áno"]}/>}
        />

        {edata["pripravy"]["ozvucenie"][0] == `1` && 
            <Divider title="Počet reproduktorov"
            component={<NumberInput path={["e", "pripravy", "ozvucenie", 1]} unit={"ks"} />} />
          }

        <Divider title={"Tepelné čerpadlo"}
        component={<SingleChoice path={["e", "pripravy", "tc"]} labels={["nie", "áno"]}/>}
        />

        <Divider title={"Klimatizácia"}
        component={<SingleChoice path={["e", "pripravy", "klimatizacia"]} labels={["nie", "áno"]}/>}
        />
    

        </FormLayout>
    
    </>
  );
}



