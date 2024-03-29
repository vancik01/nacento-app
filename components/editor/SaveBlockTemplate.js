import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import Copy from "../../public/assets/buttons/Copy";
import ButtonIcon from "../buttons/ButtonIcon";
import { motion } from "framer-motion";
import ButtonPrimary from "../buttons/ButtonPrimary";
import ButtonSecondary from "../buttons/ButtonSecondary";
import Next from "../../public/assets/user_setup/Next";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function SaveBlockTemplate({ block }) {
	const [display, setdisplay] = useState(false);
	const [title, settitle] = useState(block.info.title);
	const [error, seterror] = useState("");
	const [loading, setloading] = useState(false);
	const { user } = useAuth();

	function close() {
		setdisplay(false);
		settitle("");
	}

	useEffect(() => {
		if (display) settitle(block.info.title);
	}, [block]);

	async function saveTemplate() {
		const docRef = doc(firestore, `/users/${user.uid}/templates/default`);
		setloading(true);
		const check = await getDoc(docRef);

		block.info.title = title;
		if (check.exists()) {
			await updateDoc(docRef, {
				data: [
					...check.data().data,
					{
						type: "block",
						data: block,
					},
				],
			});
		} else {
			await setDoc(docRef, {
				data: [
					{
						type: "block",
						data: block,
					},
				],
			});
		}

		toast("Dáta sa uložili", { type: "success" });
		close();
		setloading(false);
	}

	return (
		<div className="relative">
			<ButtonIcon
				onClick={() => {
					setdisplay(!display);
				}}
				icon={<Copy />}
			>
				Uložiť blok
			</ButtonIcon>
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
							value={title}
							className="p-2 bg-gray-100"
							autoFocus
							placeholder="Zadajte názov..."
						></input>
						{error && <div className="text-sm text-red-500 mt-1">{error}</div>}
						<div className="flex items-center gap-2 mt-4">
							<ButtonPrimary
								onClick={saveTemplate}
								className=""
								icon={<Next></Next>}
								iconAfter
								loading={loading}
							>
								Uložiť blok
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
