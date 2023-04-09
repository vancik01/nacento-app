import { AnimatePresence } from "framer-motion";
import React from "react";
import { useViewOnly } from "../../context/ViewOnlyContext";
import { numberWithCommas } from "../../lib/helpers";
import A4 from "../A4";
import CustomerInfo from "../CustomerInfo";
import VOsection from "./VOsection";
import { useLayout } from "../../context/LayoutContext";
import moment from "moment/moment";
//import VOsection from "./VOsection";

export default function VOoffer() {
	const { dbData } = useViewOnly();
	const { primaryColor } = useLayout();
	const data = dbData.data;
	const totals = dbData.totals;
	return (
		<>
			<div className='pt-10 pb-32'>
				<div className='flex items-start justify-start px-8 overflow-x-auto pb-20 mx-auto w-fit'>
					<A4>
						<div
							className='h-20'
							style={{ backgroundColor: primaryColor }}
						></div>
						<div className='px-16 py-16'>
							<div className='flex justify-between items-center mb-20'>
								<div className=''>
									<div className='text-4xl'>Cenová ponuka</div>
									<div className='text-gray-300'>{dbData.subHeading}</div>
								</div>

								{dbData?.images?.logo && (
									<div>
										<img
											className='max-w[180px] max-h-[80px]'
											src={dbData.images.logo}
											alt=''
										/>
									</div>
								)}
							</div>

							<div className='grid grid-cols-3 flex-row gap-10 justify-start mt-4'>
								<div>
									<div className='text-base'>
										<div className='mb-1 text-gray-300 capitalize'>
											OBJEDNÁVATEL:
										</div>

										<div>{data.customer.name}</div>
									</div>
								</div>

								<div>
									<div className='text-base flex flex-col gap-1'>
										<div className='mb-1  text-gray-300 capitalize'>
											DODÁVATEL:
										</div>
										<div className='text-sm'>
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
									<div className='mb-1 text-gray-300 capitalize'>CENA:</div>

									<div className='text-sm'>
										<div className='relative w-fit text-sm'>
											<div>
												Cena Montáže:{" "}
												{parseFloat(totals.total_construction_price).toFixed(2)}
												€
											</div>
										</div>

										<div className='relative w-fit text-sm'>
											<div>
												Cena Dodávky:{" "}
												{parseFloat(totals.total_delivery_price).toFixed(2)} €
											</div>
										</div>

										<div
											className='w-full h-[1px] my-2'
											style={{ backgroundColor: primaryColor, opacity: 0.7 }}
										></div>
										<div className='relative w-fit'>
											<div>
												Spolu: {parseFloat(totals.total).toFixed(2)} €{" "}
												<span className='text-[10px]'>bez DPH</span>
											</div>
										</div>

										<div>
											DPH 20%:{" "}
											{numberWithCommas((totals.total * 0.2).toFixed(2))} €
										</div>

										<div className='relative w-fit'>
											<div className='mt-2 font-medium text-xl'>
												Cena spolu:
											</div>
										</div>

										<div className='mt-2 font-medium text-xl'>
											{numberWithCommas((totals.total * 1.2).toFixed(2))} €{" "}
											<span className='text-[10px]'>vrátane DPH</span>
										</div>
									</div>
								</div>
							</div>

							<div className='my-10'>
								<div className='w-full h-[1px] bg-black'></div>
								<div className='py-4'>
									<h1 className='text-center'>{dbData.name}</h1>

									<div className='w-full text-center mt-2 focus:outline-none text-gray-400 font-light'>
										{dbData.description}
									</div>
								</div>
								<div className='w-full h-[1px] bg-black'></div>
							</div>

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
							<div className='pt-16'>
								<div className='grid grid-cols-2 items-center'>
									<div className='text-sm'>
										{dbData.data.supplyer.company_name && (
											<div className='mb-4'>
												<div className='font-medium'>Ponuku vypracoval:</div>
												<div className='text-gray-400'>
													{dbData.data.supplyer.company_name}
												</div>
											</div>
										)}
										<div>
											<div className='font-medium'>
												Platnosť cenovej ponuky:
											</div>
											<div className='text-gray-400'>
												{dbData.expiration && (
													<div>
														do {moment(dbData.expiration).format("DD.MM.YYYY")}{" "}
														( končí o{" "}
														{moment(dbData.expiration).diff(moment(), "day") +
															1}{" "}
														dní)
													</div>
												)}
											</div>
										</div>
									</div>
									{dbData?.images?.signature && (
										<div className='ml-auto'>
											<img
												className='max-w-[300px]'
												src={dbData.images.signature}
												alt=''
											/>
										</div>
									)}
								</div>

								<div className='flex items-center justify-center mt-16 flex-col'>
									<div className='flex items-baseline gap-2 justify-center'>
										<div className='text-xs'>Vytvorené pomocou aplikácie </div>
										<div>
											<img className='w-16 -mb-1' src='/logo.png' alt='' />
										</div>
									</div>
									<div className='text-xs mt-1 text-gray-400'>
										nacento.online
									</div>
								</div>
							</div>
						</div>
					</A4>
				</div>
			</div>
		</>
	);
}
