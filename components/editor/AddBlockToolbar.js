import React, { useEffect, useState } from "react";
import { useData } from "../../context/AppWrap";
import PlusCircle from "../../public/SVG/editor/PlusCircle";
import ButtonIcon from "../ButtonIcon";
import { motion } from "framer-motion";
import Copy from "../../public/SVG/buttons/Copy";
import { AnimatePresence } from "framer-motion";
import { useTemplate } from "../template_gallery/TemplateContext";

export default function AddBlockToolbar({ blockId, sectionId }) {
	const [toolbar, settoolbar] = useState(false);
	return (
		<div className="relative">
			<ButtonIcon
				icon={<PlusCircle />}
				onClick={() => {
					//addBlock(sectionId, blockId);
					settoolbar(!toolbar);
				}}
			>
				Pridať blok
			</ButtonIcon>
			<AnimatePresence>
				{toolbar && (
					<Toolbar
						blockId={blockId}
						sectionId={sectionId}
						close={() => {
							settoolbar(false);
						}}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}

function Toolbar({ close, blockId, sectionId }) {
	const { addBlock, triggerTemplate } = useData();

	useEffect(() => {
		const handleClickOutside = (event) => {
			console.log(event);
			close();
		};
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, []);

	return (
		<motion.div
			key={`add-block-toolbar`}
			initial={{ opacity: 0, y: 10 }}
			exit={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2 }}
			className="border-[1px] border-gray-100 absolute mt-1 left-0  shadow-hardShadow bg-white z-40 py-2 px-2 rounded-md"
		>
			<MenuItem
				onClick={() => {
					addBlock(sectionId, blockId);
				}}
				text="Prázdny blok"
				icon={<PlusCircle />}
			/>
			<MenuItem
				onClick={() => {
					triggerTemplate(0, blockId, sectionId, "block");
				}}
				text="Zoznam templatov"
				icon={<Copy />}
			/>
		</motion.div>
	);
}

function MenuItem({ onClick, icon, text }) {
	return (
		<button
			onClick={onClick}
			className="flex flex-row items-center gap-2 hover:bg-gray-100 w-full rounded-sm  py-1 px-2"
		>
			<div>{icon}</div>
			<div className="text-sm whitespace-nowrap">{text}</div>
		</button>
	);
}
