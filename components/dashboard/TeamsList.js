import { Button } from "@mui/material";
import React from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import Pro from "../Pro";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

import HS from "../../pages/dashboard/icons/HS";
import Elektro from "../../pages/dashboard/icons/Elektro";
import Vykurovanie from "../../pages/dashboard/icons/Vykurovanie";

export default function TeamsList() {
	const router = useRouter();

	return (
		<div className="hidden xl:h-full xl:border-r-[1px] xl:py-4 xl:block">
			{/* <div className="bg-primary bg-opacity-10 m-4 p-2 rounded-md">
				<div className="flex items-center justify-start gap-2">
					<span className="text-lg font-medium">Získajte </span>
					<Pro></Pro>
				</div>
				<p className="text-sm text-gray-500 mt-2">
					Získajte rozšírené funkcionality našej platformy
				</p>
				<ButtonPrimary href="/pro" className="mt-4">
					Zistiť viac
				</ButtonPrimary>
			</div> */}
			<div>
				<h2 className="px-4 mt-1 text-lg">Tímy</h2>

				<div className="pl-4">
					<ProjectItem />
				</div>
			</div>

			{router.asPath === "/dashboard/" && (
				<div>
					<h2 className="px-4 mt-8 text-lg">Rýchle nacenenie</h2>

					<div className="flex flex-col pl-4">
						{/* #e11d48 */}
						<WorkItem text={"Hrubá stavba"} ix={0} />
						<WorkItem text={"Elektroinštalácie"} ix={1} />
						<WorkItem text={"Vykurovanie"} ix={2} />
					</div>
				</div>
			)}
		</div>
	);
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
