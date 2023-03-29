import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { motion } from "framer-motion";
import ButtonSecondary from "../buttons/ButtonSecondary";
import Next from "../../public/SVG/user_setup/Next";
import { useData } from "../../context/AppWrap";
import { useAuth } from "../../context/AuthContext";
import { useLayout } from "../../context/LayoutContext";

export default function LayoutTemplates() {
	const [error, seterror] = useState("");
	const [title, settitle] = useState("");
	const [display, setdisplay] = useState(false);
	const { userData } = useAuth();
	const { saveLayoutTemplate, setLayout } = useLayout();
	function close() {
		settitle("");
		setdisplay(false);
	}

	function handleSave() {
		saveLayoutTemplate(title);
		close();
	}

	function handleSelect(layout) {
		setLayout(layout);
	}

	return (
		<div className="w-full">
			<div className="flex flex-col gap-4">
				{userData?.layoutTemplate?.map((temp) => {
					return (
						<button
							onClick={() => {
								handleSelect(temp);
							}}
							className="flex items-center gap-3 p-1 hover:bg-gray-100 rounded-md"
						>
							<div
								className="w-6 aspect-square rounded-md"
								style={{ backgroundColor: temp.primaryColor }}
							></div>
							<div>{temp.name}</div>
						</button>
					);
				})}
				{!userData.layoutTemplate && (
					<div className="text-sm text-gray-400">Zatial žiadne šablóny</div>
				)}
			</div>
			<div className="relative w-full mt-4">
				<div className="flex justify-start">
					<ButtonPrimary
						className={"w-fit"}
						onClick={() => {
							setdisplay(true);
						}}
					>
						Nová šablóna
					</ButtonPrimary>
				</div>
				<AnimatePresence>
					{display && (
						<motion.div
							initial={{ opacity: 0, y: 1 }}
							exit={{ opacity: 0, y: 1 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.1 }}
							key="create-empty-modal"
							className="absolute shadow-hardShadow z-50 -left-0 mt-2 p-3 bg-white  rounded-sm"
						>
							<input
								onChange={(e) => {
									settitle(e.target.value);
								}}
								className="p-2 bg-gray-100"
								autoFocus
								placeholder="Názov šablóny..."
							></input>
							{error && (
								<div className="text-sm text-red-500 mt-1">{error}</div>
							)}
							<div className="flex items-center gap-2 mt-4">
								<ButtonPrimary
									onClick={handleSave}
									className=""
									icon={<Next></Next>}
									iconAfter
								>
									Vytvoriť šabónu
								</ButtonPrimary>
								<ButtonSecondary onClick={close} className="">
									Zrušiť
								</ButtonSecondary>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
