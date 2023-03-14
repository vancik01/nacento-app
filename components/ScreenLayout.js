import { AnimatePresence } from "framer-motion";
import { AnimateSharedLayout } from "framer-motion";
import React, { useEffect } from "react";
import { useData } from "../context/AppWrap";
import { useLayout } from "../context/LayoutContext";
import CenovaPonuka from "./CenovaPonuka";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import OpenSidebar from "../public/SVG/OpenSidebar";
import BottomBar from "./BottomBar";
import EditorHeader from "./EditorHeader";
import { toast } from "react-toastify";

export default function ScreenLayout() {
	const { displaySidebar, setdisplaySidebar, loading } = useData();
	return (
		<>
			<div>
				<div className="grid" style={{ gridTemplateColumns: "auto 1fr" }}>
					<div
						className="w-fit relative h-screen transition-all"
						style={{ width: displaySidebar ? 300 : 0 }}
					>
						<AnimatePresence mode="wait" initial={false}>
							{displaySidebar && (
								<motion.div
									key={"sidebar"}
									className="fixed z-50"
									initial={{ x: -300, width: 0 }}
									animate={{ x: 0, width: 300 }}
									exit={{ x: -300, width: 0 }}
								>
									<Sidebar></Sidebar>
								</motion.div>
							)}
							{!displaySidebar && <div></div>}

							{!displaySidebar && (
								<motion.button
									initial={{ x: -50 }}
									animate={{ x: 0 }}
									onClick={() => {
										setdisplaySidebar(!displaySidebar);
									}}
									className="fixed bottom-28 p-3 left-0 z-10 bg-white shadow-lg"
								>
									<div className="w-6 ">
										<OpenSidebar></OpenSidebar>
									</div>
								</motion.button>
							)}
						</AnimatePresence>
					</div>

					<div>
						<AnimatePresence>
							{
								<div className="z-10 fixed left-0 right-0 bottom-0 transition-all">
									<BottomBar></BottomBar>
								</div>
							}
						</AnimatePresence>

						<EditorHeader></EditorHeader>
						<CenovaPonuka></CenovaPonuka>
					</div>
				</div>
			</div>
		</>
	);
}
