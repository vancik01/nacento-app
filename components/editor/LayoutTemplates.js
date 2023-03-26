import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import ButtonPrimary from "../ButtonPrimary";
import { motion } from "framer-motion";
import ButtonSecondary from "../ButtonSecondary";
import Next from "../../public/SVG/user_setup/Next";

export default function LayoutTemplates() {
	const [error, seterror] = useState("");
	const [title, settitle] = useState("");
	const [display, setdisplay] = useState(false);
	function close() {
		settitle("");
		setdisplay(false);
	}

	function handleSave() {
		close();
	}

	return (
		<div className="relative">
			<ButtonPrimary
				onClick={() => {
					setdisplay(true);
				}}
			>
				Uložiť template
			</ButtonPrimary>
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
								onClick={handleSave}
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
