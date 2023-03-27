import { TextField } from "@mui/material";
import { Input } from "@mui/material";
import React, { useState } from "react";
import { useData } from "../context/AppWrap";
import Save from "../public/SVG/buttons/Save";
import EditPen from "../public/SVG/EditPen";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";

export default function CustomerInfo({scale}) {
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
					<div className={`${scale && "text-xl"} mb-2 text-gray-300 capitalize`}>OBJEDNÁVATEĽ:</div>
					<button
						onClick={() => {
							setediting(true);
						}}
						className="absolute top-0 -right-5 w-3"
					>
						<EditPen></EditPen>
					</button>
				</div>

				<div className={`${scale? "text-lg" : "text-sm"}`}>
					<div>{customer.name}</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="max-w-[200px]">
				<div className={`${scale && "text-xl"} mb-2 text-gray-300 capitalize`}>OBJEDNÁVATEL:</div>
				<div className="flex flex-col gap-1 text-sm">
					<input
						className={`${scale? "text-lg" : "text-sm"} outline-none w-[100%]`}
						onChange={handleChange}
						name="name"
						variant="standard"
						placeholder="Meno Objednávatela"
						value={customer.name}
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
