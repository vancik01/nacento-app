import React from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import ButtonSecondary from "../buttons/ButtonSecondary";
import { useAuth } from "../../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function SaveImageAsTemplate({
	title,
	description,
	imageId,
	imageURL,
	handleClose,
	sucessMessage,
}) {
	const { userData, user } = useAuth();

	function handleSave() {
		const docRef = doc(firestore, `users/${user.uid}`);
		updateDoc(docRef, {
			[`images.${imageId}`]: imageURL,
			// images: {
			// 	[imageId]: imageURL,
			// },
		}).then(() => {
			toast(sucessMessage, { type: "success" });
			handleClose();
		});
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			exit={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className='absolute right-0 p-4 shadow-hardShadow rounded-md bg-white z-[100] mt-2'
		>
			<div className='whitespace-nowrap mb-2'>{title}</div>
			<p className='text-xs'>{description}</p>

			<ButtonPrimary onClick={handleSave} className='mt-4'>
				Uložiť
			</ButtonPrimary>
			<ButtonSecondary onClick={handleClose} className='mt-4 ml-4'>
				Nie
			</ButtonSecondary>
		</motion.div>
	);
}
