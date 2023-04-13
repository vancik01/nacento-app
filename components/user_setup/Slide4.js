import React, { useEffect, useState } from "react";
import { useSetup } from "../../pages/user-setup";
import UploadImage from "../editor/UploadImage";

export default function Slide4() {
	const { userObject, setuserObject, setallowNext } = useSetup();

	setallowNext(true);

	function uploadLogo(url) {
		var newData = { ...userObject };
		newData.images.logo = url;
	}

	function uploadLogo(url) {
		var newData = { ...userObject };
		newData.images.logo = url;
		setuserObject(newData);
	}

	function uploadSignature(url) {
		var newData = { ...userObject };
		newData.images.signature = url;
		setuserObject(newData);
	}

	return (
		<div className='w-full'>
			<h1 className='text-4xl text-center mb-10'>Nahrajte Vaše logo</h1>
			<div className='flex justify-center items-center flex-col gap-10'>
				<UploadImage
					defaultPreview={userObject?.images?.logo}
					width={200}
					height={80}
					placeholder='Nahrať logo'
					onUpload={(url) => {
						uploadLogo(url);
					}}
				></UploadImage>

				<UploadImage
					defaultPreview={userObject?.images?.signature}
					width={300}
					height={120}
					placeholder='Nahrať Pečiatku a podpis'
					onUpload={(url) => {
						uploadSignature(url);
					}}
				></UploadImage>
			</div>
			<div className='mt-10'></div>
		</div>
	);
}
