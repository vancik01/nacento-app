import { TextareaAutosize } from "@mui/material";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useData } from "../../context/AppWrap";
import { useLayout } from "../../context/LayoutContext";
import AddRow from "../../public/SVG/AddRow";
import TrashBin from "../../public/SVG/editor/TrashBin";
import DragableIcon from "../../public/SVG/Dragable";
import AddSection from "./AddSection";
import TestElement from "./TestElement";

export default function SectionSummary({ blocks, sectionId, sectionsLength }) {
	const { primaryColor } = useLayout();
	const {
		addBlock,
		editBlockTitle,
		deleteBlock,
		reorderBlocks,
		openBulkEdit,
		getTitle,
	} = useData();
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
			<DragDropContext
				onDragEnd={(e) => {
					reorderBlocks(e, sectionId);
				}}
			>
				<Droppable droppableId={`table`}>
					{(provided) => (
						<div {...provided.droppableProps} ref={provided.innerRef}>
							{blocks.map((block, blockId) => {
								return (
									<Draggable
										key={`${sectionId}-${blockId}`}
										draggableId={`block-${blockId}`}
										index={blockId}
									>
										{(provided, snapshot) => (
											<div {...provided.draggableProps} ref={provided.innerRef}>
												<div
													className={`grid table_row content relative ${
														blockId === blocks.length - 1 ? "last" : ""
													}`}
													style={{
														gridTemplateColumns: "50px 1fr 140px 140px 140px",
													}}
												>
													<div className="h-full flex items-center justify-start py-1 px-2 table_unit">
														{blockId + 1}
													</div>
													<div className="h-full flex items-center justify-start py-1 px-2 table_unit">
														<TextareaAutosize
															spellCheck="false"
															className="w-full bg-transparent focus-visible:outline-none h-fit overflow-visible"
															value={block.info.title}
															onChange={(e) => {
																editBlockTitle(
																	e.target.value,
																	sectionId,
																	blockId
																);
															}}
															style={{ resize: "none" }}
														/>
													</div>
													<button
														className="h-full flex items-center justify-start py-1 px-2 table_unit"
														onClick={(e) => {
															openBulkEdit(
																{
																	blockId: blockId,
																	sectionId: sectionId,
																	value: block.info["total_construction_price"],
																	valueId: "total_construction_price",
																	title: getTitle(
																		"total_construction_price",
																		"sk"
																	).long,
																	mode: "block",
																},
																e
															);
														}}
													>
														{parseFloat(
															block.info.total_construction_price
														).toFixed(2)}{" "}
														€
													</button>

													<button
														className="h-full flex items-center justify-start py-1 px-2 table_unit"
														onClick={(e) => {
															openBulkEdit(
																{
																	blockId: blockId,
																	sectionId: sectionId,
																	value: block.info["total_delivery_price"],
																	valueId: "total_delivery_price",
																	title: getTitle("total_delivery_price", "sk")
																		.long,
																	mode: "block",
																},
																e
															);
														}}
													>
														{parseFloat(
															block.info.total_delivery_price
														).toFixed(2)}{" "}
														€
													</button>
													<button
														className="h-full flex items-center justify-start py-1 px-2 table_unit"
														onClick={(e) => {
															openBulkEdit(
																{
																	blockId: blockId,
																	sectionId: sectionId,
																	value: block.info["total"],
																	valueId: "total",
																	title: getTitle("total", "sk").long,
																	mode: "block",
																},
																e
															);
														}}
													>
														{parseFloat(block.info.total).toFixed(2)} €
													</button>

													<div className="flex justify-end gap-1 select-none absolute -right-20">
														<button
															onClick={() => {
																deleteBlock(sectionId, blockId);
															}}
														>
															<TrashBin />
														</button>
														<div {...provided.dragHandleProps}>
															<DragableIcon />
														</div>
													</div>
												</div>
											</div>
										)}
									</Draggable>
								);
							})}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			<button
				onClick={() => {
					addBlock(sectionId, blocks.length - 1);
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
		</div>
	);
}
