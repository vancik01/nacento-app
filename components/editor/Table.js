import { Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Tooltip } from "react-tooltip";
import { useData } from "../../context/AppWrap";
import { useLayout } from "../../context/LayoutContext";
import TrashBin from "../../public/assets/editor/TrashBin";
import DragableIcon from "../../public/assets/editor/Dragable";
import { TextareaAutosize } from "@mui/material";
import Save from "../../public/assets/editor/Save";
import _ from "lodash";
import "react-tooltip/dist/react-tooltip.css";
import ButtonIcon from "../buttons/ButtonIcon";
import ArrowDown from "../../public/assets/general/ArrowDown";
import { getValue } from "../../context/ValuesContext";
import { updateTotals } from "../../lib/valueChangeFunctions";

export default function Table({ items, variations, headers, blockId, sectionId }) {
	const { reorderRows, getTitle } = useData();
	const { displayColumns, tableRowTemplate, primaryColor } = useLayout();

	function get_variations(item_id) {
		if (!variations) return []
		if (typeof (item_id) !== "string") return []
		if (!item_id.includes('.')) return []
		if (item_id.indexOf(".") !== 7) return []

		for(let i=0; i<variations.length; i++){
			if (variations[i].item.item_id === item_id) return variations[i].alternatives
		}


		return []
	}

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
												variations={get_variations(polozka.item_id)}
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

function TableRow({ polozka, blockId, i, rowsCount, sectionId, variations }) {
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
							className={`table_row content ${snapshot.isDragging ? "dragging" : ""
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
												variations={variations}
												index={i}
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

function TableUnit({ item, polozka, blockId, itemId, label, sectionId, variations, index }) {
	const { changeValue ,updateBlockTotals, updateSectionTotals, setdata } = useData();
	const [showvariant, setshowvariant] = useState(false)
	const { isHorizontal } = useLayout();

	const [data, setData] = getValue((data) => data);

	const fieldId = item

	const [value, setValue] = getValue(
		(data) => data?.data?.sections?.[sectionId]?.blocks?.[blockId]?.items?.[itemId]?.[fieldId]
	);
	if (value == undefined) {
		return (<></>)
	}

	function variationIndex(item){
		return parseInt(item.item_id.substring(8, item.item_id.length))
	}

	function change_items(variant, polozka, ix) {
		setshowvariant(false)

		setData(data => {

			var newData = { ...data };

			newData.data.sections[sectionId].blocks[blockId].items.splice(itemId, 1);

			variant.quantity = polozka.quantity
			variant.total_construction_price = Math.round((variant.unit_construction_price * variant.quantity) * 100) /100
			variant.total_delivery_price = Math.round((variant.unit_delivery_price * variant.quantity) * 100) /100
			variant.total = Math.round((variant.total_construction_price + variant.total_delivery_price) * 100) /100

			newData.data.sections[sectionId].blocks[blockId].items.splice(itemId, 0, variant)

			let variant_ix = 0
			for(let i=0; i<newData.data.sections[sectionId].blocks[blockId].variations.length; i++){
				if(newData.data.sections[sectionId].blocks[blockId].variations[i].item.item_id == polozka.item_id){
					newData.data.sections[sectionId].blocks[blockId].variations[i].item = variant
					variant_ix = i
					break
				}
			}


			//remove the chosen variations from the list & add the previous to the list
			for(let i=0; i<newData.data.sections[sectionId].blocks[blockId].variations[variant_ix].alternatives.length; i++){
				if(newData.data.sections[sectionId].blocks[blockId].variations[variant_ix].alternatives[i].item_id == variant.item_id){
					newData.data.sections[sectionId].blocks[blockId].variations[variant_ix].alternatives.splice(i, 1);
					newData.data.sections[sectionId].blocks[blockId].variations[variant_ix].alternatives.splice(i, 0, polozka);
					break
				}
					
			}

			updateBlockTotals(newData.data.sections[sectionId].blocks[blockId]);
			updateSectionTotals(newData.data.sections[sectionId]);
			updateTotals(newData)			

			return newData
		});
	}


	function update(e) {
		changeValue(
			{ fieldId: fieldId, itemId: itemId, blockId:blockId, sectionId: sectionId },
			e.target.value
		);
	}

	if (item === "service_type") {
		return (
			<div className={`flex align-middle items-center ${label.short}`}>
				{value.service_type}
			</div>
		);
	} else if (item === "item_id") {
		return (
			<div className={`flex align-middle items-center ${label.short}`}>
				{value.item_id}
			</div>
		);
	} else if (item === "title") {
		return (
			<>
				{variations?.length ?
					<div className={`flex  relative align-middle items-center w-full`} style={{ zIndex: 100 - index }}>
						<TextareaAutosize
							spellCheck="false"
							className="w-full bg-transparent focus-visible:outline-none h-fit overflow-visible"
							value={value}
							name={item}
							style={{ resize: "none" }}
							onChange={update}
						/>
						<div className="p-1 cursor-pointer" onClick={(e) => { setshowvariant(!showvariant) }}>
							<ArrowDown scale={0.9} />
						</div>

						{showvariant &&
							<div className={`absolute flex flex-col py-1 cursor-default shadow-xl border rounded-sm bg-white right-[-10px] ` + (isHorizontal ? "w-[103%] top-[106%]" : "w-[106%] top-[106%]")}>
								{variations.map((variant, ix) => {

									return (
										<div key={`variant${index}-${ix}`} onClick={() => change_items(variant, polozka, ix)} className="hover:bg-blue-300 px-2 py-2">
											<StringDiff stringA={polozka.title} stringB={variant.title} />
										</div>
									)
								})}
							</div>}
					</div>


					:
					<div className={`flex align-middle items-center w-full ${label.short}`}>
						<TextareaAutosize
							spellCheck="false"
							className="w-full bg-transparent focus-visible:outline-none h-fit overflow-visible"
							value={value}
							name={item}
							style={{ resize: "none" }}
							onChange={update}
						/>
					</div>}
			</>
		);
	} else if (item === "unit") {
		return (
			<div className={`flex align-middle items-center w-full ${label.short}`}>
				<select
					defaultValue={value}
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
					value={value.toString()}
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
					value={value.toString()}
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
					value={value.toString()}
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
					value={value.toString()}
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
					value={value.toString()}
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
					value={value.toString()}
					endAdornment="€"
				/>

			</div>
		);
	}
}

const StringDiff = ({ stringA, stringB }) => {

	const compareWords = (strA, strB) => {
		const wordsA = strA.split(' ');
		const wordsB = strB.split(' ');

		const maxLength = Math.max(wordsA.length, wordsB.length);
		let result = '';

		for (let i = 0; i < maxLength; i++) {
			if (wordsA[i] !== wordsB[i]) {
				result += `<span class="font-bold">${wordsB[i] || ''}</span> `;
			} else {
				result += `${wordsB[i] || ''} `;
			}
		}

		return result.trim();
	};

	return (
		<div
			className=""
			dangerouslySetInnerHTML={{
				__html: compareWords(stringA, stringB),
			}}
		/>
	);
};

