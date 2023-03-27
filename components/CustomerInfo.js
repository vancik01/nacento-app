import { TextField } from "@mui/material";
import { Input } from "@mui/material";
import React, { useState } from "react";
import { useData } from "../context/AppWrap";
import Save from "../public/SVG/buttons/Save";
import EditPen from "../public/SVG/EditPen";
import ButtonSecondary from "./buttons/ButtonSecondary";

export default function CustomerInfo() {
	const { data, changeCustomerData } = useData();
	const [editing, setediting] = useState(true);
	const [customer, setcustomer] = useState(data.customer);

	function handleChange(e) {
		var newData = { ...customer };
		newData[e.target.name] = e.target.value;
		setcustomer(newData);
	}

	function handleSave() {
		changeCustomerData(customer);
		setediting(false);
	}

	if (!editing) {
		return (
			<div className="min-w-[200px]">
				<div className="relative w-fit">
					<div className="mb-2 text-gray-300 capitalize">OBJEDNÁVATEL:</div>
					<button
						onClick={() => {
							setediting(true);
						}}
						className="absolute top-0 -right-5 w-3"
					>
						<EditPen></EditPen>
					</button>
				</div>

				<div className="text-sm">
					<div>{customer.name}</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="min-w-[200px]">
				<div className="mb-2 text-gray-300 capitalize">OBJEDNÁVATEL:</div>
				<div className="flex flex-col gap-1 text-sm">
					<input
						onChange={handleChange}
						name="name"
						variant="standard"
						placeholder="Meno Objednávatela"
						value={customer.name}
						className="outline-none"
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
