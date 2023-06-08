import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

import OfferGrayIcon from "../user_components/OfferGrayIcon";
import PlanningIcon from "../user_components/PlanningIcon";

export default function MenuSidebar({scope}) {

	return (
		<div className="hidden min-h-[100vh] xl:h-full xl:border-r-[1px] xl:py-4 xl:block" style={{backgroundColor: "rgb(251, 251, 250)"}}>

			<div className="sticky top-4">

				<div className="sticky">
					<h2 className="px-4 mt-1 text-lg">Tímy</h2>

					<div className="pl-4">
						<ProjectItem />
					</div>
				</div>

				{/* 
				{router.asPath === "/dashboard/" && (
					<div>
						<h2 className="px-4 mt-8 text-lg">Rýchle nacenenie</h2>

						<div className="flex flex-col pl-4">
							 #e11d48 
							<WorkItem text={"Hrubá stavba"} ix={0} />
							<WorkItem text={"Elektroinštalácie"} ix={1} />
							<WorkItem text={"Vykurovanie"} ix={2} />
						</div>
					</div>
				)} */}

				<hr className="pb-3 mt-5"/>

				
				<MenuOption text={'Cenové Ponuky'} href={"dashboard"} icon={<OfferGrayIcon/>} active={scope === 'dashboard'}/>
				{/* <MenuOption text={'Plánovanie'} href={"planning"} icon={<PlanningIcon/>} active={scope === 'planning'}/> */}
				<MenuOption text={'Stavby'} href={"stavby"}icon={<PlanningIcon/>} active={scope === 'stavby'}/>
				<MenuOption text={'Zamestantci'} href={"employees"} icon={<div className="h-3 aspect-square bg-blue-500"></div>} active={scope === 'employees'}/>
			

			</div>	
		</div>
	);
}

function MenuOption({text, active, href, icon}){
	const router = useRouter();

	return(
		<div onClick={() => router.push(`/${href}/`)} className={`w-[98%] flex pl-4 py-[5px] mx-1 rounded items-center gap-3 text-base cursor-default hover ` + (active? "bg-gray-100 font-medium" : "hover:bg-gray-100")}>
			{icon}
			{text}
		</div>
	)
}

function WorkItem({ text, ix }) {
	const router = useRouter();
	return (
		<div
			onClick={() => {
				window.localStorage.setItem("WORK_TYPE", ix);
				router.push("/dashboard/interactive/");
			}}
			className="px-4 pt-2 pb-1 flex items-center cursor-default gap-2 hover:bg-gray-50 transition-colors w-full"
		>
			{/* <div className={`h-3 ${bg} aspect-square`}></div> */}

			<div
				style={{ borderWidth: "3px" }}
				className={`rounded-full border-gray-700 h-[5px] w-[5px] flex items-center justify-center`}
			></div>

			<div className="text-sm">{text}</div>
		</div>
	);
}

function ProjectItem({ selected, team }) {
	const { userData } = useAuth();

	return (
		<>
			<div
				className={`px-4 pt-2 pb-1 flex items-center gap-2 hover:bg-gray-50 transition-colors w-full ${
					selected ? "bg-gray-50" : ""
				}`}
			>
				<div className="h-3 aspect-square bg-blue-500"></div>
				<div className="text-sm overflow-hidden">{userData.name.replace(/ .*/, "")} tím</div>
			</div>

			<div className="ml-7 text-xs cursor-pointer"> + pozvať člena</div>
		</>
	);
}
