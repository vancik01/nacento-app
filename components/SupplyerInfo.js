import { TextField } from "@mui/material";
import { Input } from "@mui/material";
import React, { useState } from "react";
import { useData } from "../context/AppWrap";
import { useAuth } from "../context/AuthContext";
import Save from "../public/SVG/buttons/Save";
import EditPen from "../public/SVG/EditPen";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";

export default function SupplyerInfo({scale}) {
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
			<div>
				<div className="relative w-fit">
					<div className={`${scale && "text-xl"} mb-2 text-gray-300 capitalize`}>DODÁVATEĽ:</div>
					<button
						onClick={() => {
							setediting(true);
						}}
						className="absolute top-0 -right-5 w-3"
					>
						<EditPen></EditPen>
					</button>
				</div>

				<div className={`${scale? "text-lg" : "text-sm"} flex flex-col gap-1`}>
					{supplyer.company_name && <div>{supplyer.company_name}</div>}
					{data.supplyer.ico && <div>IČO: {data.supplyer.ico}</div>}
					{data.supplyer.dic && <div>DIČ: {data.supplyer.dic}</div>}
					{data.supplyer.phone && <div>{data.supplyer.phone}</div>}
					{data.supplyer.email && <div>{data.supplyer.email}</div>}
					{data.supplyer.web && <div>{data.supplyer.web}</div>}
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<div className={`${scale && "text-xl"} mb-2 text-gray-300 capitalize`}>DODÁVATEĽ:</div>
				<div className="flex flex-col gap-1 text-sm">
					<input
						className={`${scale? "text-lg" : "text-sm"} w-[80%]`}
						onChange={handleChange}
						name="company_name"
						variant="standard"
						placeholder="Názov Spoločnosti"
						value={supplyer.company_name}
						className="outline-none "
					></input>
					<input
						className={`${scale? "text-lg" : "text-sm"} w-[80%]`}
						onChange={handleChange}
						name="ico"
						variant="standard"
						placeholder="IČO"
						value={supplyer.ico}
						className="outline-none "
					></input>
					<input
						className={`${scale? "text-lg" : "text-sm"} w-[80%]`}
						onChange={handleChange}
						name="dic"
						variant="standard"
						placeholder="DIČ"
						value={supplyer.dic}
						className="outline-none "
					></input>
					<input
						className={`${scale? "text-lg" : "text-sm"} w-[80%]`}
						onChange={handleChange}
						name="phone"
						variant="standard"
						placeholder="Telefónne číslo"
						value={supplyer.phone}
						className="outline-none "
					></input>
					<input
						className={`${scale? "text-lg" : "text-sm"} w-[80%]`}
						onChange={handleChange}
						name="email"
						variant="standard"
						placeholder="Email"
						value={supplyer.email}
						className="outline-none "
					></input>
					<input
						className={`${scale? "text-lg" : "text-sm"} w-[80%]`}
						onChange={handleChange}
						name="web"
						variant="standard"
						placeholder="Web"
						value={supplyer.web}
						className="outline-none "
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
