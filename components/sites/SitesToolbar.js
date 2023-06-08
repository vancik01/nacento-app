import { collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { customBuild } from "../../lib/data";
import { firestore } from "../../lib/firebase";

import AddOffer from "../../public/assets/dashboard/AddOffer";
import JsonOffer from "../../public/assets/dashboard/JsonOffer";
import FullPageLoading from "../loading/FullPageLoading";

import Plus from "../../public/assets/dashboard/Plus";
import moment from "moment/moment";
import ButtonPrimary from "../buttons/ButtonPrimary";
import ButtonSecondary from "../buttons/ButtonSecondary";
import Next from "../../public/assets/user_setup/Next";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import ExcelIcon from "../../public/assets/excelEditor/ExcelIcon";

import { useExcel } from "../../context/ExcelContext";
import PopUp from "../general/PopUp";
import { TextField } from "@mui/material";


export default function SitesToolbar() {
	return (
		<div className='flex flex-col w-fit sm:flex-row gap-2 sm:gap-8 overflow-y-auto'>
			<AddEmpty
				text='Nová stavba'
				subtext='Vytvorte novú stavbu'
				color='#73A496'
			></AddEmpty>
		</div>
	);
}

function AddEmpty({ text, subtext, color }) {
	const { user } = useAuth();
	const router = useRouter();
	const [display, setdisplay] = useState(false);
	const [title, settitle] = useState("");
	const [loading, setloading] = useState(false);

	const [description, setDescription] = useState("");
	const [location, setLocation] = useState("");
	const [error, setError] = useState("");

	const [openPopup, setopenPopup] = useState(false);


	const emojis = ["🔨", "🏗️", "🚧", "🏢", "🧱", "🛠️"]

	const randomIndex = Math.floor(Math.random() * emojis.length);
	const emoji = emojis[randomIndex];


	function createEmpty() {
		setopenPopup(true);
		// setloading(true);
		// const collectionRef = doc(collection(firestore, "/offers"));
		// //customBuild variable empty template
		// setDoc(collectionRef, {
		// 	id: collectionRef.id,
		// 	name: "Nová cenová ponuka",
		// 	created: moment().valueOf(),
		// 	userId: user != null ? user.uid : "none",
		// 	totals: {
		// 		total_delivery_price: 0,
		// 		total_construction_price: 0,
		// 		total: 0,
		// 	},
		// 	lastModified: moment().valueOf(),
		// })
		// 	.then((response) => {
		// 		router.push(`/stavba/${collectionRef.id}`);
		// 		//setloading(false);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	}

	function close() {
		setdisplay(false);
		settitle("");
	}

	function handleSubmit(){
		if(!description){
			setError("Zadajte popis stavby")
			return;
		}
		
		if(!location){
			setError("Zadajte lokáciu")
			return;
		}
	}

	return (
		<div className=''>
			<FullPageLoading loading={loading}></FullPageLoading>
			<button
				onClick={() => {
					//setdisplay(true);
					createEmpty();
				}}
				className='w-full py-3 px-3 cursor-default border rounded-md flex items-center justify-between sm:justify-center gap-2 text-start trans hover:bg-gray-100 transition-all'
			>
				{/* <IconHome color={color}></IconHome> */}
				<AddOffer color={color}></AddOffer>
				<div>
					<div className='text-xs md:text-sm font-regular'>{text}</div>
					<div className='text-xs font-light text-gray-400'>{subtext}</div>
				</div>

				<div className='ml-8'>
					<Plus></Plus>
				</div>
			</button>
			<AnimatePresence>
				{display && (
					<motion.div
						initial={{ opacity: 0, y: 1 }}
						exit={{ opacity: 0, y: 1 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.1 }}
						key='create-empty-modal'
						className='absolute shadow-hardShadow z-30 mt-2 p-3 bg-white min-w-[300px] rounded-sm'
					>
						<input
							onChange={(e) => {
								settitle(e.target.value);
							}}
							className='p-2 bg-gray-100'
							autoFocus
							placeholder='Zadajte názov...'
						></input>
						{error && <div className='text-sm text-red-500 mt-1'>{error}</div>}
						<div className='flex items-center gap-2 mt-4'>
							<ButtonPrimary
								onClick={createEmpty}
								className=''
								icon={<Next></Next>}
								iconAfter
							>
								Vytvoriť ponuku
							</ButtonPrimary>
							<ButtonSecondary onClick={close} className=''>
								Zrušiť
							</ButtonSecondary>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<PopUp title={"Pridať stavbu"} open={openPopup} setOpen={setopenPopup}>
						
			<form onSubmit={handleSubmit} className='ml-1'>
       		 	<div className='flex flex-col gap-2 my-5'>

					<TextField 
					label='🖊️ Popis stavby' 
					type='title' 
					value={description} 
					onChange={e => setDescription(e.target.value)}
					required
					/>

					<TextField 
					label='📌 Lokácia' 
					type='location' 
					value={location} 
					onChange={e => setLocation(e.target.value)}
					required
					/>

				</div>

				{error && <p>*{error}</p>}

				<button>
					<ButtonSecondary type={"submit"}>
							Pridať
					</ButtonSecondary>
				</button>

			</form>

			</PopUp>
		</div>
	);
}
