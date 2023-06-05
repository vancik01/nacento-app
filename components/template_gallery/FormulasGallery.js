import React, { useState, useEffect } from "react";
import { useTemplate } from "../../context/TemplateContext";
import { motion } from "framer-motion";
import { useData } from "../../context/AppWrap";
import Close from "../../public/assets/general/Close";
import Zakladovka from "../form/steps/Zakladovka";
import Murivo from "../form/steps/Murivo";
import Strecha from "../form/steps/Strecha";
import PripojkaNN from "../form/steps/PripojkaNN";
import InstalacnePrace from "../form/steps/InstalacnePrace";
import Bleskozvod from "../form/steps/Bleskozvod";
import Predpripravy from "../form/steps/Predpripravy";
import Vykurovanie from "../form/steps/Vykurovanie";
import { useApi } from "../../context/ApiContext";
import PopupLoading from "../loading/PopupLoading";
import Measure from "../../public/assets/form/Measure";


const workTypeData = {
	'hruba_stavba' : [
		{
			label : "Základová doska",
			component : <Zakladovka/>,
			id: "zakladovka"
		},
		{
			label : "Murovacie práce",
			component : <Murivo/>,
			id: "murivo"
		},
		{
			label : "Strecha",
			component : <Strecha/>,
			id: "strecha"
		}
	],
	'elektro' : [
		{
			label : "Prípojka nízkeho napätia",
			component : <PripojkaNN/>,
			id: "pripojka"
		},
		{
			label : "Elektroinštalačné práce",
			component : <InstalacnePrace/>,
			id: "elektroinstalacky"
		},
		{
			label : "Bleskozvod",
			component : <Bleskozvod/>,
			id: "bleskac"
		},
		{
			label : "Predprípravy",
			component : <Predpripravy/>,
			id: "predpripravy"
		}
	],
	'kurenie' : [
		{
			label : "Vykurovacie práce",
			component : <Vykurovanie/>,
			id: "vykurovanie"
		},

	]
}


