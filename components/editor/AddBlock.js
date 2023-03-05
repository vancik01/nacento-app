import React from "react";
import { useData } from "../../context/AppWrap";
import ButtonPrimary from "../ButtonPrimary";

export default function AddBlock({ sectionId }) {
	const { addBlock } = useData();
	return (
		<div className="mt-16">
			<div className="w-full p-6 border border-dashed min-h-[100px] flex justify-center items-center bg-gray-100">
				<ButtonPrimary
					onClick={() => {
						addBlock(sectionId, 0);
					}}
				>
					Pridať blok
				</ButtonPrimary>
			</div>
			<div className="w-full flex justify-end mt-4 gap-4">
				<div className="w-1/6 bg-gray-100 h-5 rounded-sm"></div>
				<div className="w-1/6 bg-gray-100 h-5 rounded-sm"></div>
				<div className="w-1/6 bg-gray-100 h-5 rounded-sm"></div>
			</div>
		</div>
	);
}
