import { Button } from "@mui/material";
import React from "react";
import ButtonPrimary from "../ButtonPrimary";
import Pro from "../Pro";

export default function TeamsList() {
	return (
		<div className="h-screen border-r-[1px] py-4">
			<div className="bg-primary bg-opacity-10 m-4 p-2 rounded-md">
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
			</div>
			<div>
				<h2 className="px-4 mt-10 text-sm font-bold">Zoznam Teamov</h2>

				<div className="mt-2">
					<ProjectItem selected={true} />
					<ProjectItem />
					<ProjectItem />
					<ProjectItem />
					<ProjectItem />
				</div>
			</div>
		</div>
	);
}

function ProjectItem({ selected, team }) {
	return (
		<button
			className={`py-2 px-4  flex items-center gap-4 hover:bg-gray-50 transition-colors w-full ${
				selected ? "bg-gray-50" : ""
			}`}
		>
			<div className="h-4 aspect-square bg-blue-600"></div>
			<div className="text-sm">Default Project</div>
		</button>
	);
}
