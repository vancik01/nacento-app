import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";


import Close from "../../public/SVG/Close";
import SimpleSection from "./SimpleSection";


export default function CenovaPonuka() {
	const [winReady, setwinReady] = useState(false);


	const theme = createTheme({
		typography: {
			fontFamily: "Poppins",
			fontSize: 10,
		},
	});


	const data = {
		"customer": {
			"name":""
		},
		"supplyer":{
			"company_name" : "",
			"ico" : "",
			"dic" : "",
			"phone" : "",
			"email" : "",
			"web" : ""
		},
		"headers": [
			"title",
			"unit",
			"quantity",
			"total_delivery_price",
			"total_construction_price",
			"total"
		],
			"sections":[
				{
					"info": {
						"title": "Základová doska",
						"total_delivery_price": 0,
						"total_construction_price": 150,
						"total":150
					},
					"blocks": [
						{
							"info": {
								"title": "Zemné práce",
								"total_delivery_price": 0,
								"total_construction_price": 150,
								"total":150
							},
							"items": [
								{
									"service_type": 0,
									"item_id": "000300016.S",
									"title": "Geodetické práce - vykonávané pred výstavbou určenie vytyčovacej siete, vytýčenie staveniska, staveb. objektu",
									"unit": "diel",
									"quantity": 1,
									"unit_delivery_price": 0,
									"unit_construction_price": 150,
									"total_delivery_price": 0,
									"total_construction_price": 150,
									"total": 150
								}
							   
							]
						}
					]
				}
			]
		}
	
	const [selectedFile, setselectedFile] = useState(null);
	const [logo, setlogo] = useState(null);
	const [primaryColor, setprimaryColor] = useState("#63A695");

	useEffect(() => {
		setwinReady(true);
	});

	return (
		<ThemeProvider theme={theme}>

			<div className="pt-10 pb-32">

			<div
			style={{ width: "894px", minHeight: 1260 }}
			className="mx-auto shadow-xl h-fit w-fit transition-all"
			id="a4-page">

				<div className="h-20" style={{ backgroundColor: primaryColor }}></div>


		
					
					<div className="px-16 py-16">
						<div className="flex justify-between items-center mb-20">
							
							<div>
								<div className="text-4xl">Cenová ponuka</div>
								<div className="text-gray-300">#2341</div>
							</div>

							<div className="flex justify-between items-center relative">
								<label htmlFor="upload-logo">
									{!logo && (
										<div
											className="text-xl px-6 py-2 border"
											style={{
												color: primaryColor,
												borderColor: primaryColor,
											}}
										>
											Nahrať logo
										</div>
									)}
								</label>
								{logo && (
									<img src={logo} alt="logo" className="max-w-32 max-h-16" />
								)}
								{logo && (
									<button
										onClick={() => {
											setselectedFile(null);
										}}
										className="absolute -top-3 -right-2"
									>
										<Close color={"red"}></Close>
									</button>
								)}

								<input
									accept=".jpg,.jpeg,.png"
									type="file"
									onChange={setselectedFile}
									className="hidden"
									name=""
									id="upload-logo"
								/>
							</div>
						</div>

						<div className="flex flex-row gap-10 justify-start mt-4">
							<div>
									<div className="min-w-[200px]">
										<div className="relative w-fit">
											<div className="mb-2 text-gray-300 capitalize">OBJEDNÁVATEĽ:</div>
										</div>

										<div className="text-sm">
											<div>Váš zákazník</div>
										</div>
									</div>
							</div>

							<div>
									<div className="min-w-[200px]">
										<div className="relative w-fit">
											<div className="mb-2 text-gray-300 capitalize">DODÁVATEĽ:</div>
										</div>

										<div className="text-sm flex flex-col gap-1">
											<div>Homebuilding s.r.o.</div>
											<div>IČO: 2654242</div>
											<div>DIČ: 2464646</div>
											<div>0907990046</div>
											<div>kontakt@homebuilding.sk</div>
											<div>homebuilding.sk</div>
										</div>
									</div>
							</div>

							<div>
								<div className="mb-1 text-gray-300 capitalize">CENA:</div>

								<div className="text-sm">
									<div className="relative w-fit text-sm">
										<div>
											Cena Montáže: 150 €
										</div>
									</div>

									<div className="relative w-fit text-sm">
										<div>
											Cena Dodávky: 0 €
										</div>
			
									</div>

									<div
										className="w-full h-[1px] my-2"
										style={{ backgroundColor: primaryColor, opacity: 0.7 }}
									></div>
									<div className="relative w-fit">
										<div>
											Spolu: 150 €
											<span className="text-[10px]">bez DPH</span>
										</div>
	
									</div>

									<div>
										DPH 20%: 30 €
			
									</div>

									<div className="relative w-fit">
										<div className="mt-2 font-medium text-xl">
											Cena spolu: 
										</div>
			
									</div>

									<div className="mt-2 font-medium text-xl">
										180 €
										<span className="text-[10px]">{" "}vrátane DPH</span>
									</div>
								</div>
							</div>
						</div>


						<div className="my-10">
							<div className="w-full h-[1px] bg-black"></div>
							<div className="py-4">
								
								<div className="text-center relative" style={{ fontSize: 20 }}>
									<span>Názov</span>
								</div>

							</div>
							<div className="w-full h-[1px] bg-black"></div>
						</div>


						
							{winReady &&

		
									<SimpleSection
										section={data.sections[0]}
										data={data}
									></SimpleSection>

								
								}
						
					</div>
			</div>
			</div>

		</ThemeProvider>
	);
}
