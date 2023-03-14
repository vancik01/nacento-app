import { TextField } from "@mui/material";
import { Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSetup } from "../../pages/user-setup";
import Close from "../../public/SVG/Close";
import Spolocnost from "../../public/SVG/user_setup/Spolocnost";
import Zivnostnik from "../../public/SVG/user_setup/Zivnostnik";

export default function Slide4() {
	const { userObject, setuserObject, setallowNext } = useSetup();
	const [logo, setlogo] = useState(null);
	const [selectedFile, setselectedFile] = useState(null);

	function handleChange(e) {
		var newData = { ...userObject };

		newData.name = e.target.value;
		if (newData.name != "") setallowNext(true);
		else setallowNext(false);
		setuserObject(newData);
	}

	useEffect(() => {
		if (selectedFile && selectedFile.target.files.length > 0) {
			setlogo(URL.createObjectURL(selectedFile?.target?.files[0]));
		} else {
			setlogo(null);
		}
		setallowNext(true);
	}, [selectedFile]);

	return (
		<div className="w-full">
			<h1 className="text-4xl text-center mb-10">Nahrajte Vaše logo</h1>
			<div className="flex justify-center items-center relative">
				{!logo && (
					<label htmlFor="upload-logo" className="w-full cursor-pointer">
						<div className="text-xl px-6 py-4 border border-dashed border-blue-400 text-center">
							Nahrajte logo
						</div>
					</label>
				)}
				{logo && (
					<div className="flex w-full justify-center items-center">
						<img src={logo} alt="logo" className="mx-auto max-w-sm max-h-44" />
					</div>
				)}
				{logo && (
					<button
						onClick={() => {
							setselectedFile(null);
						}}
						className="absolute -top-3 -right-2"
					>
						<Close color={"red"}></Close>
					</button>
				)}

				<input
					accept=".jpg,.jpeg,.png"
					type="file"
					onChange={setselectedFile}
					className="hidden"
					name=""
					id="upload-logo"
				/>
			</div>
			<div className="mt-10"></div>
		</div>
	);
}
