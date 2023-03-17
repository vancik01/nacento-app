import { useRouter } from "next/router";
import React, { useState } from "react";
import ArrowDown from "../../public/SVG/ArrowDown";
import AllProjects from "../../public/SVG/editor/AllProjects";
import AddNewProject from "../../public/SVG/editor/AddNewProject";
import RecentClock from "../../public/SVG/editor/RecentClock";
import { useData } from "../../context/AppWrap";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export default function SelectProjectToolbar() {
	const [hover, sethover] = useState(false);
	const router = useRouter();

	function handleSelect() {
		localStorage.removeItem("offerId");
		router.push("/dashboard");
	}
	const { name } = useData();

	return (
		<motion.div
			onHoverStart={() => {
				sethover(true);
			}}
			onHoverEnd={() => {
				sethover(false);
			}}
			className="relative"
		>
			<button>
				<div className="flex justify-start items-center gap-2">
					<div className="font-light text-gray-400">{name}</div>
					<div
						className="transition-all"
						style={{ rotate: hover ? "180deg" : "0deg" }}
					>
						<ArrowDown color={"#C0C0C0"}></ArrowDown>
					</div>
				</div>
			</button>
			<AnimatePresence mode="wait">
				{hover && (
					<motion.div
						key="user-toolbar"
						className="relative"
						initial={{ opacity: 0, y: 10 }}
						exit={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.1 }}
					>
						<div className="pt-4 absolute top-0 left-0">
							<div
								key="login-toolbar"
								className=" shadow-hardShadow bg-white rounded-md"
							>
								<div className="py-4 px-3 w-64 min-h-[200px]">
									<MenuItem onClick={handleSelect}>
										<div className="flex justify-between items-center gap-3 text-base font-light">
											<AllProjects></AllProjects>
											<div>Zobraziť všetky</div>
										</div>
									</MenuItem>

									<MenuItem href="/dashboard">
										<div className="flex justify-between items-center gap-3 text-base font-light">
											<AddNewProject></AddNewProject>
											<div>Pridať nový</div>
										</div>
									</MenuItem>

									<div className="w-full h-[1px] bg-gray-200 mt-2"></div>

									<div className="flex justify-start items-center gap-2 mt-4">
										<RecentClock></RecentClock>
										<div className="text-xs font-medium">Nedávne</div>
									</div>

									<div className="flex flex-col mt-2">
										{Array(4)
											.fill()
											.map((project, projectId) => {
												return (
													<MenuItem
														href={""}
														className="text-start text-sm font-light"
													>
														<div>Ponuka{projectId + 1}</div>
													</MenuItem>
												);
											})}
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}

function MenuItem({ href, className, onClick, children }) {
	const router = useRouter();
	return (
		<button
			onClick={
				onClick
					? onClick
					: () => {
							router.push(href);
					  }
			}
			className={`${className ? className : ""} mb-3`}
		>
			{children}
		</button>
	);
}
