import { TextField } from "@mui/material";
import { Input } from "@mui/material";
import React, { useState } from "react";
import { useData } from "../context/AppWrap";
import { useAuth } from "../context/AuthContext";
import Save from "../public/SVG/buttons/Save";
import EditPen from "../public/SVG/EditPen";
import ButtonPrimary from "./buttons/ButtonPrimary";
import ButtonSecondary from "./buttons/ButtonSecondary";
import { getValue } from "../context/ValuesContext";

export default function SupplyerInfo({ scale }) {
	const { changeSupplyerData } = useData();
	const [editing, setediting] = useState(false);
	const [supplyer, setsupplyer] = getValue((data) => data.supplyer);

	console.log("Supplyer:", supplyer);

	function handleChange(e) {
		var newData = { ...supplyer };
		newData[e.target.name] = e.target.value;
		setsupplyer(newData);
	}

	function handleSave() {
		changeSupplyerData(supplyer);
		setediting(false);
	}

	if (!editing) {
		return (
			<div>
				<div className='relative w-fit'>
					<div
						className={`${scale && "text-xl"} mb-2 text-gray-300 capitalize`}
					>
						DODÁVATEĽ:
					</div>
					<button
						onClick={() => {
							setediting(true);
						}}
						className='absolute top-0 -right-5 w-3'
					>
						<EditPen></EditPen>
					</button>
				</div>

				<div className={`${scale ? "text-lg" : "text-sm"} flex flex-col gap-1`}>
					{supplyer.company_name && <div>{supplyer.company_name}</div>}
					{supplyer.ico && <div>IČO: {supplyer.ico}</div>}
					{supplyer.dic && <div>DIČ: {supplyer.dic}</div>}
					{supplyer.phone && <div>{supplyer.phone}</div>}
					{supplyer.email && <div>{supplyer.email}</div>}
					{supplyer.web && <div>{supplyer.web}</div>}
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<div className={`${scale && "text-xl"} mb-2 text-gray-300 capitalize`}>
					DODÁVATEĽ:
				</div>
				<div className='flex flex-col gap-1 text-sm'>
					<input
						className={`${scale ? "text-lg" : "text-sm"} w-[80%] outline-none`}
						onChange={handleChange}
						name='company_name'
						variant='standard'
						placeholder='Názov Spoločnosti'
						value={supplyer.company_name}
					></input>
					<input
						className={`${scale ? "text-lg" : "text-sm"} w-[80%]outline-none `}
						onChange={handleChange}
						name='ico'
						variant='standard'
						placeholder='IČO'
						value={supplyer.ico}
					></input>
					<input
						className={`${scale ? "text-lg" : "text-sm"} w-[80%] outline-none `}
						onChange={handleChange}
						name='dic'
						variant='standard'
						placeholder='DIČ'
						value={supplyer.dic}
					></input>
					<input
						className={`${scale ? "text-lg" : "text-sm"} w-[80%] outline-none `}
						onChange={handleChange}
						name='phone'
						variant='standard'
						placeholder='Telefónne číslo'
						value={supplyer.phone}
					></input>
					<input
						className={`${scale ? "text-lg" : "text-sm"} w-[80%] outline-none `}
						onChange={handleChange}
						name='email'
						variant='standard'
						placeholder='Email'
						value={supplyer.email}
					></input>
					<input
						className={`${scale ? "text-lg" : "text-sm"} w-[80%] outline-none `}
						onChange={handleChange}
						name='web'
						variant='standard'
						placeholder='Web'
						value={supplyer.web}
					></input>
				</div>
				<ButtonSecondary
					icon={<Save></Save>}
					iconBefore
					className='mt-4'
					onClick={handleSave}
				>
					Uložiť
				</ButtonSecondary>
			</div>
		);
	}
}
