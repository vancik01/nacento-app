import { AccordionSummary } from "@mui/material";
import { Switch } from "@mui/material";
import { Button } from "@mui/material";
import { AccordionDetails } from "@mui/material";
import { Accordion } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useData } from "../context/AppWrap";
import { useLayout } from "../context/LayoutContext";
import ArrowDown from "../public/SVG/ArrowDown";
import Logo from "../public/SVG/Logo";
import PaintBrush from "../public/SVG/PaintBrush";
import TableIcon from "../public/SVG/TableIcon";
import { motion } from "framer-motion";
import { layoutConfig } from "../lib/data";
import ButtonPrimary from "./buttons/ButtonPrimary";
import Paper from "../public/SVG/Paper";
import { AnimatePresence } from "framer-motion";
import { AnimateSharedLayout } from "framer-motion";
import CloseSidebar from "../public/SVG/CloseSidebar";
import VariantIcon from "../public/SVG/VariantIcon";
import PageIcon from "../public/SVG/PageIcon";
import BlockIcon from "../public/SVG/BlockIcon";
import Pro from "./Pro";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

import BlockSelector from "./BlockSelector";
import ButtonIcon from "./buttons/ButtonIcon";
import TrashBin from "../public/SVG/editor/TrashBin";
import LayoutTemplates from "./editor/LayoutTemplates";

