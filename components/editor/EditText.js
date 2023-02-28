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
					<h1 className="text-center relative">
						{text}
						<div className="absolute top-0 -right-3 w-2">
							<EditPen></EditPen>
						</div>
					</h1>
				</button>
			)}

			{editingTitle && (
				<div className="flex items-baseline justify-center">
					<input
						className={`w-full min-w-[400px] ${classInput ? classInput : ""}`}
						variant="outlined"
						placeholder="Zadajte text..."
						value={text}
						style={{ fontSize: fontSize }}
						onChange={(e) => {
							settext(e.target.value);
						}}
					/>
					<ButtonPrimary className="ml-4" onClick={handleSave}>
						Uložiť
					</ButtonPrimary>
				</div>
			)}
		</div>
	);
}
