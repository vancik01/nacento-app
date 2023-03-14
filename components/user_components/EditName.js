import React from "react";
import { TextField } from "@mui/material";

export default function EditName({ name, account, handleSave }) {
	return (
		<TextField
			variant="filled"
			label={account == "company" ? "Názov spoločnosti" : "Vaše meno"}
			fullWidth
			style={{ width: 300 }}
			onChange={(e) => {
				handleSave(e);
			}}
			value={name ? name : ""}
		></TextField>
	);
}
