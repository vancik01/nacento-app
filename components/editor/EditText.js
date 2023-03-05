import { Input } from "@mui/material";
import React, { useState } from "react";
import EditPen from "../../public/SVG/EditPen";
import ButtonPrimary from "../ButtonPrimary";

export default function EditText({
	initialValue,
	onSave,
	fontSize = 20,
	classInput,
	classText,
}) {
	const [editingTitle, seteditingTitle] = useState(false);
	const [text, settext] = useState(initialValue);

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
						className={`w-full min-w-[200px] outline-none ${
							classInput ? classInput : ""
						}`}
						variant="outlined"
						placeholder="Zadajte názov..."
						value={text}
						style={{ fontSize: fontSize }}
						onChange={(e) => {
							settext(e.target.value);
						}}
						autoFocus
					/>
					<ButtonPrimary className="ml-4" onClick={handleSave}>
						Uložiť
					</ButtonPrimary>
				</div>
			)}
		</div>
	);
}
