import React from "react";
import { useData } from "../../context/AppWrap";
import Plus from "../../public/SVG/buttons/Plus";
import ButtonPrimary from "../buttons/ButtonPrimary";

export default function AddSection({ sectionId }) {
	const { addBlock, addSection } = useData();
	return (
		<div className="">
			<div className="w-full p-6 border border-dashed min-h-[100px] flex justify-center items-center border-gray-600">
				<ButtonPrimary
					onClick={() => {
						addSection();
					}}
					icon={<Plus />}
					iconAfter
				>
					Pridať sekciu
				</ButtonPrimary>
			</div>
		</div>
	);
}