export default function FormulasGallery() {
	const { loading, tab, workSelected } = useTemplate();
	const { setOpenFormulas, openFormulas } = useData()
	const { dataloading } = useApi()
	const [hover, sethover] = useState(false)

	useEffect(() => {
		if(openFormulas) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'unset';
	 }, [openFormulas]);


	 function handleClick(){
		window.open('https://api2.nacento.online/viewer', '_blank', 'noreferrer');
	  }

	const labels = {
		"hruba_stavba" : "🏠 Hrubá stavba",
		"elektro" : "⚡️ Elektroinštalácie",
		"kurenie" : "🔥 Vykurovanie"
	}


	return (
		<motion.div
			key="template-body"
			initial={{ opacity: 0, y: 20 }}
			exit={{ opacity: 0, y: 0 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2, delay: 0.1 }}
			className="relative z-[100]"
		>	
			<PopupLoading loading={dataloading}/> 

			<div
				className="h-[93vh] w-[80vw] bg-white rounded-lg grid shadow-2xl"
				style={{ gridTemplateColumns: "200px 1fr" }}>

				{!loading ? (
					<>
						<div className="border-r-[1px] rounded-l-lg pt-8 pb-8" style={{backgroundColor: "rgb(251, 251, 250)"}}>
							<div className="px-8 font-bold">Typ Práce</div>
							<div className="mt-4">

								<MenuItem text={"🏠 Hrubá stavba"} type={"hruba_stavba"}/>
								<MenuItem text={"⚡️ Elektroinštalácie"} type={"elektro"}/>
								<MenuItem text={"🔥 Vykurovanie"} type={"kurenie"}/>


								<div className="mt-12 text-sm opacity-80">

									<div className="pb-1 mt-2 text-center "> Aplikácia pre výmery: </div>

									<div onClick={handleClick} className={"shadow-sm flex justify-center w-[90%] items-center cursor-pointer gap-1 border bg-white border-slate-300 trans font-medium rounded-sm px-2 py-2 hover:border-rose-600 hover:text-rose-600 "}
										style={{margin: "0 auto"}}
										onMouseEnter={() => sethover(true)}
										onMouseLeave={() => sethover(false)}>
												
											<Measure color={hover ? "red" : "black"}/>

											<div>Vymeraj z projektu</div>
									</div>				
								</div>
							</div>


						</div>

						<div className="flex flex-col">
							<div className=" pt-8">
								<div className="flex items-center px-8 justify-between">
									<div className="text-2xl font-medium">{labels[`${workSelected}`]}</div>
									
					
										<div className="p-2 hover:bg-gray-300 hover:opacity-100 opacity-50 rounded cursor-pointer trans" 
											onClick={() => setOpenFormulas(false)}>
											<Close/>
										</div>
										
									
								</div>

								<div className="mt-4 text-sm flex justify-start items-center gap-4 border-b-[1px] px-8">

									{workTypeData[`${workSelected}`].map((item, ix) => {
										return(
											<React.Fragment key={`stepper${ix}`}>
												<div key={`tabItem_${workSelected}_${ix}`}>
													<Tab name={item.label} id={item.id}></Tab>
												</div>

												
												{ ix < workTypeData[`${workSelected}`].length-1 && 
												<div key={`dot${ix}`}
													className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-1 w-1 flex items-center justify-center  }`}>
												</div>
												}
											</React.Fragment>	
										)
									})}

									
									{/* <Tab name="Sekcie" id="section"></Tab>
									<Tab name="Bloky" id="block"></Tab>
									<Tab name="Položky" id="item"></Tab> */}

								</div>
							</div>
							<div className="w-full h-[1px]"></div>

							<div className="mx-4 mt-4 mb-2 h-full rounded-md relative">
								<div className="absolute inset-0 p-4 flex flex-col gap-4 overflow-y-scroll">

									{workTypeData[`${workSelected}`].map((item, ix) => {
										return(
											<>
											{tab === item.id && item.component 
											}
											</>
										)
									})}

								</div>
							</div>
						</div>
					</>
				) : (
					<TemplateSkeleton></TemplateSkeleton>
				)}
			</div>

		</motion.div>
	);
}

function MenuItem({ text, type }){
	const { settab, workSelected, selectWork } = useTemplate();

	function handleSelect(){
		settab(workTypeData[`${type}`][0].id)
		selectWork(type)
	}

	return(
		<div onClick={handleSelect} className={"py-2 pl-6 hover:bg-gray-100 cursor-pointer " + (workSelected === type && "bg-gray-100 font-medium")}>
			{text}
		</div>
	)


}


export function TemplateSkeleton() {
	return (
		<>
			<div className="border-r-[1px] pt-8 pb-8">
				<div className="h-6 w-[100px] skeleton ml-8 rounded-md"></div>
				<div className="mt-4 flex flex-col gap-2">
					<div className=" h-8 w-full skeleton"></div>
					<div className=" h-8 w-full skeleton"></div>
					<div className=" h-8 w-full skeleton"></div>
					<div className=" h-8 w-full skeleton"></div>
					<div className=" h-8 w-full skeleton"></div>
				</div>
			</div>
			<div className="flex flex-col">
				<div className="px-8 pt-8">
					<div className="flex items-center justify-between">
						<div className="h-8 w-40 rounded-md skeleton"></div>
						<div className="flex items-center gap-4">
							<div className=" h-8 w-16 skeleton rounded-md"></div>
							<div className=" h-8 w-16 skeleton rounded-md"></div>
						</div>
					</div>

					<div className="mt-4 text-sm flex justify-start gap-2">
						<div className=" h-4 w-16 skeleton rounded-tl-md rounded-tr-md "></div>
						<div className=" h-4 w-16 skeleton rounded-tl-md rounded-tr-md "></div>
						<div className=" h-4 w-16 skeleton rounded-tl-md rounded-tr-md "></div>
						<div className=" h-4 w-16 skeleton rounded-tl-md rounded-tr-md "></div>
					</div>
				</div>
				<div className="w-full h-[1px] bg-gray-200"></div>

				<div className="m-4 h-full bg-gray-50 rounded-md p-4 flex flex-col gap-4">
					<div className="skeleton h-12 w-full rounded-md"></div>
					<div className="skeleton h-12 w-full rounded-md"></div>
					<div className="skeleton h-12 w-full rounded-md"></div>
					<div className="skeleton h-12 w-full rounded-md"></div>
				</div>
			</div>
		</>
	);
}

function Tab({ name, id }) {
	const { selectTab, tab } = useTemplate();
	return (
		<button
			onClick={() => {
				selectTab(id);
			}}
			className="w-fit"
		>
			<div className="text-base">{name}</div>
			<div
				className={`h-[3px] rounded-tl-lg rounded-tr-lg w-full transition-all ${
					tab === id ? "bg-blue-500" : ""
				}`}
			></div>
		</button>
	);
}
