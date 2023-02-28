import { Input } from "@mui/material";
import React, { useState } from "react";
import { useData } from "../context/AppWrap";
import { useLayout } from "../context/LayoutContext";
import AddRow from "../public/SVG/AddRow";
import BlockIcon from "../public/SVG/BlockIcon";
import Cancel from "../public/SVG/Cancel";
import DragableIcon from "../public/SVG/Dragable";
import EditPen from "../public/SVG/EditPen";
import ButtonPrimary from "./ButtonPrimary";
import EditText from "./editor/EditText";
import Table from "./Table";

export default function Block({
	headers,
	block,
	blockId,
	collapsed,
	dragHandleProps,
	sectionId,
}) {
	const {
		editBlockTitle,
		bulkEdit,
		openBulkEdit,
		getTitle,
		addTableRow,
		reorderingBlocks,
		deleteBlock,
	} = useData();
	const { primaryColor } = useLayout();
	const [editingTitle, seteditingTitle] = useState(false);
	const [blockTitle, setblockTitle] = useState(block.info.title);
	function handleEditTitle() {
		editBlockTitle(blockTitle, sectionId, blockId);
		seteditingTitle(false);
	}
	return (
		<div className="">
			<div
				className={`bg-white rounded-md ${collapsed ? "py-6" : "py-6"}`}
				key={blockId}
			>
				<div className="flex justify-between items-end mb-4">
					{/* {!editingTitle && (
						<div className="relative w-fit">
							<h3 className="text-2xl">
								{blockId + 1}. {block.info.title}
							</h3>
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
							<div className="text-2xl mr-2">{blockId + 1}. </div>
							<input
								type="text"
								className="outline-none"
								value={blockTitle}
								placeholder="Zadajte názov bloku..."
								onChange={(e) => {
									setblockTitle(e.target.value);
								}}
								style={{ fontSize: 24 }}
							/>
							<ButtonPrimary className="ml-8" onClick={handleEditTitle}>
								Uložiť
							</ButtonPrimary>
						</div>
					)} */}

					<EditText
						initialValue={block.info.title}
						classInput="w-fit"
						classText="!justify-start"
						onSave={(value) => {
							editBlockTitle(value, sectionId, blockId);
						}}
					/>

					<div className="flex items-center gap-4">
						<button
							onClick={() => {
								deleteBlock(sectionId, blockId);
							}}
							className="flex items-center justify-center gap-2"
						>
							<Cancel color="#ef4444"></Cancel>
							<div className="text-sm text-red-500">Zmazať blok</div>
						</button>
						{collapsed && (
							<div {...dragHandleProps}>
								<DragableIcon></DragableIcon>
							</div>
						)}
					</div>
				</div>

				{!collapsed && (
					<Table
						sectionId={sectionId}
						blockId={blockId}
						items={block.items}
						headers={headers}
					/>
				)}

				{!reorderingBlocks && (
					<button
						onClick={() => {
							addTableRow(blockId, sectionId);
						}}
						className="flex justify-center items-center gap-4 mt-2"
					>
						<div className="w-3">
							<AddRow color={primaryColor}></AddRow>
						</div>
						<div className="text-sm" style={{ color: primaryColor }}>
							{block.items.length === 0 ? "Pridať tabuľku" : "Pridať riadok"}
						</div>
					</button>
				)}

				{!collapsed && (
					<div className="flex flex-row gap-10 text-sm items-end justify-end mt-8">
						<div className="relative w-fit">
							<div>
								Cena dodávky celkom:{" "}
								{parseFloat(block.info["total_delivery_price"]).toFixed(2)} €
							</div>
							{!bulkEdit && (
								<button
									onClick={(e) => {
										openBulkEdit(
											{
												blockId: blockId,
												sectionId: sectionId,
												value: block.info["total_delivery_price"],
												valueId: "total_delivery_price",
												title: getTitle("total_delivery_price", "sk").long,
												mode: "block",
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
								Cena montáže celkom:{" "}
								{parseFloat(block.info["total_construction_price"]).toFixed(2)}{" "}
								€
							</div>
							{!bulkEdit && (
								<button
									onClick={(e) => {
										openBulkEdit(
											{
												blockId: blockId,
												sectionId: sectionId,
												value: block.info["total_construction_price"],
												valueId: "total_construction_price",
												mode: "block",
												title: getTitle("total_construction_price", "sk").long,
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
							<div className="font-bold">
								Cena spolu: {parseFloat(block.info.total).toFixed(2)} €
							</div>
							{!bulkEdit && (
								<button
									onClick={(e) => {
										openBulkEdit(
											{
												blockId: blockId,
												sectionId: sectionId,
												value: block.info.total,
												valueId: "total",
												title: getTitle("total", "sk").long,
												mode: "block",
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
				)}
			</div>
		</div>
	);
}
