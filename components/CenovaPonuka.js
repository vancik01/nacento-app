import React, { useEffect, useState } from "react";
import { useData } from "../context/AppWrap";
import BottomBar from "./BottomBar";
import { DownloadLink } from "./Pdf";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import { Input } from "@mui/material";
import SupplyerInfo from "./SupplyerInfo";
import EditPen from "../public/SVG/EditPen";
import { numberWithCommas } from "../lib/helpers";
import A4 from "./A4";
import { useLayout } from "../context/LayoutContext";
import ButtonPrimary from "./buttons/ButtonPrimary";
import BulkEdit from "./buttons/BulkEdit";
import CustomerInfo from "./CustomerInfo";
import Close from "../public/SVG/Close";
import Section from "./Section";
import EditText from "./editor/EditText";
import AddSection from "./editor/AddSection";
import { TextareaAutosize } from "@mui/material";
import OfferFooter from "./editor/OfferFooter";
import SubHeading from "./editor/SubHeading";

export default function CenovaPonuka() {
	const [winReady, setwinReady] = useState(false);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [editingTitle, seteditingTitle] = useState(false);
	//const [reorderingBlocks, setreorderingBlocks] = useState(false)
	const {
		data,
		total,
		name,
		setname,
		bulkEdit,
		bulkEditData,
		openBulkEdit,
		download,
		setdownload,
		setselectedFile,
		logo,
		description,
		changeDescription,
	} = useData();

	const { primaryColor } = useLayout();

	useEffect(() => {
		setwinReady(true);
	});

	return (
		<>
			<div className="pt-10 pb-32">
				{<BulkEdit blockTitle={bulkEditData.title} />}

				<div className="flex items-start justify-start w-full px-8 overflow-x-auto pb-20">
					<A4>
						<div
							className="h-20"
							style={{ backgroundColor: primaryColor }}
						></div>
						<div className="px-16 py-16">
							<div className="flex justify-between items-center mb-20">
								<div className="">
									<div className="text-4xl">Cenová ponuka</div>
									<SubHeading></SubHeading>
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
									<CustomerInfo></CustomerInfo>
								</div>

								<div>
									<SupplyerInfo></SupplyerInfo>
								</div>

								<div>
									<div className="mb-1 text-gray-300 capitalize">CENA:</div>

									<div className="text-sm">
										<div className="relative w-fit text-sm">
											<div>
												Cena Montáže:{" "}
												{numberWithCommas(
													total.total_construction_price.toFixed(2)
												)}{" "}
												€
											</div>
											{!bulkEdit && (
												<button
													onClick={(e) => {
														openBulkEdit(
															{
																blockId: -1,
																value: total.total_construction_price,
																valueId: "total_construction_price",
																mode: "whole",
															},
															e
														);
													}}
													className="absolute top-0 -right-3 w-2"
												>
													<EditPen></EditPen>
												</button>
											)}
										</div>

										<div className="relative w-fit text-sm">
											<div>
												Cena Dodávky:{" "}
												{numberWithCommas(
													total.total_delivery_price.toFixed(2)
												)}{" "}
												€
											</div>
											{!bulkEdit && (
												<button
													onClick={(e) => {
														openBulkEdit(
															{
																blockId: -1,
																value: total.total_delivery_price,
																valueId: "total_delivery_price",
																mode: "whole",
															},
															e
														);
													}}
													className="absolute top-0 -right-3 w-2"
												>
													<EditPen></EditPen>
												</button>
											)}
										</div>

										<div
											className="w-full h-[1px] my-2"
											style={{ backgroundColor: primaryColor, opacity: 0.7 }}
										></div>
										<div className="relative w-fit">
											<div>
												Spolu: {numberWithCommas(total.total.toFixed(2))} €{" "}
												<span className="text-[10px]">bez DPH</span>
											</div>
											{!bulkEdit && (
												<button
													onClick={(e) => {
														openBulkEdit(
															{
																blockId: -1,
																value: total.total,
																valueId: "total",
																mode: "whole",
															},
															e
														);
													}}
													className="absolute top-0 -right-3 w-2"
												>
													<EditPen></EditPen>
												</button>
											)}
										</div>

										<div>
											DPH 20%:{" "}
											{numberWithCommas((total.total * 0.2).toFixed(2))} €
										</div>

										<div className="relative w-fit">
											<div className="mt-2 font-medium text-xl">
												Cena spolu:
											</div>
											{!bulkEdit && (
												<button
													onClick={(e) => {
														openBulkEdit(
															{
																blockId: -1,
																value: total.total * 1.2,
																valueId: "total_vat",
																mode: "whole",
															},
															e
														);
													}}
													className="absolute top-0 -right-3 w-2"
												>
													<EditPen></EditPen>
												</button>
											)}
										</div>

										<div className="mt-2 font-medium text-xl">
											{numberWithCommas((total.total * 1.2).toFixed(2))} €{" "}
											<span className="text-[10px]">vrátane DPH</span>
										</div>
									</div>
								</div>
							</div>

							<div className="my-10">
								<div className="w-full h-[1px] bg-black"></div>
								<div className="py-4">
									<EditText
										initialValue={name}
										onSave={(value) => {
											setname(value);
										}}
									/>

									<TextareaAutosize
										spellCheck="false"
										value={description}
										onChange={changeDescription}
										placeholder="Zadajte krátky text..."
										style={{
											textAlign: "center",
											fontSize: 14,
											resize: "none",
										}}
										className="w-full text-center mt-2 focus:outline-none text-gray-400 font-light"
									></TextareaAutosize>
								</div>
								<div className="w-full h-[1px] bg-black"></div>
							</div>

							<AnimatePresence>
								{download && (
									<Modal
										title="Stiahnuť ponuku"
										close={() => {
											setdownload(false);
										}}
									>
										<DownloadLink
											close={() => {
												setdownload(false);
											}}
										/>
									</Modal>
								)}
							</AnimatePresence>
							<div>
								{winReady &&
									data.sections.map((section, i) => {
										return (
											<div key={`section-${i}`}>
												<Section
													isLast={i === data.sections.length - 1}
													section={section}
													sectionId={i}
												></Section>
											</div>
										);
									})}
								<AddSection></AddSection>
							</div>
							<div className="mt-10">
								<OfferFooter></OfferFooter>
							</div>
						</div>
					</A4>
				</div>
			</div>
		</>
	);
}
