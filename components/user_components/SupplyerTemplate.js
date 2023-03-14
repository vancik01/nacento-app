import React from "react";
import { TextField } from "@mui/material";

export default function SupplyerTemplate({
	supplyer,
	email,
	account,
	handleChange,
}) {
	return (
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
					value={supplyer?.phone}
				></TextField>
				<TextField
					onChange={handleChange}
					type="email"
					name="email"
					variant="filled"
					label="Email"
					value={email}
					disabled
				></TextField>
				<TextField
					type="url"
					onChange={handleChange}
					name="web"
					variant="filled"
					label="Web"
					value={supplyer?.web}
				></TextField>
			</div>
			{account == "company" && (
				<>
					<div className=" text-gray-500 mb-2 mt-8 font-medium capitalize">
						INFORMÁCIE O SPOLOČNOSTI
					</div>
					<div className="flex flex-col gap-4 text-sm">
						<TextField
							onChange={handleChange}
							name="ico"
							variant="filled"
							label="IČO"
							value={supplyer?.ico}
						></TextField>
						<TextField
							onChange={handleChange}
							name="dic"
							variant="filled"
							label="DIČ"
							value={supplyer?.dic}
						></TextField>
					</div>
				</>
			)}
		</div>
	);
}
