import React from "react";
import { TextField } from "@mui/material";
import EditName from "./EditName";

export default function SupplyerTemplate({
	supplyer,
	account,
	name,
	setname,
	handleChange,
	userObject,
}) {

    console.log(userObject)

	return (
		<div className='w-[350px]'>
			<div className=' text-gray-500 mb-2 font-medium capitalize'>
				KONTAKTNÉ ÚDAJE:
			</div>
			<div className='flex flex-col gap-4 text-sm'>
					<TextField
					onChange={handleChange}
					name='phone'
					type='tel'
					variant='filled'
					label='Telefónne číslo'
					value={supplyer?.phone}
				></TextField>

				<TextField
					type='url'
					onChange={handleChange}
					name='web'
					variant='filled'
					label='Web'
					value={supplyer.web}
				></TextField>
			</div>
			{userObject.account !== "user" &&
				<>
					<div className=' text-gray-500 mb-2 mt-8 font-medium capitalize'>
						INFORMÁCIE O SPOLOČNOSTI
					</div>
					<div className='flex flex-col gap-4 text-sm'>
						<TextField
							onChange={handleChange}
							name='company_name'
							variant='filled'
							label='Názov spoločnosti'
							value={supplyer?.company_name}
						></TextField>
						<TextField
							onChange={handleChange}
							name='ico'
							variant='filled'
							label='IČO'
							value={supplyer?.ico}
						></TextField>
						<TextField
							onChange={handleChange}
							name='dic'
							variant='filled'
							label='DIČ'
							value={supplyer?.dic}
						></TextField>
                        <TextField
                            onChange={handleChange}
                            type="email"
                            name="email"
                            variant="filled"
                            label="Firemný email"
                            value={supplyer?.email}
                        ></TextField>
					</div>
				</>
			}
		</div>
	);
}
