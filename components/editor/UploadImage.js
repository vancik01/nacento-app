import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { storage } from "../../lib/firebase";
import Close from "../../public/SVG/Close";
import ButtonPrimary from "../buttons/ButtonPrimary";
import ButtonSecondary from "../buttons/ButtonSecondary";

export default function UploadImage({
	onUpload,
	placeholder,
	width,
	height,
	defaultPreview,
}) {
	const [file, setfile] = useState(null);
	const [preview, setpreview] = useState();
	const [loading, setloading] = useState(false);
	const [uploaded, setuploaded] = useState(false);
	const { user, userData } = useAuth();

	useEffect(() => {
		if (defaultPreview) {
			setpreview(defaultPreview);
			setuploaded(true);
			setloading(false);
		} else {
			setpreview(null);
			setuploaded(false);
		}
	}, [defaultPreview]);

	function handleChange(e) {
		if (e.target.files[0]) {
			setpreview(URL.createObjectURL(e.target.files[0]));
			setfile(e.target.files[0]);
			setuploaded(false);
			//console.log(e.target.files[0]);
		} else {
			setpreview(null);
			setfile(null);
			setuploaded(false);
		}
	}

	function reset() {
		setfile(null);
		setpreview(null);
		setuploaded(false);
		onUpload("");
	}

	function uploadImage() {
		setloading(true);
		const storageRef = ref(storage, `/users/${user.uid}/${file.name}`);
		uploadBytes(storageRef, file).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {
				onUpload(url);
				console.log(url, "URL");
				setloading(false);
				setuploaded(true);
			});
		});
	}
	const id = _.uniqueId("image");

	return (
		<div>
			<input
				id={id}
				onChange={handleChange}
				type='file'
				className='hidden'
			></input>
			{!preview && (
				<label htmlFor={id}>
					<div
						style={{ width: width, height: height }}
						className='text-lg border border-gray-300 border-dashed flex justify-center items-center hover:bg-gray-100 transition-all'
					>
						{placeholder}
					</div>
				</label>
			)}

			{preview && (
				<div className='relative w-fit'>
					<img
						src={preview}
						alt=''
						style={{ maxHeight: height }}
						onLoad={() => {
							setloading(false);
						}}
					/>

					<button onClick={reset} className='absolute -top-2 -right-2'>
						<Close color={"red"}></Close>
					</button>

					{loading && (
						<div className='bg-white bg-opacity-70 top-0 left-0 right-0 bottom-0 absolute'>
							<div className='h-full w-full flex justify-center items-center'>
								<svg
									height={4}
									width={4}
									className='spinner'
									viewBox='0 0 50 50'
								>
									<circle
										className='path'
										cx='25'
										cy='25'
										r='20'
										fill='none'
										strokeWidth='3'
									></circle>
								</svg>
							</div>
						</div>
					)}
				</div>
			)}
			{preview && !uploaded && (
				<div className='flex items-center gap-4'>
					<ButtonPrimary onClick={uploadImage}>Uložiť</ButtonPrimary>
				</div>
			)}
		</div>
	);
}
