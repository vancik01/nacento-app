import { useStepper } from "../../../context/StepperContext";
import IntroSection from "../IntroSection";
import FormLayout from "../FormLayout";
import Divider from "../Divider";
import SingleChoice from "../SingleChoice";
import IconInput from "../IconInput";



import tehla45 from "../../../public/assets/form/tehly/family-44.jpg"
import tehla30 from "../../../public/assets/form/tehly/family-30.jpg"
import tehla25 from "../../../public/assets/form/tehly/family-25.jpg"
import tehla15 from "../../../public/assets/form/tehly/heluz-14.jpg"
import tehla10 from "../../../public/assets/form/tehly/heluz-115.jpg"

import y100 from "../../../public/assets/form/YTONG/Y100.jpg"
import y150 from "../../../public/assets/form/YTONG/Y150.jpg"
import y250 from "../../../public/assets/form/YTONG/Y250.jpg"
import y300 from "../../../public/assets/form/YTONG/Y300.jpg"
import y375 from "../../../public/assets/form/YTONG/Y375.jpg"
import y450 from "../../../public/assets/form/YTONG/Y450.jpg"



export default function Murivo() {
  const { hsdata, sethsdata, color, setColor, ChangeHsValue } = useStepper();

  return (
    <div className="bg-white pb-10">
        <IntroSection title={"murovacie práce"} ix={1}  text={"pôdorysu 1. NP"} type={"MP"}/>

        <FormLayout>

          <Divider title={"Murovací materiál"}
          component={<SingleChoice path={["h", "murivo", "material"]} labels={["Tehla", "YTONG"]}/>}/>


          {hsdata["murivo"]["material"][0] === "" || hsdata["murivo"]["material"][0] !== "1" ? 
            <Divider title={<span>Objemy tehál v m<sup>3</sup></span>} subtitle={"(na jedno poschodie)"}
            component={<TehlaItems/>}
            textTop={true}/> 
            
            : <Divider title={<span>Objemy YTONGU v m<sup>3</sup></span>} subtitle={"(na jedno poschodie)"}
            component={<YtongItems/>}
            textTop={true}/> 
          }

      <Divider title={"Počet poschodí"}
        component={<SingleChoice path={["h", "murivo", "poschodia"]} labels={[1,2,3]}/>}
      />


        </FormLayout>
    
    </div>
  );
}

function TehlaItems(){
  return(
    <div className="grid icon-grid">
        <IconInput path={["h", "murivo", "t45"]} label={"Šírka 450mm"} img={<img src={tehla45.src} alt="tehla45"/>} add={10} decimal/>
        <IconInput path={["h", "murivo", "t30"]} label={"Šírka 300mm"} img={<img src={tehla30.src} alt="tehla30"/>} add={10} decimal/>
        <IconInput path={["h", "murivo", "t25"]} label={"Šírka 250mm"} img={<img src={tehla25.src} alt="tehla25"/>} add={10} decimal/>
        <IconInput path={["h", "murivo", "t15"]} label={"Šírka 150mm"} img={<img src={tehla15.src} alt="tehla15"/>} add={10} decimal/>
        <IconInput path={["h", "murivo", "t10"]} label={"Šírka 100mm"} img={<img src={tehla10.src} alt="tehla10"/>} add={10} decimal/>
    </div>
  )
}


function YtongItems(){
  return(
    <div className="grid icon-grid">
        <IconInput path={["h", "murivo", "Y400"]} label={"Šírka 400mm"} img={<img src={y450.src} alt="y450"/>} add={10} decimal/>
        <IconInput path={["h", "murivo", "Y375"]} label={"Šírka 375mm"} img={<img src={y375.src} alt="y375"/>} add={10} decimal/>
        <IconInput path={["h", "murivo", "Y300"]} label={"Šírka 300mm"} img={<img src={y300.src} alt="y300"/>} add={10} decimal/>
        <IconInput path={["h", "murivo", "Y250"]} label={"Šírka 250mm"} img={<img src={y250.src} alt="y250"/>} add={10} decimal/>
        <IconInput path={["h", "murivo", "Y150"]} label={"Šírka 150mm"} img={<img src={y150.src} alt="y150"/>} add={10} decimal/>
        <IconInput path={["h", "murivo", "Y100"]} label={"Šírka 100mm"} img={<img src={y100.src} alt="y100"/>} add={10} decimal/>

    </div>
  )
}



