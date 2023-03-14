import { collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { customBuild } from "../../data";
import { firestore } from "../../lib/firebase";
import IconHome from "../../public/SVG/dashboard/IconHome";
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
		<div className=" flex items-center justify-start gap-8">
			<AddEmpty
				text="Prázdna cenová ponuka"
				subtext="Začnite od nuly"
				color="#73A496"
			></AddEmpty>
			<AddButton
				text="Interaktívna cenová ponuka"
				subtext="Zadajte len parametre stavby"
			></AddButton>
		</div>
	);
}

function AddButton({ text, subtext, color, onClick }) {
	return (
		<button
			onClick={onClick}
			className="py-3 px-3 border rounded-md flex items-center justify-center gap-2 text-start hover:bg-gray-50 transition-all"
		>
			<IconHome color={color}></IconHome>
			<div>
				<div className="text-sm font-regular">{text}</div>
				<div className="text-xs font-light text-gray-400">{subtext}</div>
			</div>

			<div className="ml-8">
				<Plus></Plus>
			</div>
		</button>
	);
}

function AddEmpty({ text, subtext, color }) {
	const { user } = useAuth();
	const router = useRouter();
	const [display, setdisplay] = useState(false);
	const [title, settitle] = useState("");
	const [error, seterror] = useState("");

	function createEmpty() {
		seterror("");
		if (title == "") {
			seterror("Zadajte názov");
			return;
		}
		const collectionRef = doc(collection(firestore, "/offers"));
		//customBuild variable empty template
		setDoc(collectionRef, {
			id: collectionRef.id,
			data: customBuild,
			name: title,
			created: moment().valueOf(),
			userId: user != null ? user.uid : "none",
		})
			.then((response) => {
				// router.push(`/cenova-ponuka/${collectionRef.id}`);
				localStorage.setItem("offerId", collectionRef.id);
				router.push(`/cenova-ponuka/`);
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
		<div className="relative">
			<button
				onClick={() => {
					setdisplay(true);
				}}
				className=" py-3 px-3 border rounded-md flex items-center justify-center gap-2 text-start hover:bg-gray-50 transition-all"
			>
				<IconHome color={color}></IconHome>
				<div>
					<div className="text-sm font-regular">{text}</div>
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
