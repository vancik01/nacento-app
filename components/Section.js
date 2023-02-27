import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useData } from "../context/AppWrap";
import { useLayout } from "../context/LayoutContext";
import { numberWithCommas } from "../lib/helpers";
import EditPen from "../public/SVG/EditPen";
import Block from "./Block";
import ButtonPrimary from "./ButtonPrimary";
import AddBlock from "./editor/AddBlock";

export default function Section({ section, sectionId, isLast }) {
	const {
		headers,
		reorderingBlocks,
		data,
		bulkEdit,
		setBulkEdit,
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
				<div className="flex justify-center items-center mb-4">
					{!editingTitle && (
						<div className="relative w-fit">
							<h1 className="text-center ">{section.info.title}</h1>
							<button
								onClick={() => {
									seteditingTitle(true);
								}}
								className="absolute top-0 -right-5 w-3"
							>
								<EditPen></EditPen>
							</button>
						</div>
					)}

					{editingTitle && (
						<div className="flex justify-center items-center">
							<input
								type="text"
								className="outline-none"
								value={sectionTitle}
								placeholder="Zadajte názov bloku..."
								onChange={(e) => {
									setSectionTitle(e.target.value);
								}}
								style={{ fontSize: 16 }}
							/>
							<ButtonPrimary className="ml-8" onClick={handleEditTitle}>
								Uložiť
							</ButtonPrimary>
						</div>
					)}
				</div>

				<div className="mb-1 text-gray-300 capitalize">CENA:</div>

				<div className="text-sm flex flex-row items-center justify-between">
					<div className="relative w-fit text-sm">
						<div>
							Cena Montáže: <br />
							{numberWithCommas(total.total_construction_price.toFixed(2))} €
						</div>
						{!bulkEdit && (
							<button
								onClick={() => {
									openBulkEdit({
										sectionId: sectionId,
										blockId: -1,
										value: total.total_construction_price,
										valueId: "total_construction_price",
										mode: "section",
									});
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
								onClick={() => {
									openBulkEdit({
										sectionId: sectionId,
										blockId: -1,
										value: total.total_delivery_price,
										valueId: "total_delivery_price",
										mode: "section",
									});
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
								onClick={() => {
									openBulkEdit({
										sectionId: sectionId,
										blockId: -1,
										value: total.total,
										valueId: "total",
										mode: "section",
									});
								}}
								className="absolute top-0 -right-3 w-2"
							>
								<EditPen></EditPen>
							</button>
						)}
					</div>
				</div>

				{variant.sectionSummary && (
					<div className="mt-4 table_wrap">
						<div
							className="table_row heading grid !px-4 text-white"
							style={{
								background: primaryColor,
								gridTemplateColumns: "50px 1fr 100px 100px 100px",
							}}
						>
							<div>N.</div>
							<div>Názov</div>
							<div>Cena Montáže</div>
							<div>Cena Dodávky</div>
							<div>Cena Celkom</div>
						</div>
						{section.blocks.map((block, blockId) => {
							return (
								<div
									key={blockId}
									className={`grid table_row content ${
										blockId === section.blocks.length - 1 ? "last" : ""
									}`}
									style={{ gridTemplateColumns: "50px 1fr 100px 100px 100px" }}
								>
									<div className="h-full flex items-center justify-start py-1 px-2 table_unit">
										{blockId + 1}
									</div>
									<div className="h-full flex items-center justify-start py-1 px-2 table_unit">
										{block.info.title}
									</div>
									<div className="h-full flex items-center justify-start py-1 px-2 table_unit">
										{parseFloat(block.info.total_construction_price).toFixed(2)}{" "}
										€
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
					</div>
				)}
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

			<AddBlock sectionId={sectionId} />
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
