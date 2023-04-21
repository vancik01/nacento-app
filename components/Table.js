import { Input } from "@mui/material";
import { useDragControls } from "framer-motion";
import { Reorder } from "framer-motion";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Tooltip } from "react-tooltip";
import { useData } from "../context/AppWrap";
import { useLayout } from "../context/LayoutContext";
import TrashBin from "../public/SVG/editor/TrashBin";
import DragableIcon from "../public/SVG/Dragable";
import Dragable from "../public/SVG/Dragable";
import { motion } from "framer-motion";
import { TextareaAutosize } from "@mui/material";
import Save from "../public/SVG/Save";
import _ from "lodash";
import "react-tooltip/dist/react-tooltip.css";
import ButtonIcon from "./buttons/ButtonIcon";

export default function Table({ items, headers, blockId, sectionId }) {
	const { reorderRows, getTitle } = useData();
	const { displayColumns, tableRowTemplate, primaryColor } = useLayout();

	return (
		<>
			{
				<div key={blockId}>
					<div style={{ backgroundColor: primaryColor }} className="text-white">
						<div
							className="table_row heading select-none"
							style={{ gridTemplateColumns: tableRowTemplate }}
						>
							<div className="font-medium py-1 px-2">N.</div>
							{headers.map((item, i) => {
								var heading = getTitle(item, "sk");
								if (displayColumns.includes(item)) {
									return (
										<div key={`table-header-${i}`}>
											<div
												className={`font-medium ${heading.short} py-1 px-2`}
												style={{ color: "white" }}
											>
												<Tooltip
													id="tooltip"
													anchorSelect={`#col-${i}`}
													place="top"
													content={heading.long}
													delayHide={3}
												/>
												<span id={`col-${i}`}>{heading.short}</span>
											</div>
										</div>
									);
								}
							})}

							<div> </div>
						</div>
					</div>

					<DragDropContext
						onDragEnd={(e) => {
							reorderRows(blockId, sectionId, e);
						}}
					>
						<Droppable droppableId={`table`}>
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									className="table_wrap"
								>
									{items?.map((polozka, i) => {
										return (
											<TableRow
												blockId={blockId}
												i={i}
												polozka={polozka}
												rowsCount={items.length}
												sectionId={sectionId}
											></TableRow>
										);
									})}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</div>
			}
		</>
	);
}

function TableRow({ polozka, blockId, i, rowsCount, sectionId }) {
	const { getTitle, headers, deleteRow } = useData();
	const { displayColumns, tableRowTemplate, primaryColor } = useLayout();
	const [didChange, setdidChange] = useState(false);
	const [item, setitem] = useState(polozka);

	return (
		<div className="relative">
			<Draggable
				key={`${sectionId}-${blockId}${i}`}
				draggableId={`item-${blockId}-${i}`}
				index={i}
			>
				{(provided, snapshot) => (
					<div
						{...provided.draggableProps}
						ref={provided.innerRef}
						className=""
					>
						<div
							className={`table_row content ${
								snapshot.isDragging ? "dragging" : ""
							}${i === rowsCount - 1 ? "last" : ""}`}
							style={{ gridTemplateColumns: tableRowTemplate }}
						>
							<div
								className={`flex justify-center items-center select-none h-full py-1 table_unit`}
							>
								{i + 1}
							</div>

							{headers.map((item) => {
								var label = getTitle(item, "sk");

								if (displayColumns.includes(item)) {
									return (
										<div
											key={`value-${sectionId}-${blockId}-${item}-${item}`}
											className="h-full flex items-center justify-start py-1 px-2 table_unit"
										>
											<TableUnit
												sectionId={sectionId}
												itemId={i}
												blockId={blockId}
												item={item}
												polozka={polozka}
												label={label}
											/>
										</div>
									);
								}
							})}

							{
								<div className="flex justify-end items-center select-none absolute -right-14">
									<ButtonIcon
										icon={<TrashBin />}
										onClick={() => {
											deleteRow({ sectionId, blockId, itemId: i });
										}}
									></ButtonIcon>

									<div {...provided.dragHandleProps}>
										<DragableIcon />
									</div>
								</div>
							}
						</div>
					</div>
				)}
			</Draggable>

			{didChange && (
				<button className="absolute -left-8 top-0 bottom-0 flex items-center z-30">
					<Save color={primaryColor}></Save>
				</button>
			)}
		</div>
	);
}

