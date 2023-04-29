import { Input } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useData } from "../context/AppWrap";
import { useLayout } from "../context/LayoutContext";
import AddRow from "../public/SVG/AddRow";
import BlockIcon from "../public/SVG/BlockIcon";
import Copy from "../public/SVG/buttons/Copy";
import DragableIcon from "../public/SVG/Dragable";
import MoreDots from "../public/SVG/editor/MoreDots";
import PlusCircle from "../public/SVG/editor/PlusCircle";
import TrashBin from "../public/SVG/editor/TrashBin";
import EditPen from "../public/SVG/EditPen";
import ButtonIcon from "./buttons/ButtonIcon";
import AddBlockToolbar from "./editor/AddBlockToolbar";
import EditText from "./editor/EditText";
import SaveBlockTemplate from "./editor/SaveBlockTemplate";
import Table from "./Table";
import { getValue } from "../context/ValuesContext";
import { getTitle } from "../lib/helpers";

export default function Block({
	headers,
	blockId,
	collapsed,
	dragHandleProps,
	sectionId,
}) {
	const { editBlockTitle, addTableRow, reorderingBlocks, deleteBlock } =
		useData();
	const { primaryColor } = useLayout();

	const [block] = getValue((data) => data.sections[sectionId].blocks[blockId]);
	return (
		<>
			{block != null && (
				<div>
					<div
						className={`bg-white rounded-md ${collapsed ? "py-6" : "py-6"}`}
						key={blockId}
					>
						<div className='flex justify-between items-end mb-4'>
							<span className='mr-2 text-xl'>{blockId + 1}. </span>
							<EditText
								key={`text-block-${blockId}`}
								initialValue={block.info.title}
								classInput='w-fit'
								classText='!justify-start'
								fontSize={20}
								onSave={(value) => {
									editBlockTitle(value, sectionId, blockId);
								}}
							/>

							<div className='flex items-center gap-1 w-fit'>
								<SaveBlockTemplate block={block} />
								<AddBlockToolbar sectionId={sectionId} blockId={blockId} />

								<ButtonIcon
									id={"1"}
									tooltip='Zmazať blok'
									icon={<TrashBin color={"#9ca3af"} />}
									onClick={() => {
										deleteBlock(sectionId, blockId);
									}}
								></ButtonIcon>

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
							<div className='flex flex-row gap-10 text-xs items-end justify-between mt-4'>
								{!reorderingBlocks && (
									<button
										onClick={() => {
											addTableRow(blockId, sectionId);
										}}
										className='flex justify-center items-center gap-4'
									>
										<div className='w-[10px]'>
											<AddRow color={primaryColor}></AddRow>
										</div>
										<div className='text-xs' style={{ color: primaryColor }}>
											{block.items.length === 0
												? "Pridať tabuľku"
												: "Pridať riadok"}
										</div>
									</button>
								)}
								<BlockTotals
									blockId={blockId}
									sectionId={sectionId}
								></BlockTotals>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}

function BlockTotals({ blockId, sectionId }) {
	const [total] = getValue(
		(data) => data.sections[sectionId].blocks[blockId].info.total
	);
	const [total_delivery_price] = getValue(
		(data) => data.sections[sectionId].blocks[blockId].info.total_delivery_price
	);
	const [total_construction_price] = getValue(
		(data) =>
			data.sections[sectionId].blocks[blockId].info.total_construction_price
	);

	const { openBulkEdit } = useData();

	return (
		<div className='flex justify-end items-center gap-6'>
			<button
				onClick={(e) => {
					openBulkEdit(
						{
							blockId: blockId,
							sectionId: sectionId,
							value: total_construction_price,
							valueId: "total_construction_price",
							title: getTitle("total_construction_price", "sk").long,
							mode: "block",
						},
						e
					);
				}}
				className=''
			>
				<div className='relative w-fit'>
					<div>
						Cena montáže celkom:{" "}
						{parseFloat(total_construction_price).toFixed(2)} €
					</div>
					<div className='absolute top-0 -right-3 w-2'>
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
							value: total_delivery_price,
							valueId: "total_delivery_price",
							mode: "block",
							title: getTitle("total_delivery_price", "sk").long,
						},
						e
					);
				}}
				className=''
			>
				<div className='relative w-fit'>
					<div>
						Cena dodávky celkom: {parseFloat(total_delivery_price).toFixed(2)} €
					</div>
					<div className='absolute top-0 -right-3 w-2'>
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
							value: total,
							valueId: "total",
							title: getTitle("total", "sk").long,
							mode: "block",
						},
						e
					);
				}}
				className=''
			>
				<div className='relative w-fit'>
					<div className='font-bold'>
						Cena spolu: {parseFloat(total).toFixed(2)} €
					</div>
					<div className='absolute top-0 -right-3 w-2'>
						<EditPen></EditPen>
					</div>
				</div>
			</button>
		</div>
	);
}