export default function Sidebar() {
	const {
		getTitle,
		headers,
		reorderingBlocks,
		setreorderingBlocks,
		setdownload,
		setdisplaySidebar,
		handleSave,
		saving,
		triggerTemplate,
	} = useData();

	const {
		displayColumns,
		handleDisplayColumnsChange,
		setprimaryColor,
		primaryColor,
		isHorizontal,
		setisHorizontal,
		changeVariant,
		variant,
		saveLayoutTemplate,
	} = useLayout();
	const [opened, setopened] = useState("");
	const [toggleTemplateName, settoggleTemplateName] = useState(true);

	function handleSetOpen(id) {
		if (opened === "blok" && reorderingBlocks) {
			setreorderingBlocks(false);
		}
		if (opened === id) {
			setopened("");
		} else {
			setopened(id);
		}
	}

	const theme = createTheme({
		typography: {
			fontFamily: "Poppins",
			fontSize: 10,
		},
		palette: {
			primary: {
				main: primaryColor,
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<div className="fixed left-0 top-0 bottom-0 z-50 w-[300px] ">
				<div className="relative w-fit">
					<div className="py-10 px-6  shadow-lg bg-white h-screen overflow-y-scroll bg-scrol-gray-50">
						<div className="flex flex-col min-h-full">
							<div className="min-w-28 w-28">
								<Logo></Logo>
							</div>
							<div className="mt-10">
								<Accordion expanded={opened === "strana"}>
									<AccordionSummary
										expandIcon={<ArrowDown />}
										onClick={() => {
											handleSetOpen("strana");
										}}
									>
										<div className="flex items-center gap-2">
											<div className="w-4">
												<PageIcon color={"#63A695"}></PageIcon>
											</div>
											<div>Strana</div>
										</div>
									</AccordionSummary>

									<AccordionDetails>
										<div>
											<h3>Orientácia:</h3>
											<div className="flex items-center gap-4 mt-3">
												<button
													onClick={() => {
														setisHorizontal(false);
													}}
													style={{
														backgroundColor: !isHorizontal ? "#63A695" : "",
													}}
													className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-md"
												>
													<div className="w-5">
														<Paper
															color={isHorizontal ? "#d6d6d6" : "#fff"}
														></Paper>
													</div>
												</button>

												<button
													onClick={() => {
														setisHorizontal(true);
													}}
													style={{
														backgroundColor: isHorizontal ? "#63A695" : "",
													}}
													className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-md"
												>
													<div className="w-5 -rotate-90">
														<Paper
															color={!isHorizontal ? "#d6d6d6" : "#fff"}
														></Paper>
													</div>
												</button>
											</div>
										</div>
									</AccordionDetails>
								</Accordion>

								<Accordion expanded={opened === "tabulka"}>
									<AccordionSummary
										expandIcon={<ArrowDown />}
										onClick={() => {
											handleSetOpen("tabulka");
										}}
									>
										<div className="flex items-center gap-2">
											<TableIcon color={"#63A695"}></TableIcon>
											<div className="flex flex-row gap-3 items-center">
												<div>Tabuľka</div>
												{/* <Pro></Pro> */}
											</div>
										</div>
									</AccordionSummary>
									<AccordionDetails>
										<div>
											<h3>Zobraziť stĺpce</h3>
											<div className="flex flex-col items-start justify-between flex-wrap gap-2 mt-4">
												{headers?.map((header, i) => {
													return (
														<div
															key={i}
															className="flex items-center justify-between w-full text-xs"
														>
															<div>
																{getTitle(header, "sk").long}{" "}
																<span className="text-gray-300">
																	({getTitle(header, "sk").short})
																</span>
															</div>
															<Switch																
																size="small"
																defaultChecked={displayColumns.includes(header)}
																onChange={() => {
																	handleDisplayColumnsChange(header);
																}}
															/>
														</div>
													);
												})}
											</div>
										</div>
									</AccordionDetails>
								</Accordion>

								<Accordion expanded={opened === "vzhlad"}>
									<AccordionSummary
										expandIcon={<ArrowDown />}
										onClick={() => {
											handleSetOpen("vzhlad");
										}}
									>
										<div className="flex items-center gap-2">
											<div className="w-4">
												<PaintBrush color={"#63A695"}></PaintBrush>
											</div>
											<div>Vzhľad</div>
										</div>
									</AccordionSummary>
									<AccordionDetails>
										<div className="mb-2 font-medium">Hlavná farba</div>

										<div className="grid grid-cols-5 gap-2 w-52">
											{layoutConfig.defaultColors.map((color, i) => {
												return (
													<button
														key={i}
														className={`rounded-lg w-full aspect-square bg-opacity-40 transition-all duration-75 ${
															color == primaryColor
																? "shadow-md border-white border-opacity-60 border-4"
																: ""
														}`}
														style={{ backgroundColor: color }}
														onClick={() => {
															setprimaryColor(color);
														}}
													></button>
												);
											})}
										</div>
									</AccordionDetails>
								</Accordion>

								<Accordion expanded={opened === "variant"}>
									<AccordionSummary
										expandIcon={<ArrowDown />}
										onClick={() => {
											handleSetOpen("variant");
										}}
									>
										<div className="flex items-center gap-2">
											<div className="w-4">
												<VariantIcon color={"#63A695"} />
											</div>
											<div>Variant</div>
										</div>
									</AccordionSummary>

									<AccordionDetails>
										<div className="mb-4 font-medium">
											Variant cenovej ponuky
										</div>
										<div className="flex justify-center items-center flex-col gap-2">
											<ButtonPrimary
												className="text-sm w-full"
												onClick={() => {
													changeVariant("basic");
												}}
												color={variant.id !== "basic" ? "#d5d5d5" : "#63A695"}
											>
												Jednoduchá
											</ButtonPrimary>
											<ButtonPrimary
												onClick={() => {
													changeVariant("normal");
												}}
												className="text-sm w-full"
												color={variant.id !== "normal" ? "#d5d5d5" : "#63A695"}
											>
												Štandardná
											</ButtonPrimary>

											<div className="relative w-full">
												<ButtonPrimary
													onClick={() => {
														changeVariant("pro");
													}}
													className="text-sm w-full"
													color={variant.id !== "pro" ? "#d5d5d5" : "#63A695"}
												>
													Profesionálna
												</ButtonPrimary>
												{/* <div className="absolute -top-2 -right-2">
													<Pro></Pro>
												</div> */}
											</div>
										</div>
									</AccordionDetails>
								</Accordion>
								<Accordion expanded={opened === "template"}>
									<AccordionSummary
										expandIcon={<ArrowDown />}
										onClick={() => {
											handleSetOpen("template");
										}}
									>
										<div className="flex items-center gap-2">
											<div className="w-4">
												<VariantIcon color={"#63A695"} />
											</div>
											<div>Uložené šablóny</div>
										</div>
									</AccordionSummary>

									<AccordionDetails>
										<div className="flex justify-center items-center flex-col gap-2">
											<LayoutTemplates />
										</div>
									</AccordionDetails>
								</Accordion>

								<div className="mt-8">Pridať práce do ponuky:</div>
								<ButtonPrimary
									scale={0.98}
									className="w-full text-base mt-1"
									onClick={() => {
										triggerTemplate(0, 0, 0, "");
									}}
									color="#63A695"
								>
									Výber z databázy prác
								</ButtonPrimary>			
								
							</div>

							<div className="mt-auto w-full flex flex-col gap-2">
								<ButtonPrimary
									scale={0.98}
									className="w-full text-sm"
									onClick={() => handleSave(true)}
									style={{ color: primaryColor }}
									disabled={saving}
									color="#63A695"
								>
									Uložiť zmeny
								</ButtonPrimary>

								<ButtonPrimary
									scale={0.98}
									className="w-full text-sm"
									onClick={() => {
										setdownload(true);
									}}
									color="#63A695"
								>
									Stiahnuť ponuku
								</ButtonPrimary>

								 {/* <button
									scale={0.98}
									className="w-full text-sm mt-6"
									onClick={() => {
										setdownload(true);
									}}
									style={{ color: primaryColor }}
								>
									Stiahnuť ponuku
								</button> */}

								<button className="flex w-full mt-6">
									<div
										className="p-2 ml-auto"
										onClick={() => {
											setdisplaySidebar(false);
										}}
									>
										<div className="w-2">
											<CloseSidebar></CloseSidebar>
										</div>
									</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
}
