import React, { useEffect, useState } from "react";
import { useData } from "../../context/AppWrap";
import BottomBar from "./BottomBar";
import { AnimatePresence } from "framer-motion";
import SupplyerInfo from "./SupplyerInfo";
import EditPen from "../../public/assets/editor/EditPen";
import { numberWithCommas } from "../../lib/helpers";
import A4 from "./A4";
import { useLayout } from "../../context/LayoutContext";
import BulkEdit from "../buttons/BulkEdit";
import CustomerInfo from "./CustomerInfo";
import Section from "./Section";
import EditText from "./EditText";
import AddSection from "./AddSection";
import { TextareaAutosize } from "@mui/material";
import OfferFooter from "./OfferFooter";
import SubHeading from "./SubHeading";
import UploadImage from "./UploadImage";
import { getValue } from "../../context/ValuesContext";


export default function CenovaPonuka() {
	const [winReady, setwinReady] = useState(false);

	const {
		total,
		name,
		setname,
		bulkEditData,
		openBulkEdit,
		logo,
		setlogo,
		description,
		changeDescription,
	} = useData();


	const { primaryColor, isHorizontal } = useLayout();

	const [sections] = getValue((data) => data.data.sections);
	// const [total] = getValue((data) => data.data.totals);


	useEffect(() => {
		setwinReady(true);
	});

	return (
		<>
			<div className='pt-10 pb-32'>
				{<BulkEdit blockTitle={bulkEditData.title} />}

				<div className='flex items-start justify-start w-full px-8 overflow-x-auto pb-20'>
					<A4>
						<div
							className='h-20'
							style={{ backgroundColor: primaryColor }}
						></div>
						<div className='px-16 py-16'>
							<div className='flex justify-between items-center mb-20'>
								<div className=''>
									<div className='text-4xl'>Cenová ponuka</div>
									<SubHeading></SubHeading>
								</div>

								<div className='flex justify-between items-center relative w-fit h-fit'>
									<UploadImage
										placeholder='Nahrať logo'
										width={200}
										height={80}
										defaultPreview={logo}
										onUpload={(url) => {
											setlogo(url);
										}}
										imageId='logo'
									></UploadImage>
								</div>
							</div>

							<div className='flex flex-row gap-10 justify-between mt-4'>
								<div>
									<CustomerInfo scale={isHorizontal}></CustomerInfo>
								</div>

								<div>
									<SupplyerInfo scale={isHorizontal}></SupplyerInfo>
								</div>

								<PricesComponent/>

							</div>		

							<div className='my-10'>
								<div className='w-full h-[1px] bg-black'></div>
								<div className='py-4'>
									<EditText
										initialValue={name}
										onSave={(value) => {
											setname(value);
										}}
									/>

									<TextareaAutosize
										spellCheck='false'
										value={description}
										onChange={changeDescription}
										placeholder='Zadajte krátky text...'
										style={{
											textAlign: "center",
											fontSize: 14,
											resize: "none",
										}}
										className='w-full text-center mt-2 focus:outline-none text-gray-400 font-light'
									></TextareaAutosize>
								</div>
								<div className='w-full h-[1px] bg-black'></div>
							</div>

							<div>
								{winReady &&
									sections.map((section, i) => {
										return (
											<div key={`section-${i}`}>
												<Section
													isLast={i === sections.length - 1}
													section={section}
													sectionId={i}
												></Section>
											</div>
										);
									})}
								<AddSection></AddSection>
							</div>
							<div className='mt-10'>
								<OfferFooter></OfferFooter>
							</div>
						</div>
					</A4>
				</div>
			</div>

			{winReady && (
				<div className='sticky bottom-0 z-10 transition-all'>
					<AnimatePresence> {<BottomBar></BottomBar>}</AnimatePresence>
				</div>
			)}
		</>
	);
}

function PricesComponent(){

	const {openBulkEdit,} = useData();

	const { primaryColor, isHorizontal } = useLayout();

	// const [sections] = getValue((data) => data.data.sections);
	const [total] = getValue((data) => data.data.totals);

	function format_number(number) {
		if(!number) return 0;
		return numberWithCommas(number.toFixed(2))
	}

	return(
		<div>
		<div
			className={`${
				isHorizontal && "text-lg"
			} mb-1 text-gray-300 capitalize`}
		>
			CENA:
		</div>

		<div
			className={`${
				isHorizontal ? "text-lg" : "text-sm"
			} max-w-[220px]`}>

			<button
				onClick={(e) => {
					openBulkEdit(
						{
							blockId: -1,
							value: total?.total_construction_price,
							valueId: "total_construction_price",
							mode: "whole",
						},
						e
					);
				}}
			>
				<div className={`relative w-fit`}>
					<div>
						Cena Montáže:{" "}
						{ format_number(total?.total_construction_price)}{" "}€
					</div>

					<div className='absolute top-0 -right-3 w-2'>
						<EditPen></EditPen>
					</div>
				</div>
			</button>

			<button
				onClick={(e) => {
					openBulkEdit(
						{
							blockId: -1,
							value: total?.total_delivery_price,
							valueId: "total_delivery_price",
							mode: "whole",
						},
						e
					);
				}}
				className='w-fit'
			>
				<div className='relative w-fit'>
					<div>
						Cena Dodávky:{" "}
						{format_number(
							total?.total_delivery_price
						)}{" "}
						€
					</div>

					<div className='absolute top-0 -right-3 w-2'>
						<EditPen></EditPen>
					</div>
				</div>
			</button>

			<div
				className='w-full h-[1px] my-2'
				style={{ backgroundColor: primaryColor, opacity: 0.7 }}
			></div>

			<button
				onClick={(e) => {
					openBulkEdit(
						{
							blockId: -1,
							value: total?.total * 1.2,
							valueId: "total_vat",
							mode: "whole",
						},
						e
					);
				}}
				className='w-fit'
			>
				<div className='relative w-fit'>
					<div>
						Spolu:{" "}
						{format_number((total?.total * 1.2))} €{" "}
						<span className='text-[10px]'>s DPH</span>
					</div>

					<div className='absolute top-0 -right-3 w-2'>
						<EditPen></EditPen>
					</div>
				</div>
			</button>

			<div>
				DPH 20%:{" "}
				{format_number((total?.total * 0.2))} €
			</div>

			<button
				onClick={(e) => {
					openBulkEdit(
						{
							blockId: -1,
							value: total?.total,
							valueId: "total",
							mode: "whole",
						},
						e
					);
				}}
			>
				<div className='relative w-fit'>
					<div className='mt-2 font-medium text-xl text-left'>
						Cena spolu:
					</div>
					<div className='mt-2 font-medium text-xl'>
						{format_number(total?.total)} €
						<span className='text-[10px]'>bez DPH</span>
					</div>

					<div className='absolute top-0 -right-3 w-2'>
						<EditPen></EditPen>
					</div>
				</div>
			</button>
		</div>
	</div>

	)
}
