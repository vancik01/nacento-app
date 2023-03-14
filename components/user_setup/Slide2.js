import { TextField } from "@mui/material";
import { Input } from "@mui/material";
import React, { useEffect } from "react";
import { useSetup } from "../../pages/user-setup";
import Spolocnost from "../../public/SVG/user_setup/Spolocnost";
import Zivnostnik from "../../public/SVG/user_setup/Zivnostnik";

export default function Slide2() {
	const { userObject, setuserObject, setallowNext } = useSetup();

	function handleChange(e) {
		var newData = { ...userObject };

		newData.name = e.target.value;
		if (newData.name != "") setallowNext(true);
		else setallowNext(false);
		setuserObject(newData);
	}

	useEffect(() => {
		if (userObject.name != "") setallowNext(true);
		else setallowNext(false);
	}, []);

	return (
		<div className="w-full">
			<h1 className="text-4xl text-center mb-10">Ako Vás máme volať?</h1>
			<div className="max-w-lg mx-auto flex justify-center">
				<TextField
					variant="filled"
					label={
						userObject.account == "company" ? "Názov spoločnosti" : "Vaše meno"
					}
					fullWidth
					style={{ width: 300 }}
					onChange={handleChange}
					value={userObject.name}
				></TextField>
			</div>
		</div>
	);
}
