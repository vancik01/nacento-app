import { TextField } from "@mui/material";
import { Input } from "@mui/material";
import React, { useState } from "react";
import { useData } from "../context/AppWrap";
import { useAuth } from "../context/AuthContext";
import Save from "../public/SVG/buttons/Save";
import EditPen from "../public/SVG/EditPen";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";

export default function SupplyerInfo() {
	const { data, changeSupplyerData } = useData();
	const { userData } = useAuth();
	const [editing, setediting] = useState(false);
	const [supplyer, setsupplyer] = useState(data.supplyer);

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
			<div className="min-w-[250px]">
				<div className="relative w-fit">
					<div className="mb-2 text-gray-300 capitalize">DODÁVATEL:</div>
					<button
						onClick={() => {
							setediting(true);
						}}
						className="absolute top-0 -right-5 w-3"
					>
						<EditPen></EditPen>
					</button>
				</div>

				<div className="text-sm flex flex-col gap-1">
					<div>{supplyer.company_name}</div>
					{data.supplyer.ico && <div>IČO: {data.supplyer.ico}</div>}
					{data.supplyer.dic && <div>DIČ: {data.supplyer.dic}</div>}
					<div>{data.supplyer.phone}</div>
					<div>{data.supplyer.email}</div>
					<div>{data.supplyer.web}</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="min-w-[250px]">
				<div className="mb-2 text-gray-300 capitalize">DODÁVATEL:</div>
				<div className="flex flex-col gap-1 text-sm">
					<input
						onChange={handleChange}
						name="company_name"
						variant="standard"
						placeholder="Názov Spoločnosti"
						value={supplyer.company_name}
					></input>
					<input
						onChange={handleChange}
						name="ico"
						variant="standard"
						placeholder="IČO"
						value={supplyer.ico}
					></input>
					<input
						onChange={handleChange}
						name="dic"
						variant="standard"
						placeholder="DIČ"
						value={supplyer.dic}
					></input>
					<input
						onChange={handleChange}
						name="phone"
						variant="standard"
						placeholder="Tel"
						value={supplyer.phone}
					></input>
					<input
						onChange={handleChange}
						name="email"
						variant="standard"
						placeholder="Email"
						value={supplyer.email}
					></input>
					<input
						onChange={handleChange}
						name="web"
						variant="standard"
						placeholder="Web"
						value={supplyer.web}
					></input>
				</div>
				<ButtonSecondary
					icon={<Save></Save>}
					iconBefore
					className="mt-4"
					onClick={handleSave}
				>
					Uložiť
				</ButtonSecondary>
			</div>
		);
	}
}
