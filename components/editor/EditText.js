import { Input } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Save from "../../public/SVG/buttons/Save";
import EditPen from "../../public/SVG/EditPen";
import ButtonPrimary from "../ButtonPrimary";
import ButtonSecondary from "../ButtonSecondary";

export default function EditText({
	initialValue,
	onSave,
	fontSize = 20,
	classInput,
	classText,
}) {
	const [editingTitle, seteditingTitle] = useState(false);
	const [text, settext] = useState("");
	const [width, setWidth] = useState(0);

	useEffect(() => {
		settext(initialValue);
		setWidth(initialValue);
	}, [initialValue]);

	const handleUserKeyPress = useCallback(
		(event) => {
			const { key, keyCode } = event;
			if (keyCode == 13) {
				handleSave();
			} else if (keyCode === 27) {
				seteditingTitle(false);
			}
		},
		[text]
	);

	useEffect(() => {
		window.addEventListener("keydown", handleUserKeyPress);
		return () => {
			window.removeEventListener("keydown", handleUserKeyPress);
		};
	}, [handleUserKeyPress]);

	useEffect(() => {
		setWidth(text.length);
	}, [text]);

	function handleSave() {
		seteditingTitle(false);
		onSave(text);
	}

	return (
		<div className={`w-full flex justify-center ${classText ? classText : ""}`}>
			{!editingTitle && (
				<button
					onClick={() => {
						seteditingTitle(true);
					}}
				>
					<div className="text-center relative" style={{ fontSize: fontSize }}>
						{text.length != 0 ? (
							text
						) : (
							<span className="text-inputPlaceholder">Zadajte názov...</span>
						)}
						<div className="absolute top-0 -right-3 w-2">
							<EditPen></EditPen>
						</div>
					</div>
				</button>
			)}

			{editingTitle && (
				<div className="flex items-baseline justify-center max-h-[30px]">
					<input
						className={`w-full outline-none ${classInput ? classInput : ""}`}
						variant="outlined"
						placeholder="Zadajte názov..."
						value={text}
						style={{ fontSize: fontSize, width: `${width}ch` }}
						onChange={(e) => {
							settext(e.target.value);
						}}
						autoFocus
					/>

					<ButtonSecondary
						icon={<Save></Save>}
						iconBefore
						className=""
						onClick={handleSave}
					>
						Uložiť
					</ButtonSecondary>
				</div>
			)}
		</div>
	);
}
