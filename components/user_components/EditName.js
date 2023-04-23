import React from "react";
import { TextField } from "@mui/material";

export default function EditName({ name, account, handleSave, label }) {
	return (
		<>
		<TextField
			variant="filled"
			label={label}
			onChange={(e) => {
				handleSave(e);
			}}
			value={name ? name : ""}
		></TextField>
		</>
	);
}
