import React from "react";
import { TextField } from "@mui/material";
import EditName from "./EditName";

export default function SupplyerTemplate({
	supplyer,
	account,
	name,
	setname,
	handleChange,
	handleCompanyChange,
	handleCompanySet,
	userObject,
	results
}) {

	// if (!supplyer?.email) {
	// 	supplyer.email = userObject.email;
	// }


	return (
		<div className='w-full justify-between pr-20 flex'>
			<div className="w-[35%]">
			<div className=' text-gray-500 mb-2 font-medium capitalize'>
				KONTAKTNÉ ÚDAJE:
			</div>
			<div className='flex flex-col gap-4 text-sm'>
					<EditName
					account={account}
					name={name}
					label={"Vaše meno"}
					handleSave={(e) => {
						setname(e.target.value);
					}}
					></EditName>


				<TextField
					onChange={handleChange}
					name='email'
					type='email'
					variant='filled'
					label='Váš email'
					value={userObject?.email}
					disabled
				></TextField>


					<TextField
					onChange={handleChange}
					name='phone'
					type='tel'
					variant='filled'
					label='Telefónne číslo'
					value={supplyer?.phone}
				></TextField>
				{/* <TextField
					onChange={handleChange}
					type="email"
					name="email"
					variant="filled"
					label="Email"
					value={email}
					disabled
				></TextField> */}
				<TextField
					type='url'
					onChange={handleChange}
					name='web'
					variant='filled'
					label='Web'
					value={supplyer.web}
				></TextField>
			</div>

			</div>
			 
				<div className="w-[50%]">
					<div className=' text-gray-500 mb-2 font-medium capitalize'>
						INFORMÁCIE O SPOLOČNOSTI
					</div>
					<div className='flex flex-col gap-4 text-sm'>


							<TextField
								onChange={handleCompanyChange}
								name='company_name'
								variant='filled'
								label='Názov spoločnosti'
								autoComplete="off"
								value={supplyer?.company_name}>
							</TextField>

							{results?.length ?
								<div className="flex flex-col mt-[-15px] mb-2 outline outline-1 outline-gray-300 rounded-sm max-h-[250px] overflow-y-auto">
									{results.map((result, i) => {
										return(
										<React.Fragment key={`result${i}`}>
										<div onClick={() => handleCompanySet(result)} className="flex relative cursor-pointer flex-col p-3 hover:bg-gray-200">
											<span className="text-base font-medium">{result.name}</span>
											{result.ico && <span className="text-sm text-gray-400">IČO: {result.ico}</span>}

											{result.vznik && <span className="absolute text-xs text-gray-400 bottom-4 right-4">Založená: {result.vznik}</span>}

										</div>
										<hr className="w-full p-0"></hr>

										</React.Fragment>
										)
									})}
								</div> : ""
							}
						
						

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
							name='email'
							variant='filled'
							label='Firemný email'
							value={supplyer?.email}
						></TextField>
					</div>
				</div>
			
		</div>
	);
}
