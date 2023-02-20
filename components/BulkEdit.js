import { Button, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useData } from "../context/AppWrap";
import ButtonPrimary from "./ButtonPrimary";
import ButtonTag from "./ButtonTag";
import PriceChangeIndicator from "./PriceChangeIndicator";

export default function BulkEdit({ blockTitle }) {
	const { bulkEditData, getTitle, saveBulkEdit, data, closeBulkEdit, total } =
		useData();
	const [changedData, setchangedData] = useState(bulkEditData);

	function handleChange(e) {
		var newData = { ...changedData };
		newData.value = parseFloat(e.target.value);
		setchangedData(newData);
	}
	useEffect(() => {
		setchangedData(bulkEditData);
	}, [bulkEditData]);

	function changeBy(val) {
		var newData = { ...changedData };
		newData.value += parseFloat(val);
		setchangedData(newData);
	}

	function handleSave() {
		var valueToAdd = changedData.value - bulkEditData.value;
		const newData = { ...data };

		if (bulkEditData.mode === "block") {
			if (bulkEditData.valueId === "total") {
				var sum = parseFloat(
					data.sections[bulkEditData.sectionId].blocks[changedData.blockId].info
						.total
				);
				// saveBulkEdit((data.sections[bulkEditData.sectionId].blocks[changedData.blockId].info["total_construction_price"] / sum) * valueToAdd, bulkEditData.blockId, "total_construction_price")
				// saveBulkEdit((data.sections[bulkEditData.sectionId].blocks[changedData.blockId].info["total_delivery_price"] / sum) * valueToAdd, bulkEditData.blockId, "total_delivery_price")
				saveBulkEdit(
					valueToAdd,
					bulkEditData.blockId,
					bulkEditData.sectionId,
					"total"
				);
			} else {
				saveBulkEdit(
					valueToAdd,
					bulkEditData.blockId,
					bulkEditData.sectionId,
					bulkEditData.valueId
				);
			}
		} else if (bulkEditData.mode === "section") {
			const totalSection = newData.sections[bulkEditData.sectionId].info;

			if (
				bulkEditData.valueId === "total" ||
				bulkEditData.valueId === "total_vat"
			) {
				var value;

				if (bulkEditData.valueId === "total_vat")
					value = changedData.value / 1.2;
				else value = changedData.value;

				//vytvorenie koeficientov
				var sum =
					(totalSection["total_construction_price"] / totalSection.total) *
					valueToAdd;
				var add1 = [];
				newData.sections[bulkEditData.sectionId].blocks.map(
					(block, blockId) => {
						add1.push(
							(block.info["total_construction_price"] /
								totalSection["total_construction_price"]) *
								sum
						);
					}
				);

				//vytvorenie koeficientov
				sum =
					(totalSection["total_delivery_price"] / totalSection.total) *
					valueToAdd;
				var add2 = [];
				newData.sections[bulkEditData.sectionId].blocks.map(
					(block, blockId) => {
						add2.push(
							(block.info["total_delivery_price"] /
								totalSection["total_delivery_price"]) *
								sum
						);
					}
				);

				//nastavenie hodnôt
				data.sections[bulkEditData.sectionId].blocks.map((block, blockId) => {
					saveBulkEdit(
						add1[blockId],
						blockId,
						bulkEditData.sectionId,
						"total_construction_price"
					);
				});

				data.sections[bulkEditData.sectionId].blocks.map((block, blockId) => {
					saveBulkEdit(
						add2[blockId],
						blockId,
						bulkEditData.sectionId,
						"total_delivery_price"
					);
				});
			} else {
				var add = [];
				newData.sections[bulkEditData.sectionId].blocks.map(
					(block, blockId) => {
						add.push(
							(block.info[bulkEditData.valueId] /
								totalSection[bulkEditData.valueId]) *
								valueToAdd
						);
					}
				);

				var totalValue = 0;
				newData.sections[bulkEditData.sectionId].blocks.map(
					(block, blockId) => {
						//var sum = (block.info[bulkEditData.valueId] / totalSection[bulkEditData.valueId]) * valueToAdd
						var sum = add[blockId];
						// totalValue+=sum

						saveBulkEdit(
							sum,
							blockId,
							bulkEditData.sectionId,
							bulkEditData.valueId
						);
						// console.log(`${block.info[bulkEditData.valueId] / totalSection[bulkEditData.valueId]}% -> ${sum}` )
					}
				);
			}
		} else if (bulkEditData.mode === "whole") {
			if (
				bulkEditData.valueId === "total" ||
				bulkEditData.valueId === "total_vat"
			) {
				var value;

				if (bulkEditData.valueId === "total_vat")
					value = changedData.value / 1.2;
				else value = changedData.value;

				var add_total_construction_price =
					(total["total_construction_price"] / total.total) * valueToAdd;
				var add_total_delivery_price =
					(total["total_delivery_price"] / total.total) * valueToAdd;

				var add = [];
				var s = 0;

				newData.sections.map((section, sectionId) => {
					add.push({
						cp: [],
						dp: [],
					});

					var sum =
						(section.info["total_construction_price"] /
							total["total_construction_price"]) *
						add_total_construction_price;

					section.blocks.map((block, blockId) => {
						add[sectionId].cp.push(
							(block.info["total_construction_price"] /
								section.info["total_construction_price"]) *
								sum
						);
						s +=
							(block.info["total_construction_price"] /
								section.info["total_construction_price"]) *
							sum;
					});
				});

				newData.sections.map((section, sectionId) => {
					var sum =
						(section.info["total_delivery_price"] /
							total["total_delivery_price"]) *
						add_total_delivery_price;

					section.blocks.map((block, blockId) => {
						add[sectionId].dp.push(
							(block.info["total_delivery_price"] /
								section.info["total_delivery_price"]) *
								sum
						);
						s +=
							(block.info["total_delivery_price"] /
								section.info["total_delivery_price"]) *
							sum;
					});
				});

				newData.sections.map((section, sectionId) => {
					section.blocks.map((block, blockId) => {
						saveBulkEdit(
							add[sectionId].cp[blockId],
							blockId,
							sectionId,
							"total_construction_price"
						);
						saveBulkEdit(
							add[sectionId].dp[blockId],
							blockId,
							sectionId,
							"total_delivery_price"
						);
					});
				});
			} else {
				newData.sections.map((section, sectionId) => {
					var sum =
						(section.info[bulkEditData.valueId] / total[bulkEditData.valueId]) *
						valueToAdd;

					var add = [];
					section.blocks.map((block, blockId) => {
						add.push(
							(block.info[bulkEditData.valueId] /
								section.info[bulkEditData.valueId]) *
								sum
						);
					});
					section.blocks.map((block, blockId) => {
						saveBulkEdit(
							add[blockId],
							blockId,
							sectionId,
							bulkEditData.valueId
						);
					});
				});
			}
		}

		closeBulkEdit();
	}

	return (
		<div className="mt-4">
			<Input
				type="number"
				style={{ fontSize: 14 }}
				endAdornment="€"
				onChange={handleChange}
				value={parseFloat(changedData.value).toFixed(2)}
			></Input>
			<div className="flex justify-between mt-2">
				<ButtonTag
					onClick={() => {
						changeBy(-1000);
					}}
					color="#FE6D6C"
				>
					- 1000€
				</ButtonTag>
				<ButtonTag
					onClick={() => {
						changeBy(-500);
					}}
					color="#E57B6D"
				>
					- 500€
				</ButtonTag>
				<ButtonTag
					onClick={() => {
						changeBy(-100);
					}}
					color="#C0906E"
				>
					- 100€
				</ButtonTag>
				<ButtonTag
					onClick={() => {
						changeBy(100);
					}}
					color="#9EA470"
				>
					+ 100€
				</ButtonTag>
				<ButtonTag
					onClick={() => {
						changeBy(500);
					}}
					color="#7BB971"
				>
					+ 500€
				</ButtonTag>
				<ButtonTag
					onClick={() => {
						changeBy(1000);
					}}
					color="#3ADE73"
				>
					+ 1000€
				</ButtonTag>
			</div>

			{bulkEditData.value != 0 && (
				<div className="flex justify-between mt-2 mb-4">
					<ButtonTag
						onClick={() => {
							changeBy(-(bulkEditData.value * 0.1));
						}}
						color="#FE6D6C"
					>
						- 10 %
					</ButtonTag>
					<ButtonTag
						onClick={() => {
							changeBy(-(bulkEditData.value * 0.05));
						}}
						color="#E57B6D"
					>
						- 5 %
					</ButtonTag>
					<ButtonTag
						onClick={() => {
							changeBy(-(bulkEditData.value * 0.03));
						}}
						color="#C0906E"
					>
						- 3 %
					</ButtonTag>
					<ButtonTag
						onClick={() => {
							changeBy(bulkEditData.value * 0.03);
						}}
						color="#9EA470"
					>
						+ 3%
					</ButtonTag>
					<ButtonTag
						onClick={() => {
							changeBy(bulkEditData.value * 0.05);
						}}
						color="#7BB971"
					>
						+ 5%
					</ButtonTag>
					<ButtonTag
						onClick={() => {
							changeBy(bulkEditData.value * 0.1);
						}}
						color="#3ADE73"
					>
						+ 10%
					</ButtonTag>
				</div>
			)}
			{bulkEditData.value == 0 && (
				<div className="flex justify-between mt-2 mb-4">
					<ButtonTag
						onClick={() => {
							changeBy(-10);
						}}
						color="#FE6D6C"
					>
						- 10 %
					</ButtonTag>
					<ButtonTag
						onClick={() => {
							changeBy(-5);
						}}
						color="#E57B6D"
					>
						- 5 %
					</ButtonTag>
					<ButtonTag
						onClick={() => {
							changeBy(-3);
						}}
						color="#C0906E"
					>
						- 3 %
					</ButtonTag>
					<ButtonTag
						onClick={() => {
							changeBy(3);
						}}
						color="#9EA470"
					>
						+ 3%
					</ButtonTag>
					<ButtonTag
						onClick={() => {
							changeBy(5);
						}}
						color="#7BB971"
					>
						+ 5%
					</ButtonTag>
					<ButtonTag
						onClick={() => {
							changeBy(10);
						}}
						color="#3ADE73"
					>
						+ 10%
					</ButtonTag>
				</div>
			)}

			<PriceChangeIndicator
				val={(changedData.value - bulkEditData.value).toFixed(2)}
			></PriceChangeIndicator>
			{bulkEditData.value != 0 && (
				<PriceChangeIndicator
					val={(
						(parseFloat(changedData.value - bulkEditData.value) /
							bulkEditData.value) *
						100
					).toFixed(2)}
					endAdorment=" %"
				></PriceChangeIndicator>
			)}
			{bulkEditData.value == 0 && (
				<PriceChangeIndicator
					val={parseFloat(changedData.value - bulkEditData.value).toFixed(2)}
					endAdorment=" %"
				></PriceChangeIndicator>
			)}
			<ButtonPrimary className="mt-4" onClick={handleSave}>
				Uložiť
			</ButtonPrimary>
		</div>
	);
}
