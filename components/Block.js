import { Input } from "@mui/material";
import React, { useState } from "react";
import { useData } from "../context/AppWrap";
import { useLayout } from "../context/LayoutContext";
import AddRow from "../public/SVG/AddRow";
import DragableIcon from "../public/SVG/Dragable";
import EditPen from "../public/SVG/EditPen";
import ButtonPrimary from "./ButtonPrimary";
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
					{!editingTitle && (
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
						<div className="flex justify-center items-baseline">
							<div className="text-2xl mr-1">{blockId + 1}. </div>
							<Input
								type="text"
								value={blockTitle}
								onChange={(e) => {
									setblockTitle(e.target.value);
								}}
								className="text-2xl"
							/>
							<ButtonPrimary className="ml-8" onClick={handleEditTitle}>
								Uložiť
							</ButtonPrimary>
						</div>
					)}

					{collapsed && (
						<div {...dragHandleProps}>
							<DragableIcon></DragableIcon>
						</div>
					)}
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
						className="flex justify-center items-center gap-4 mt-4"
					>
						<div className="w-3">
							<AddRow color={primaryColor}></AddRow>
						</div>
						<div className="text-sm" style={{ color: primaryColor }}>
							Pridať riadok
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
									onClick={() => {
										openBulkEdit({
											blockId: blockId,
											sectionId: sectionId,
											value: block.info["total_delivery_price"],
											valueId: "total_delivery_price",
											title: getTitle("total_delivery_price", "sk").long,
											mode: "block",
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
								Cena montáže celkom:{" "}
								{parseFloat(block.info["total_construction_price"]).toFixed(2)}{" "}
								€
							</div>
							{!bulkEdit && (
								<button
									onClick={() => {
										openBulkEdit({
											blockId: blockId,
											sectionId: sectionId,
											value: block.info["total_construction_price"],
											valueId: "total_construction_price",
											mode: "block",
											title: getTitle("total_construction_price", "sk").long,
										});
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
									onClick={() => {
										openBulkEdit({
											blockId: blockId,
											sectionId: sectionId,
											value: block.info.total,
											valueId: "total",
											title: getTitle("total", "sk").long,
											mode: "block",
										});
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
