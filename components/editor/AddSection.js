import React from "react";
import { useData } from "../../context/AppWrap";
import ButtonPrimary from "../ButtonPrimary";

export default function AddSection({ sectionId }) {
	const { addBlock, addSection } = useData();
	return (
		<div className="mt-16">
			<div className="w-full p-6 border border-dashed min-h-[100px] flex justify-center items-center border-gray-600">
				<ButtonPrimary
					onClick={() => {
						addSection();
					}}
				>
					Pridať sekciu
				</ButtonPrimary>
			</div>
		</div>
	);
}
