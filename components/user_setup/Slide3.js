import { TextField } from "@mui/material";
import { Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSetup } from "../../pages/user-setup";
import Spolocnost from "../../public/SVG/user_setup/Spolocnost";
import Zivnostnik from "../../public/SVG/user_setup/Zivnostnik";

export default function Slide3() {
	const { userObject, setuserObject, setallowNext } = useSetup();

	function handleChange(e) {
		var newData = { ...userObject };
		newData.supplyer[e.target.name] = e.target.value;
		setuserObject(newData);
	}

	useEffect(() => {
		if (userObject.name != "") setallowNext(true);
		else setallowNext(false);
	}, []);

	return (
		<div className="w-full">
			<h1 className="text-4xl text-center mb-10">Zadajte Vaše údaje</h1>
			<p className="text-center text-gray-400">
				Tieto informácie používame na predvypĺnanie cenových ponúk...
			</p>
			<div className="max-w-lg mx-auto flex justify-center mt-10">
				<div className="w-[350px]">
					<div className=" text-gray-500 mb-2 font-medium capitalize">
						KONTAKTNÉ ÚDAJE:
					</div>
					<div className="flex flex-col gap-4 text-sm">
						<TextField
							onChange={handleChange}
							name="phone"
							type="tel"
							variant="filled"
							label="Telefónne číslo"
							value={userObject.supplyer?.phone}
						></TextField>
						<TextField
							onChange={handleChange}
							type="email"
							name="email"
							variant="filled"
							label="Email"
							value={userObject.email}
							disabled
						></TextField>
						<TextField
							type="url"
							onChange={handleChange}
							name="web"
							variant="filled"
							label="Web"
							value={userObject.supplyer?.web}
						></TextField>
					</div>
					<div className=" text-gray-500 mb-2 mt-8 font-medium capitalize">
						INFORMÁCIE O SPOLOČNOSTI
					</div>
					<div className="flex flex-col gap-4 text-sm">
						<TextField
							onChange={handleChange}
							name="ico"
							variant="filled"
							label="IČO"
							value={userObject.supplyer?.ico}
						></TextField>
						<TextField
							onChange={handleChange}
							name="dic"
							variant="filled"
							label="DIČ"
							value={userObject.supplyer?.dic}
						></TextField>
					</div>
				</div>
			</div>
		</div>
	);
}
