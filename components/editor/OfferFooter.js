import { Input } from "@mui/material";
import React from "react";
import { useData } from "../../context/AppWrap";
import { useAuth } from "../../context/AuthContext";
import { useLayout } from "../../context/LayoutContext";
import Logo from "../../public/SVG/Logo";
import moment from "moment/moment";
import ButtonSecondary from "../buttons/ButtonSecondary";
import UploadSignature from "./UploadSignature";
import UploadImage from "./UploadImage";

export default function OfferFooter() {
	const { userData } = useAuth();
	const { primaryColor } = useLayout();

	const { signature, setsignature, expiration, setexpiration } = useData();

	return (
		<div className='pt-16'>
			<div className='grid grid-cols-2 items-center'>
				<div className='text-sm'>
					<div className='mb-4'>
						<div className='font-medium'>Ponuku vypracoval:</div>
						<div className='text-gray-400'>{userData.name}</div>
					</div>
					<div>
						<div className='font-medium'>Platnosť cenovej ponuky:</div>
						<div className='text-gray-400'>
							{expiration ? (
								<div>
									do {moment(expiration).format("DD.MM.YYYY")} (
									{moment(expiration).diff(moment(), "day") + 1} dní)
								</div>
							) : (
								<div className='text-sm text-gray-400'>Vyberte platnosť:</div>
							)}
							<div className='flex gap-1 mt-4'>
								<ButtonSecondary
									onClick={() => {
										setexpiration(moment().add(7, "days"));
									}}
								>
									7 dní
								</ButtonSecondary>

								<ButtonSecondary
									onClick={() => {
										setexpiration(moment().add(14, "days"));
									}}
								>
									14 dní
								</ButtonSecondary>
								<ButtonSecondary
									onClick={() => {
										setexpiration(moment().add(30, "days"));
									}}
								>
									30 dní
								</ButtonSecondary>
								<ButtonSecondary
									onClick={() => {
										setexpiration(moment().add(3, "months"));
									}}
								>
									3 mesiace
								</ButtonSecondary>
							</div>
						</div>
					</div>
				</div>
				<div className='ml-auto'>
					{/* <img
						src="/static/podpis.jpg"
						className="max-w-[200px] h-full"
						alt=""
					/> */}
					<UploadImage
						onUpload={(url) => {
							setsignature(url);
						}}
						defaultPreview={signature}
						placeholder='Nahrať podpis'
						height={160}
						width={250}
						imageId='signature'
					/>
				</div>
			</div>

			<div className='flex items-center justify-center mt-16 flex-col'>
				<div className='flex items-baseline gap-2 justify-center'>
					<div className='text-xs'>Vytvorené pomocou aplikácie </div>
					<div className='w-16'>
						<Logo color={primaryColor}></Logo>
					</div>
				</div>
				<div className='text-xs mt-1 text-gray-400'>nacento.online</div>
			</div>
		</div>
	);
}
