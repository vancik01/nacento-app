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
import ButtonPrimary from "./ButtonPrimary";
import BulkEdit from "./BulkEdit";
import CustomerInfo from "./CustomerInfo";
import Close from "../public/SVG/Close";
import Section from "./Section";

export default function CenovaPonuka() {
	const [winReady, setwinReady] = useState(false);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [editingTitle, seteditingTitle] = useState(false);
	//const [reorderingBlocks, setreorderingBlocks] = useState(false)
	const {
		data,
		headers,
		total,
		name,
		setname,
		bulkEdit,
		bulkEditData,
		openBulkEdit,
		closeBulkEdit,
		getTitle,
		displayTotals,
		toggleTotals,
		reorderingBlocks,
		setreorderingBlocks,
		download,
		setdownload,

		setselectedFile,
		logo,
	} = useData();

	const { primaryColor } = useLayout();

	useEffect(() => {
		setwinReady(true);
	});

	return (
		<>
			{console.log(data, "Data")}
			<div className="pt-10 pb-32">
				{bulkEdit && (
					<Modal title="Upraviť cenu" close={closeBulkEdit}>
						<BulkEdit blockTitle={bulkEditData.title} />
					</Modal>
				)}

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
													onClick={() => {
														openBulkEdit({
															blockId: -1,
															value: total.total_construction_price,
															valueId: "total_construction_price",
															mode: "whole",
														});
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
													onClick={() => {
														openBulkEdit({
															blockId: -1,
															value: total.total_delivery_price,
															valueId: "total_delivery_price",
															mode: "whole",
														});
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
													onClick={() => {
														openBulkEdit({
															blockId: -1,
															value: total.total,
															valueId: "total",
															mode: "whole",
														});
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
													onClick={() => {
														openBulkEdit({
															blockId: -1,
															value: total.total * 1.2,
															valueId: "total_vat",
															mode: "whole",
														});
													}}
													className="absolute top-0 -right-3 w-2"
												>
													<EditPen></EditPen>
												</button>
											)}
										</div>

										<div className="mt-2 font-medium text-xl">
											{" "}
											{numberWithCommas((total.total * 1.2).toFixed(2))} €{" "}
											<span className="text-[10px]">vrátane DPH</span>
										</div>
									</div>
								</div>
							</div>

							<div className="my-10">
								<div className="w-full h-[1px] bg-black"></div>
								<div className="py-4">
									<div className="w-full flex justify-center">
										{!editingTitle && (
											<button
												onClick={() => {
													seteditingTitle(true);
												}}
											>
												<h1 className="text-center relative">
													{name}
													<div className="absolute top-0 -right-3 w-2">
														<EditPen></EditPen>
													</div>
												</h1>
											</button>
										)}

										{editingTitle && (
											<div className="flex items-baseline justify-center">
												<Input
													className="w-full min-w-[400px]"
													variant="outlined"
													placeholder="Zadajte názov..."
													value={name}
													style={{ fontSize: 24 }}
													onChange={(e) => {
														setname(e.target.value);
													}}
												/>
												<ButtonPrimary
													className="ml-4"
													onClick={() => {
														seteditingTitle(false);
													}}
												>
													Uložiť
												</ButtonPrimary>
											</div>
										)}
									</div>
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
												<Section section={section} sectionId={i}></Section>
											</div>
										);
									})}
							</div>
						</div>
					</A4>
				</div>
			</div>
		</>
	);
}
