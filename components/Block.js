import { Input } from "@mui/material";
import React, { useState } from "react";
import { useData } from "../context/AppWrap";
import { useLayout } from "../context/LayoutContext";
import AddRow from "../public/SVG/AddRow";
import BlockIcon from "../public/SVG/BlockIcon";
import DragableIcon from "../public/SVG/Dragable";
import MoreDots from "../public/SVG/editor/MoreDots";
import PlusCircle from "../public/SVG/editor/PlusCircle";
import TrashBin from "../public/SVG/editor/TrashBin";
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
		addBlock,
	} = useData();
	const { primaryColor } = useLayout();
	const [editingTitle, seteditingTitle] = useState(false);
	const [blockTitle, setblockTitle] = useState(block.info.title);
	function handleEditTitle() {
		editBlockTitle(blockTitle, sectionId, blockId);
		seteditingTitle(false);
	}
	return (
		<div>
			<div
				className={`bg-white rounded-md ${collapsed ? "py-6" : "py-6"}`}
				key={blockId}
			>
				<div className="flex justify-between items-end mb-4">
					<span className="mr-2 text-xl">{blockId + 1}. </span>
					<EditText
						key={`text-block-${blockId}`}
						initialValue={block.info.title}
						classInput="w-fit"
						classText="!justify-start"
						fontSize={20}
						onSave={(value) => {
							editBlockTitle(value, sectionId, blockId);
						}}
					/>

					<div className="flex items-center gap-4 w-fit">
						<button
							onClick={() => {
								addBlock(sectionId, blockId);
							}}
							className="flex items-center gap-1"
						>
							<PlusCircle></PlusCircle>
							<div className="text-xs text-gray-400 whitespace-nowrap">
								Pridať blok
							</div>
						</button>

						<button
							onClick={() => {
								deleteBlock(sectionId, blockId);
							}}
							className="flex items-center gap-1"
						>
							<TrashBin />
							<div className="text-xs text-red-500 whitespace-nowrap">
								Zmazať blok
							</div>
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

				{!collapsed && (
					<div className="flex flex-row gap-10 text-xs items-end justify-between mt-4">
						{!reorderingBlocks && (
							<button
								onClick={() => {
									addTableRow(blockId, sectionId);
								}}
								className="flex justify-center items-center gap-4"
							>
								<div className="w-[10px]">
									<AddRow color={primaryColor}></AddRow>
								</div>
								<div className="text-xs" style={{ color: primaryColor }}>
									{block.items.length === 0
										? "Pridať tabuľku"
										: "Pridať riadok"}
								</div>
							</button>
						)}

						<div className="flex justify-end items-center gap-6">
							<button
								onClick={(e) => {
									openBulkEdit(
										{
											blockId: blockId,
											sectionId: sectionId,
											value: block.info["total_construction_price"],
											valueId: "total_construction_price",
											title: getTitle("total_construction_price", "sk").long,
											mode: "block",
										},
										e
									);
								}}
								className=""
							>
								<div className="relative w-fit">
									<div>
										Cena montáže celkom:{" "}
										{parseFloat(block.info["total_construction_price"]).toFixed(
											2
										)}{" "}
										€
									</div>
									<div className="absolute top-0 -right-3 w-2">
										<EditPen></EditPen>
									</div>
								</div>
							</button>

							<button
								onClick={(e) => {
									openBulkEdit(
										{
											blockId: blockId,
											sectionId: sectionId,
											value: block.info["total_delivery_price"],
											valueId: "total_delivery_price",
											mode: "block",
											title: getTitle("total_delivery_price", "sk").long,
										},
										e
									);
								}}
								className=""
							>
								<div className="relative w-fit">
									<div>
										Cena dodávky celkom:{" "}
										{parseFloat(block.info["total_delivery_price"]).toFixed(2)}{" "}
										€
									</div>
									<div className="absolute top-0 -right-3 w-2">
										<EditPen></EditPen>
									</div>
								</div>
							</button>

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
								className=""
							>
								<div className="relative w-fit">
									<div className="font-bold">
										Cena spolu: {parseFloat(block.info.total).toFixed(2)} €
									</div>
									<div className="absolute top-0 -right-3 w-2">
										<EditPen></EditPen>
									</div>
								</div>
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
