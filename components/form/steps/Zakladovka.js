import NumberInput from "../NumberInput";
import Divider from "../Divider";
import SingleChoice from "../SingleChoice";
import IntroSection from "../IntroSection";
import FormLayout from "../FormLayout";

import IconInput from "../IconInput";
// import Dt20 from "../icons/Dt20"
// import Dt30 from "../icons/Dt30"
// import Dt40 from "../icons/Dt40"

import Dt15 from "../icons/DT/dt15.jpg"
import Dt20 from "../icons/DT/dt20.jpg"
import Dt25 from "../icons/DT/dt25.jpg"
import Dt30 from "../icons/DT/dt30.jpg"
import Dt40 from "../icons/DT/dt40.jpg"


export default function Zakladovka() {

  return (
    <>
    
    <IntroSection title={"základovú dosku"} ix={0} text={"pôdorysu základov"} type={"ZD"}/>
   
    <FormLayout>

      <Divider title={"Objem výkopových pásov"} 
        component={
        <NumberInput path={["h", "doska", "objem"]} unit={"m"} sup={"3"} decimal={true}/>}
      />
      

      <Divider title={"Počty debniacich tvárnic:"} subtitle={"(na jednu radu)"}
        component={
          <div className="grid icon-grid">
            <IconInput path={["h", "doska", "dt15"]} label={"Šírka 150mm"} add={100} img={<img src={Dt15.src} alt="dt15"/>}/>
            <IconInput path={["h", "doska", "dt20"]} label={"Šírka 200mm"} add={100} img={<img src={Dt20.src} alt="dt20"/>}/>
            <IconInput path={["h", "doska", "dt25"]} label={"Šírka 250mm"} add={100} img={<img src={Dt25.src} alt="dt25"/>}/>
            <IconInput path={["h", "doska", "dt30"]} label={"Šírka 300mm"} add={100} img={<img src={Dt30.src} alt="dt30"/>}/>
            <IconInput path={["h", "doska", "dt40"]} label={"Šírka 400mm"} add={100} img={<img src={Dt40.src} alt="dt40"/>}/>
          </div>
        }
        textTop={true}
      />


      <Divider title={"Počet radov DT"}
        component={<SingleChoice path={["h", "doska", "rady"]} labels={[1,2,3]}/>}
      />


      <Divider title={"Obvod stavby"}
        component={<NumberInput path={["h", "doska", "obvod"]} unit={"m"} />}
      />
        
      <Divider title={"Plocha stavby"}
        component={<NumberInput path={["h", "doska", "plocha"]} unit={"m"} sup={"2"}/>}
      />


    </FormLayout>
    </>
  );
}
