import { Button, Input } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useData } from "../../context/AppWrap";
import ButtonPrimary from "../buttons/ButtonPrimary";
import ButtonTag from "./ButtonTag";
import PriceChangeIndicator from "../PriceChangeIndicator";
import { motion } from "framer-motion";
import Close from "../../public/SVG/Close";

import { AnimatePresence } from "framer-motion";

export default function BulkEdit() {
	const {
		bulkEditData,
		getTitle,
		saveBulkEdit,
		data,
		closeBulkEdit,
		total,
		bulkEdit,
	} = useData();
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
		newData.value = parseFloat(newData.value) + parseFloat(val);
		if (newData.value < 0) newData.value = 0;
		newData.value = parseFloat(newData.value);
		setchangedData(newData);
	}

	function handleSave() {
		var valueToAdd = changedData.value - bulkEditData.value;
		saveBulkEdit(valueToAdd);
	}

	const handleUserKeyPress = useCallback(
		(event) => {
			const { key, keyCode } = event;

			if (keyCode == 13) {
				handleSave(event);
			} else if (keyCode === 27) {
				closeBulkEdit();
			}
		},
		[changedData]
	);

	useEffect(() => {
		window.addEventListener("keydown", handleUserKeyPress);
		return () => {
			window.removeEventListener("keydown", handleUserKeyPress);
		};
	}, [handleUserKeyPress]);

	const ref = useRef(null);

	return (
		<AnimatePresence mode="sync">
			{bulkEdit && (
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					exit={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.2, ease: "easeInOut" }}
					key={`bulk-edit`}
					className="mt-4 absolute w-[400px] shadow-bulk bg-white z-50 p-6 rounded-sm"
					style={{ left: bulkEditData.x, top: bulkEditData.y }}
				>
					<div className="relative">
						<div className="text-xl mb-1">Upraviť cenu </div>
						<div className="mb-4 text-sm">
							{getTitle(bulkEditData.valueId, "sk").long} - {bulkEditData.mode}
						</div>

						<button onClick={closeBulkEdit} className="absolute right-2 top-2">
							<Close></Close>
						</button>

						<Input
							type="number"
							style={{ fontSize: 14 }}
							endAdornment="€"
							onChange={handleChange}
							value={parseFloat(changedData.value)}
							autoFocus
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
							val={
								parseFloat(changedData.value) - parseFloat(bulkEditData.value)
							}
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
								val={parseFloat(changedData.value - bulkEditData.value).toFixed(
									2
								)}
								endAdorment=" %"
							></PriceChangeIndicator>
						)}
						<ButtonPrimary className="mt-4" onClick={handleSave}>
							Uložiť
						</ButtonPrimary>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
