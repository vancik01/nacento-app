import React, { useState } from "react";
import { useData } from "../../context/AppWrap";
import Save from "../../public/assets/buttons/Save";
import EditPen from "../../public/assets/editor/EditPen";
import ButtonSecondary from "../buttons/ButtonSecondary";
import { getValue } from "../../context/ValuesContext";

export default function CustomerInfo({scale}) {
	const { changeCustomerData } = useData();
	const [editing, setediting] = useState(true);
	const [data, setData] = getValue((data) => data);
	const [customer, setCustomer] = useState(data.data.customer);

	function handleChange(e) {
		let newCustomer = { ...customer, [e.target.name]: e.target.value }
		setCustomer(newCustomer);
	}

	function handleSave() {
		setData((data) => {
			let newData = { ...data }
			newData.data.customer = customer
			return newData
		  });
		// changeCustomerData(customer);
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
					<div>{data.data.customer.name}</div>
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
						placeholder="Meno Objednávateľa"
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
