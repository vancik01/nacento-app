import { TextareaAutosize } from "@mui/material";
import React from "react";
import { useData } from "../../context/AppWrap";
import { useLayout } from "../../context/LayoutContext";
import AddRow from "../../public/SVG/AddRow";
import AddSection from "./AddSection";
import TestElement from "./TestElement";

export default function SectionSummary({ blocks, sectionId, sectionsLength }) {
	const { primaryColor } = useLayout();
	const { addBlock, editBlockTitle, test, settest } = useData();
	return (
		<div className="mt-4 table_wrap">
			{blocks.length > 0 && (
				<div
					className="grid py-2 text-white text-sm"
					style={{
						background: primaryColor,
						gridTemplateColumns: "50px 1fr 140px 140px 140px",
					}}
				>
					<div className="text-center">N.</div>
					<div className="pl-2">Názov</div>
					<div className="pl-2">Cena Montáže</div>
					<div className="pl-2">Cena Dodávky</div>
					<div className="pl-2">Cena Celkom</div>
				</div>
			)}

			{blocks.map((block, blockId) => {
				return (
					<div
						key={blockId}
						className={`grid table_row content ${
							blockId === blocks.length - 1 ? "last" : ""
						}`}
						style={{ gridTemplateColumns: "50px 1fr 140px 140px 140px" }}
					>
						<div className="h-full flex items-center justify-start py-1 px-2 table_unit">
							{blockId + 1}
						</div>
						<div className="h-full flex items-center justify-start py-1 px-2 table_unit">
							<TextareaAutosize
								className="w-full bg-transparent focus-visible:outline-none h-fit overflow-visible"
								value={block.info.title}
								onChange={(e) => {
									editBlockTitle(e.target.value, sectionId, blockId);
								}}
								style={{ resize: "none" }}
							/>
						</div>
						<div className="h-full flex items-center justify-start py-1 px-2 table_unit">
							{parseFloat(block.info.total_construction_price).toFixed(2)} €
						</div>

						<div className="h-full flex items-center justify-start py-1 px-2 table_unit">
							{parseFloat(block.info.total_delivery_price).toFixed(2)} €
						</div>
						<div className="h-full flex items-center justify-start py-1 px-2 table_unit">
							{parseFloat(block.info.total).toFixed(2)} €
						</div>
					</div>
				);
			})}
			<button
				onClick={() => {
					addBlock(sectionId);
				}}
				className="flex justify-center items-center gap-4 mt-2"
			>
				<div className="w-3">
					<AddRow color={primaryColor}></AddRow>
				</div>
				<div className="text-sm" style={{ color: primaryColor }}>
					{blocks.length === 0 ? "Pridať tabuľku" : "Pridať riadok"}
				</div>
			</button>
			<button
				onClick={(e) => {
					settest({
						x: e.pageX,
						y: e.pageY,
					});
				}}
			>
				Click
			</button>

			{test && <TestElement></TestElement>}
		</div>
	);
}
