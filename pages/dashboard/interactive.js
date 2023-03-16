import Head from "next/head";
import React, {useState} from "react";
import TeamsList from "../../components/dashboard/TeamsList";
import UserInfoHeader from "../../components/user_components/UserInfoHeader";
import IconHome from "../../public/SVG/dashboard/IconHome";
import Logo from "../../public/SVG/Logo";
import HomeSVG from "../../components/HomeSVG"
import { useAuth } from "../../context/AuthContext"
import { useRouter } from "next/router";
import ArrowDown from "../../public/SVG/ArrowDown";
import { style } from "@mui/system";
import Functions from "../../components/landing_page/Functions";

import Preds from "../../components/config-page";

import FunctionDiv from "../../components/landing_page/FunctionDiv";
import FunctionDiv_p from "../../components/landing_page/FunctionDiv_p";


export default function Dashboard() {
  const router = useRouter(); 
  const [workTypes, SetWorkTypes] = useState([false, false, false])
  const [loading, setloading] = useState(false);
  const { userData } = useAuth();


  function hadndleWorkChange(ix){
    var newstate = [false, false, false]

    newstate[ix] = true

    console.log(ix)

    SetWorkTypes(newstate)
  }


	return (
		<div>
			<Head>
				<title>Dashboard</title>
			</Head>
			{/* <div style={{ backgroundColor: "#363636" }} className={"drop-shadow	"}> */}
			<div style={{ backgroundColor: "#2C2C2C" }} className={"drop-shadow	"}>

				{/* <Layout className="h-[55px]"> */}
				<div className="flex items-center justify-between px-4 h-[47px]">

					<div className="flex gap-4 text-white items-center">
						<HomeSVG />

						<div style={{ letterSpacing: "-0.2px" }}>
							<div style={{ fontSize: "14px" }}> {userData.name} </div>
							<div className="opacity-50 mt-[-4px]" style={{ fontSize: "10px" }}> {userData.email} </div>
						</div>

					</div>


					<UserInfoHeader color="white" is_smaller={true}/> 
				</div>
				{/* </Layout> */}
			</div>

			<div className="grid" style={{ gridTemplateColumns: "240px 1fr" }}>
				<TeamsList></TeamsList>

				<div className="mb-16 mt-16 mx-16">

					<button className="absolute " onClick={() => router.push('/dashboard/')}> 

            <div className="rotate-90">
              <ArrowDown color={"black"} ></ArrowDown>
            </div>
            
            
          </button>
          
            
          <div className="text-center  text-3xl w-[80%] font-medium	" style={{margin: "0 auto"}}>
            Vyberte typ práce, ktorú chcete naceniť. 
          </div>

          <div className="flex gap-8 mt-8 items-center justify-center">
            <SimpleButton active={workTypes[0]} title={"Hrubá stavba"} onClick={() => hadndleWorkChange(0)}></SimpleButton>
            <SimpleButton active={workTypes[1]} title={"Elektromonáže"} onClick={() => hadndleWorkChange(1)}></SimpleButton>
            <SimpleButton active={workTypes[2]} title={"Vykurovanie"} onClick={() => hadndleWorkChange(2)}></SimpleButton>
          </div>
            
            <hr className="mt-14"></hr>

            
          <div>
              {workTypes[0] && 
                <>
                  <div className="w-[80%] pt-16 text-2xl text-center font-medium" style={{ margin: "0 auto" }}>
                    Aby sme vedeli presne určiť cenu jednotlivých položiek, zadajte prosím potrebné parametre stavby:		
                  </div>
                  <Preds></Preds>

                
                </>
                }
              {workTypes[1] && <div className="text-center pt-10">Pripravujeme...</div>}
              {workTypes[2] && <div className="text-center pt-10">Pripravujeme...</div> }

          </div>

          
				</div>

        
			</div>
		</div>
	);
}


function SimpleButton({active, title, onClick}){
  return(
  <button onClick={onClick} className={`py-4 px-8 ${active? "bg-gray-50" : ""} hover:bg-gray-50 border rounded-md flex items-center justify-center gap-2 text-start `}>
      {title}
  </button>
  )
}