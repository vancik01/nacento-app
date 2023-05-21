import React, { useState } from "react";
import ArrowDown from "../../public/assets/general/ArrowDown";
import { useTemplate } from "./TemplateContext";

export default function TemplateBlock({ template }) {
	const [extand, setextand] = useState(false);
	const { addBlockToInsert } = useTemplate();
	return (
		<div className="bg-white p-2 shadow-sm rounded-md select-none">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-2">
					<input
						type="checkbox"
						name=""
						id=""
						className=""
						onChange={() => {
							addBlockToInsert(template.data);
						}}
					/>
					<div>{template.data.info.title}</div>
				</div>
				<button
					className="p-1"
					onClick={() => {
						setextand(!extand);
					}}
				>
					<ArrowDown></ArrowDown>
				</button>
			</div>
			{extand && (
				<ul className="mt-2 flex flex-col gap-3 ml-3 list-outside list-disc">
					{template.data.items.map((item, itemId) => {
						return <li className="text-sm ml-4">{item.title}</li>;
					})}
				</ul>
			)}
		</div>
	);
}
