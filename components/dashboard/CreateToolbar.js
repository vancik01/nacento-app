import { collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { customBuild } from "../../data";
import { firestore } from "../../lib/firebase";

import IconHome from "../../public/SVG/dashboard/IconHome";
import AddOffer from "../../public/SVG/dashboard/AddOffer";
import InteractiveOffer from "../../public/SVG/dashboard/InteractiveOffer";
import JsonOffer from "../../public/SVG/dashboard/JsonOffer";
import FullPageLoading from "../loading/FullPageLoading";

import Plus from "../../public/SVG/dashboard/Plus";
import moment from "moment/moment";
import { useData } from "../../context/AppWrap";
import ButtonPrimary from "../ButtonPrimary";
import ButtonSecondary from "../ButtonSecondary";
import Next from "../../public/SVG/user_setup/Next";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export default function CreateToolbar() {
	return (
		<div className="flex flex-col sm:flex-row sm:items-center justify-start gap-2 sm:gap-8">
			<AddEmpty
				text="Prázdna cenová ponuka"
				subtext="Začnite od nuly"
				color="#73A496"
			></AddEmpty>
			<AddButton
				text="Rýchla cenová ponuka"
				subtext="Zadajte len parametre stavby"
				color="#1400FF"
			></AddButton>
			<AddFromFile color="#1400FF"></AddFromFile>
		</div>
	);
}

function AddButton({ text, subtext, color, onClick }) {
	const router = useRouter();

	return (
		<button
			onClick={() => {
				router.push(`/dashboard/interactive/`);
			}}
			className="py-3 px-3 cursor-default border rounded-md flex items-center justify-between sm:justify-center gap-2 text-start trans hover:bg-gray-100 transition-all"
		>
			{/* <IconHome color={color}></IconHome> */}
			{/* <InteractiveOffer color={color}></InteractiveOffer> */}
			<InteractiveOffer color={color}></InteractiveOffer>

			<div>
				<div className="text-xs md:text-sm font-regular">{text}</div>
				<div className="text-xs font-light text-gray-400">{subtext}</div>
			</div>

			<div className="ml-8">
				<Plus></Plus>
			</div>
		</button>
	);
}
function AddFromFile({ text, color, onClick }) {
	const [file, setfile] = useState(null);
	const { user } = useAuth();
	const router = useRouter();

	async function createFromFile() {
		const data = await parseJsonFile(file);
		const collectionRef = doc(collection(firestore, "/offers"));
		//customBuild variable empty template
		setDoc(collectionRef, {
			id: collectionRef.id,
			data: data,
			name: "Nová cenová",
			created: moment().valueOf(),
			userId: user != null ? user.uid : "none",
			total: {
				total_delivery_price: 0,
				total_construction_price: 0,
				total: 0,
			},
		})
			.then((response) => {
				router.push(`/cenova-ponuka/${collectionRef.id}`);

				setloading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	async function parseJsonFile(file) {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.onload = (event) => resolve(JSON.parse(event.target.result));
			fileReader.onerror = (error) => reject(error);
			fileReader.readAsText(file);
		});
	}

	async function loadFile(e) {
		console.log(e.target.files[0]);
		setfile(e.target.files[0]);
	}

	return (
		<div className="hidden lg:block">
			<label
				htmlFor="fileInput"
				onClick={onClick}
				className="py-3 px-3 border rounded-md flex items-center border-dashed justify-center gap-2 text-start trans hover:bg-gray-100 transition-all"
			>
				<JsonOffer color={color}></JsonOffer>
				<div>
					<div className="text-sm font-regular">Nahrať zo súboru</div>
					<div className="text-xs font-light text-gray-400">
						{!file ? ".json" : file.name}
					</div>
				</div>

				<div className="ml-8">
					<Plus></Plus>
				</div>
			</label>
			<input
				onChange={loadFile}
				type="file"
				id="fileInput"
				className="hidden"
			/>
			{file && (
				<ButtonPrimary onClick={createFromFile} className="mt-4 absolute">
					Vytvoriť ponuku
				</ButtonPrimary>
			)}
		</div>
	);
}

function AddEmpty({ text, subtext, color }) {
	const { user } = useAuth();
	const router = useRouter();
	const [display, setdisplay] = useState(false);
	const [title, settitle] = useState("");
	const [error, seterror] = useState("");
	const [loading, setloading] = useState(false);

	function createEmpty() {
		// seterror("");
		// if (title == "") {
		// 	seterror("Zadajte názov");
		// 	return;
		// }
		setloading(true);
		const collectionRef = doc(collection(firestore, "/offers"));
		//customBuild variable empty template
		setDoc(collectionRef, {
			id: collectionRef.id,
			data: customBuild,
			name: "Nová cenová ponuka",
			created: moment().valueOf(),
			userId: user != null ? user.uid : "none",
			totals: {
				total_delivery_price: 0,
				total_construction_price: 0,
				total: 0,
			},
			lastModified: moment().valueOf(),
		})
			.then((response) => {
				router.push(`/cenova-ponuka/${collectionRef.id}`);
				setloading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function close() {
		setdisplay(false);
		settitle("");
	}

	return (
		<div className="">
			<FullPageLoading loading={loading}></FullPageLoading>
			<button
				onClick={() => {
					//setdisplay(true);
					createEmpty();
				}}
				className="w-full py-3 px-3 cursor-default border rounded-md flex items-center justify-between sm:justify-center gap-2 text-start trans hover:bg-gray-100 transition-all"
			>
				{/* <IconHome color={color}></IconHome> */}
				<AddOffer color={color}></AddOffer>
				<div>
					<div className="text-xs md:text-sm font-regular">{text}</div>
					<div className="text-xs font-light text-gray-400">{subtext}</div>
				</div>

				<div className="ml-8">
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
						key="create-empty-modal"
						className="absolute shadow-hardShadow z-30 mt-2 p-3 bg-white min-w-[300px] rounded-sm"
					>
						<input
							onChange={(e) => {
								settitle(e.target.value);
							}}
							className="p-2 bg-gray-100"
							autoFocus
							placeholder="Zadajte názov..."
						></input>
						{error && <div className="text-sm text-red-500 mt-1">{error}</div>}
						<div className="flex items-center gap-2 mt-4">
							<ButtonPrimary
								onClick={createEmpty}
								className=""
								icon={<Next></Next>}
								iconAfter
							>
								Vytvoriť ponuku
							</ButtonPrimary>
							<ButtonSecondary onClick={close} className="">
								Zrušiť
							</ButtonSecondary>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
