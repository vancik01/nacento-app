import { useEffect } from "react";
import { useStepperContext } from "../../../context/StepperContext";
import { useStepper } from "../../../context/StepperContext";
import IntroText from "../IntroText";
import FormLayout from "../FormLayout";

import NumberInput from "../NumberInput";
import Divider from "../Divider"
import AnoNie from "../AnoNie";

export default function Strecha() {
  const { hsdata, sethsdata, color, setColor, ChangeHsValue } = useStepper();

  return (
    <>
        <IntroText title={"žiadne predprípravy"} />

        <FormLayout>

          <Divider title={"Kamery"}
          component={<AnoNie path={["e", "pripravy", "kamery"]} component={<div>AA</div>}/>}
        />

        <Divider title={"Koaxiál"}
          component={<AnoNie path={["e", "pripravy", "koaxial"]} component={<div>AA</div>}/>}
        />

        <Divider title={"Fotovoltika"}
          component={<AnoNie path={["e", "pripravy", "fotovoltika"]} component={<div>AA</div>}/>}
        />

        <Divider title={"Elektrická brána"}
          component={<AnoNie path={["e", "pripravy", "brana"]} component={<div>AA</div>}/>}
        />

        <Divider title={"Pridružená budova"}
          component={<AnoNie path={["e", "pripravy", "budova"]} component={<div>AA</div>}/>}
        />

        <Divider title={"Ekvimetrika ku plynovému kotlu"}
          component={<AnoNie path={["e", "pripravy", "ekvimetrika"]} component={<div>AA</div>}/>}
        />

        <Divider title={"Orientačné osvetlenie"}
          component={<AnoNie path={["e", "pripravy", "osvetlenie"]} component={<div>AA</div>}/>}
        />

        <Divider title={"Dátové zásuvky"}
          component={<AnoNie path={["e", "pripravy", "datovky"]} component={<div>AA</div>}/>}
        />

        <Divider title={"Elektrické žalúzie"}
          component={<AnoNie path={["e", "pripravy", "zaluzie"]} component={<div>AA</div>}/>}
        />

        <Divider title={"Ozvučenie miestností"}
          component={<AnoNie path={["e", "pripravy", "ozvucenie"]} component={<div>AA</div>}/>}
        />

        <Divider title={"Tepelné čerpadlo"}
          component={<AnoNie path={["e", "pripravy", "tc"]} component={<div>AA</div>}/>}
        />

        <Divider title={"Klimatizácia"}
          component={<AnoNie path={["e", "pripravy", "klimatizacia"]} component={<div>AA</div>}/>}
        />
    

        </FormLayout>
    
    </>
  );
}



