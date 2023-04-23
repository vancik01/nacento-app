import { TextField } from "@mui/material";
import { Input } from "@mui/material";
import React, { useEffect } from "react";
import { useSetup } from "../../pages/user-setup";

import Spolocnost from "../../public/SVG/user_setup/Spolocnost";
import Zivnostnik from "../../public/SVG/user_setup/Zivnostnik";
import EditName from "../user_components/EditName";

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
				<EditName
					name={userObject?.name}
					label={"Vaše meno"}
					account={userObject.account}
					handleSave={(e) => {
						handleChange(e);
					}}
				></EditName>
			</div>
		</div>
	);
}
