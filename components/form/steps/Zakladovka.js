import NumberInput from "../NumberInput";
import Divider from "../Divider";
import SingleChoice from "../SingleChoice";
import IntroSection from "../IntroSection";
import FormLayout from "../FormLayout";

import IconInput from "../IconInput";
import Dt20 from "../icons/Dt20"
import Dt30 from "../icons/Dt30"
import Dt40 from "../icons/Dt40"


export default function Zakladovka() {

  return (
    <>
    
    <IntroSection title={"základovú dosku"} text={"pôdorysu základov"} type={"ZD"}/>
   
    <FormLayout>

      <Divider title={"Objem výkopových pásov"} 
        component={
        <NumberInput id={"0"} unit={"m"} sup={"3"} decimal={true}/>}
      />
      

      <Divider title={"Počty debniacich tvárnic:"} subtitle={"(na jednu radu)"}
        component={
          <div className="flex justify-between gap-1">
            <IconInput label={"50x20x25"} id={"1"} img={<Dt20 color={"black"}></Dt20>}/>
            <IconInput label={"50x30x25"} id={"2"} img={<Dt30 color={"black"}></Dt30>}/>
            <IconInput label={"50x40x25"} id={"3"} img={<Dt40 color={"black"}></Dt40>}/>
          </div>
        }
        textTop={true}
      />


      <Divider title={"Počet radov DT"}
        component={<SingleChoice id={4} labels={[1,2,3]}/>}
      />


      <Divider title={"Obvod stavby"}
        component={<NumberInput id={"5"} unit={"m"} />}
      />
        
      <Divider title={"Plocha stavby"}
        component={<NumberInput id={"6"} unit={"m"} sup={"2"}/>}
      />


    </FormLayout>
    </>
  );
}
