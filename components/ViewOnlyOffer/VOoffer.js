import { AnimatePresence } from "framer-motion";
import React from "react";
import { useViewOnly } from "../../context/ViewOnlyContext";
import { numberWithCommas } from "../../lib/helpers";
import A4 from "../A4";
import CustomerInfo from "../CustomerInfo";
import VOsection from "./VOsection";
import {useLayout} from "../../context/LayoutContext";
//import VOsection from "./VOsection";

export default function VOoffer() {
	const { dbData } = useViewOnly();
	const {primaryColor} = useLayout();
	const data = dbData.data;
	const totals = dbData.totals;
	return (
		<>
			<div className="pt-10 pb-32">
				<div className="flex items-start justify-start w-full px-8 overflow-x-auto pb-20">
					<A4>
						<div className="h-20" style={{ backgroundColor: primaryColor }}></div>
						<div className="px-16 py-16">
							<div className="flex justify-between items-center mb-20">
								<div className="">
									<div className="text-4xl">Cenová ponuka</div>
									<div className="text-gray-300">{dbData.subHeading}</div>
								</div>

								<div>LOGO</div>
							</div>

							<div className="grid grid-cols-3 flex-row gap-10 justify-start mt-4">
								<div>
									<div className="text-base">
										<div className="mb-1 text-gray-300 capitalize">
											OBJEDNÁVATEL:
										</div>

										<div>{data.customer.name}</div>
									</div>
								</div>

								<div>
									<div className="text-base flex flex-col gap-1">
										<div className="mb-1  text-gray-300 capitalize">
											DODÁVATEL:
										</div>
										<div className="text-sm">
											{data.supplyer.company_name && (
												<div>{data.supplyer.company_name}</div>
											)}
											{data.supplyer.ico && <div>IČO: {data.supplyer.ico}</div>}
											{data.supplyer.dic && <div>DIČ: {data.supplyer.dic}</div>}
											{data.supplyer.phone && <div>{data.supplyer.phone}</div>}
											{data.supplyer.email && <div>{data.supplyer.email}</div>}
											{data.supplyer.web && <div>{data.supplyer.web}</div>}
										</div>
									</div>
								</div>

								<div>
									<div className="mb-1 text-gray-300 capitalize">CENA:</div>

									<div className="text-sm">
										<div className="relative w-fit text-sm">
											<div>
												Cena Montáže:{" "}
												{numberWithCommas(totals.total_construction_price)} €
											</div>
										</div>

										<div className="relative w-fit text-sm">
											<div>
												Cena Dodávky:{" "}
												{numberWithCommas(totals.total_delivery_price.toFixed(2))} €
											</div>
										</div>

										<div
											className="w-full h-[1px] my-2"
											style={{ backgroundColor: primaryColor, opacity: 0.7 }}
										></div>
										<div className="relative w-fit">
											<div>
											
												Spolu: {numberWithCommas((totals.total * 1.2).toFixed(2))} €{" "}
												<span className="text-[10px]">vrátane DPH</span>
											</div>
										</div>

										<div>
											DPH 20%:{" "}
											{numberWithCommas((totals.total * 0.2).toFixed(2))} €
										</div>

										<div className="relative w-fit">
											<div className="mt-2 font-medium text-xl">
												Cena spolu:
											</div>
										</div>

										<div className="mt-2 font-medium text-xl">
										{numberWithCommas(totals.total)} €{" "}
											<span className="text-[10px]">bez DPH</span>
										</div>
									</div>
								</div>
							</div>

							<div className="my-10">
								<div className="w-full h-[1px] bg-black"></div>
								<div className="py-4">
									<h1 className="text-center">{dbData.name}</h1>

									<div className="w-full text-center mt-2 focus:outline-none text-gray-400 font-light">
										{dbData.description}
									</div>
								</div>
								<div className="w-full h-[1px] bg-black"></div>
							</div>

							{/* <AnimatePresence>
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
							</AnimatePresence> */}
							<div>
								{data.sections.map((section, i) => {
									return (
										<div key={`section-${i}`}>
											<VOsection
												isLast={i === data.sections.length - 1}
												section={section}
												sectionId={i}
											></VOsection>
										</div>
									);
								})}
							</div>
							{/* <div className="mt-10">
								<OfferFooter></OfferFooter>
							</div> */}
						</div>
					</A4>
				</div>
			</div>
		</>
	);
}
