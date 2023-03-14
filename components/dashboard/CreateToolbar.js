import React from "react";
import IconHome from "../../public/SVG/dashboard/IconHome";
import Plus from "../../public/SVG/dashboard/Plus";

export default function CreateToolbar() {
	return (
		<div className=" flex items-center justify-start gap-8">
			<AddButton
				text="Prázdna cenová ponuka"
				subtext="Začnite od nuly"
				color="#73A496"
			></AddButton>
			<AddButton
				text="Interaktívna cenová ponuka"
				subtext="Zadajte len parametre stavby"
			></AddButton>
		</div>
	);
}

function AddButton({ text, subtext, color }) {
	return (
		<button className="py-3 px-3 border rounded-md flex items-center justify-center gap-2 text-start hover:bg-gray-50 transition-all">
			<IconHome color={color}></IconHome>
			<div>
				<div className="text-sm font-regular">{text}</div>
				<div className="text-xs font-light text-gray-400">{subtext}</div>
			</div>

			<div className="ml-8">
				<Plus></Plus>
			</div>
		</button>
	);
}
