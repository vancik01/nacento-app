import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { motion } from "framer-motion";
import { Input } from "@mui/material";
import { TextareaAutosize } from "@mui/material";
import { Select } from "@mui/material";
import _ from "lodash";
import { lang } from "../../languages/languages"
import "react-tooltip/dist/react-tooltip.css";


function getTitle(titleId, language) {
    return lang[language][titleId];
}


export default function Table({ items, headers }) {


    const [primaryColor, setprimaryColor] = useState("#63A695");


	return (
		<>
			{
				<div>
					<div style={{ backgroundColor: primaryColor }} className="text-white">
						<div
							className="table_row heading select-none mt-4"
                            style={{ gridTemplateColumns: "30px 1fr 70px 70px 90px 90px 90px" }}
						>
							<div className="font-medium py-1 px-2">N.</div>
							{headers.map((item, i) => {
								var heading = getTitle(item, "sk");

									return (
										<div key={`table-header-${i}`}>
											<div
												className={`font-medium ${heading.short} py-1 px-2`}
												style={{ color: "white" }}
											>
												<Tooltip
													id="tooltip"
													anchorSelect={`#col-${i}`}
													place="top"
													content={heading.long}
													delayHide={3}
												/>
												<span id={`col-${i}`}>{heading.short}</span>
											</div>
										</div>
									);
								
							})}

                            
						</div>

                        <div className="table_wrap">

                                <TableRow
                                    polozka={items[0]}
                                    headers={headers}
                                    primaryColor={primaryColor}
                                ></TableRow>
	
							</div>
					</div>


				</div>
			}
		</>
	);
}

function TableRow({ polozka, headers, primaryColor }) {
    console.log(headers)
	return (
		<div className="relative text-black">
			
					<div>
						<div
							className={`table_row content last`}
							style={{ gridTemplateColumns: "30px 1fr 70px 70px 90px 90px 90px" }}>
							<div className={`flex justify-center items-center select-none h-full py-1 table_unit`}>
								{1}
							</div>

							{headers.map((item) => {
								var label = getTitle(item, "sk");

									return (
										<div className="h-full flex items-center justify-start py-1 px-2 table_unit">
											<TableUnit
												item={item}
												polozka={polozka}
												label={label}
											/>
										</div>
									);
	
							})}

						</div>
					</div>
				

		</div>
	);
}

function TableUnit({ item, polozka, label }) {


	if (item === "service_type") {
		return (
			<div className={`flex align-middle items-center ${label.short}`}>
				{polozka.service_type}
			</div>
		);
	} else if (item === "item_id") {
		return (
			<div className={`flex align-middle items-center ${label.short}`}>
				{polozka.item_id}
			</div>
		);
	} else if (item === "title") {
		return (
			<div className={`flex align-middle items-center w-full ${label.short}`}>
				<TextareaAutosize
					className="w-full bg-transparent focus-visible:outline-none h-fit overflow-visible"
					value={polozka.title}
					name={item}
					style={{ resize: "none" }}
				/>
			</div>
		);
	} else if (item === "unit") {
		return (
			<div className={`flex align-middle items-center w-full ${label.short}`}>
				<select
					defaultValue={polozka.unit}
					name={item}
					className="w-full bg-transparent"
				>
					<option value="m2">m2</option>
					<option value="m3">m3</option>
					<option value="diel">diel</option>
					<option value="m">m</option>
				</select>
			</div>
		);
	} else if (item === "quantity") {
		return (
			<div className={`flex align-middle items-center ${label.short}`}>
				<Input
					disableUnderline
					inputProps={{ min: 1 }}
					type="number"
					value={polozka.quantity}
				/>
			</div>
		);
	} else if (item === "unit_delivery_price") {
		return (
			<div className={`flex align-middle items-center ${label.short}`}>
				<Input
					disableUnderline
					inputProps={{ min: 0 }}
					type="number"
					value={polozka.unit_delivery_price}
					endAdornment="€"
				/>
			</div>
		);
	} else if (item === "unit_construction_price") {
		return (
			<div className={`flex align-middle items-center ${label.short}`}>
				<Input
					disableUnderline
					inputProps={{ min: 0 }}
					type="number"
					value={polozka.unit_construction_price}
					endAdornment="€"
				/>
			</div>
		);
	} else if (item === "total_delivery_price") {
		return (
			<div className={`flex justify-center items-center ${label.short}`}>
				<Input
					disableUnderline
					inputProps={{ min: 0 }}
					type="number"
					value={polozka.total_delivery_price}
					endAdornment="€"
				/>
			</div>
		);
	} else if (item === "total_construction_price") {
		return (
			<div className={`flex align-middle items-center ${label.short}`}>
				<Input
					disableUnderline
					inputProps={{ min: 0 }}
					type="number"
					value={polozka.total_construction_price}
					endAdornment="€"
				/>
			</div>
		);
	} else if (item === "total") {
		return (
			<div className={`flex align-middle items-center ${label.short}`}>
				<Input
					disableUnderline
					inputProps={{ min: 0 }}
					type="number"
					value={polozka.total}
					endAdornment="€"
				/>
			</div>
		);
	}
}