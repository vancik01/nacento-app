import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useData } from "../context/AppWrap";
import { useLayout } from "../context/LayoutContext";
import { numberWithCommas } from "../lib/helpers";
import EditPen from "../public/SVG/EditPen";
import Block from "./Block";
import ButtonPrimary from "./ButtonPrimary";
import AddBlock from "./editor/AddBlock";
import AddSection from "./editor/AddSection";
import EditText from "./editor/EditText";
import SectionSummary from "./editor/SectionSummary";

export default function Section({ section, sectionId, isLast }) {
	const {
		headers,
		reorderingBlocks,
		data,
		bulkEdit,
		openBulkEdit,
		changeSectionTitle,
	} = useData();
	const { primaryColor, variant } = useLayout();
	const [editingTitle, seteditingTitle] = useState(false);
	const [sectionTitle, setSectionTitle] = useState(section.info.title);

	function handleEditTitle() {
		seteditingTitle(false);
		changeSectionTitle(sectionId, sectionTitle);
	}

	var total = {
		total: parseFloat(data.sections[sectionId].info.total),
		total_construction_price: parseFloat(
			data.sections[sectionId].info.total_construction_price
		),
		total_delivery_price: parseFloat(
			data.sections[sectionId].info.total_delivery_price
		),
	};

	return (
		<div className="pt-10" id={isLast ? "last-section" : ""}>
			<div className="p-8 border-2">
				<EditText
					initialValue={section.info.title}
					onSave={(value) => {
						changeSectionTitle(sectionId, value);
					}}
				/>

				<div className="mb-1 text-gray-300 capitalize">CENA:</div>

				<div className="text-sm flex flex-row items-center justify-between">
					<div className="relative w-fit text-sm">
						<div>
							Cena Montáže: <br />
							{numberWithCommas(total.total_construction_price.toFixed(2))} €
						</div>
						{!bulkEdit && (
							<button
								onClick={(e) => {
									openBulkEdit(
										{
											sectionId: sectionId,
											blockId: -1,
											value: total.total_construction_price,
											valueId: "total_construction_price",
											mode: "section",
										},
										e
									);
								}}
								className="absolute top-0 -right-3 w-2"
							>
								<EditPen></EditPen>
							</button>
						)}
					</div>

					<div className="relative w-fit text-sm">
						<div>
							Cena Dodávky: <br />
							{numberWithCommas(total.total_delivery_price.toFixed(2))} €
						</div>
						{!bulkEdit && (
							<button
								onClick={(e) => {
									openBulkEdit(
										{
											sectionId: sectionId,
											blockId: -1,
											value: total.total_delivery_price,
											valueId: "total_delivery_price",
											mode: "section",
										},
										e
									);
								}}
								className="absolute top-0 -right-3 w-2"
							>
								<EditPen></EditPen>
							</button>
						)}
					</div>

					<div className="relative w-fit">
						<div>
							Spolu: <br />
							{numberWithCommas(total.total.toFixed(2))} €{" "}
							<span className="text-[10px]">bez DPH</span>
						</div>
						{!bulkEdit && (
							<button
								onClick={(e) => {
									openBulkEdit(
										{
											sectionId: sectionId,
											blockId: -1,
											value: total.total,
											valueId: "total",
											mode: "section",
										},
										e
									);
								}}
								className="absolute top-0 -right-3 w-2"
							>
								<EditPen></EditPen>
							</button>
						)}
					</div>
				</div>

				{variant.sectionSummary &&
					data.sections.map((section, sectionId) => {
						return (
							<SectionSummary
								sectionsLength={data.sections.length}
								sectionId={sectionId}
								blocks={section.blocks}
							/>
						);
					})}
			</div>
			{!reorderingBlocks &&
				variant.blocks &&
				section.blocks.map((block, j) => {
					return (
						<div key={`block-${j}`}>
							<div>
								<Block
									sectionId={sectionId}
									key={j}
									block={block}
									headers={headers}
									blockId={j}
									collapsed={reorderingBlocks}
								/>
							</div>
						</div>
					);
				})}

			{reorderingBlocks && (
				<ReorderingBlocks section={section} sectionId={sectionId} />
			)}

			{variant.blocks && <AddBlock sectionId={sectionId} />}
		</div>
	);
}

function ReorderingBlocks({ section, sectionId }) {
	const { headers, total, reorderBlocks } = useData();
	return (
		<DragDropContext
			onDragEnd={(e) => {
				reorderBlocks(e, sectionId);
			}}
		>
			<Droppable droppableId={`block`}>
				{(provided) => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						{section.blocks.map((block, i) => {
							return (
								<Draggable key={i} draggableId={`block-${i}`} index={i}>
									{(provided) => (
										<div {...provided.draggableProps} ref={provided.innerRef}>
											<Block
												key={i}
												block={block}
												headers={headers}
												number={i}
												collapsed={true}
												sectionId={sectionId}
												blockId={i}
												dragHandleProps={{ ...provided.dragHandleProps }}
											/>
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
	);
}

function SectionRecapitulation({ section }) {
	return <div></div>;
}
