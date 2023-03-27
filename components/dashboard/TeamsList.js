import { Button } from "@mui/material";
import React from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import Pro from "../Pro";
import { useAuth } from "../../context/AuthContext";

export default function TeamsList() {
	return (
		<div className="hidden xl:h-screen xl:border-r-[1px] xl:py-4 xl:block">
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
				<div className="text-sm">{userData.name.replace(/ .*/, "")} tím</div>
			</div>

			<div className="ml-7 text-xs cursor-pointer"> + pozvať člena</div>
		</>
	);
}