function TableUnit({ item, polozka, blockId, itemId, label, sectionId }) {
	const { changeValue } = useData();

	function update(e) {
		changeValue({
			blockId: blockId,
			itemId: itemId,
			valueId: item,
			value: e.target.value,
			sectionId: sectionId,
		});
	}

	if (item === "service_type") {
		return (
			<div className={`flex align-middle items-center ${label.short}`}>
				{polozka.service_type}
			</div>
		);
	} else if (item === "item_id") {
		return (
			<div className={`flex align-middle items-center ${label.short}`}>
				{polozka.item_id}
			</div>
		);
	} else if (item === "title") {
		return (
			<div className={`flex align-middle items-center w-full ${label.short}`}>
				<TextareaAutosize
					spellCheck="false"
					className="w-full bg-transparent focus-visible:outline-none h-fit overflow-visible"
					value={polozka.title}
					name={item}
					style={{ resize: "none" }}
					onChange={update}
				/>
			</div>
		);
	} else if (item === "unit") {
		return (
			<div className={`flex align-middle items-center w-full ${label.short}`}>
				<select
					defaultValue={polozka.unit}
					name={item}
					className="w-full bg-transparent"
					onChange={update}
				>
					<option value="m">m</option>
					<option value="m2">m&sup2;</option>
					<option value="m3"> m&sup3; </option>
					<option value="diel">diel</option>
					<option value="ks">ks</option>
					<option value="súb.">súb.</option>
					<option value="ton">ton</option>

				</select>
			</div>
		);
	} else if (item === "quantity") {
		return (
			<div className={`flex align-middle items-center ${label.short}`}>
				<Input
					disableUnderline
					inputProps={{ min: 0 }}
					type="number"
					onChange={update}
					value={polozka.quantity.toString()}
				/>
			</div>
		);
	} else if (item === "unit_delivery_price") {
		return (
			<div className={`flex align-middle items-center ${label.short}`}>
				<Input
					disableUnderline
					inputProps={{ min: 0 }}
					type="number"
					onChange={update}
					value={polozka.unit_delivery_price.toString()}
					endAdornment="€"
				/>
			</div>
		);
	} else if (item === "unit_construction_price") {
		return (
			<div className={`flex align-middle items-center ${label.short}`}>
				<Input
					disableUnderline
					inputProps={{ min: 0 }}
					type="number"
					onChange={update}
					value={polozka.unit_construction_price.toString()}
					endAdornment="€"
				/>
			</div>
		);
	} else if (item === "total_delivery_price") {
		return (
			<div className={`flex justify-center items-center ${label.short}`}>
				<Input
					disableUnderline
					inputProps={{ min: 0 }}
					type="number"
					onChange={update}
					value={polozka.total_delivery_price.toString()}
					endAdornment="€"
				/>
			</div>
		);
	} else if (item === "total_construction_price") {
		return (
			<div className={`flex align-middle items-center ${label.short}`}>
				<Input
					disableUnderline
					inputProps={{ min: 0 }}
					type="number"
					onChange={update}
					value={polozka.total_construction_price.toString()}
					endAdornment="€"
				/>
			</div>
		);
	} else if (item === "total") {
		return (
			<div className={`flex text-[11px] align-middle items-center ${label.short}`}>
				<Input
					disableUnderline
					inputProps={{ min: 0 }}
					type="number"
					onChange={update}
					value={polozka.total.toString()}
					endAdornment="€"
				/>

			</div>
		);
	}
}
