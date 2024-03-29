import { useStepper } from "../../../context/StepperContext";
import IntroText from "../IntroText";
import Divider from "../Divider"
import FormLayout from "../FormLayout";

import NumberInput from "../NumberInput";
import IconInput from "../IconInput"
import Bed from "../../../public/assets/form/Bed";
import PageLayout from "../PageLayout";

export default function InstalacnePrace() {
  const { hsdata, sethsdata, color, setColor, ChangeHsValue } = useStepper();

  return (
    <PageLayout type={'instalacky'}>
        <IntroText title={"elektroinštalačné práce"}/>

        <FormLayout>

            <Divider title="úžitková plocha domu"
            component={<NumberInput path={["e", "instalacie", "plocha"]} unit={"m"} sup={"2"} />} />

            <Divider title="Počet obytných miestností"
            component={<IconInput label={"Miestnosti"} add={1} isSvg path={["e", "instalacie", "miestnosti"]} img={<Bed color={"black"}></Bed>}/>}/>

        
            <Divider title="priemerná vzdialenosť vývodu od RD"
            component={<NumberInput path={["e", "instalacie", "dialkavyvod"]} unit={"m"} />} />

            {/* <Divider title="trojfázový vývod zásuvka 400V" subtitle="(varná doska)"
            component={<SingleChoice path={["e", "instalacie", "zasuvka"]} labels={["áno", "nie"]}/>} /> */}



        </FormLayout>
    
    </PageLayout>
  );
}



