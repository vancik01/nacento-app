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
	useEffect(() => {
		setTimeout(() => {
			toast("wocap", { autoClose: 3000, type: "info" });
		}, 1000);
	}, []);

	const { displaySidebar, setdisplaySidebar, loading } = useData();
	return (
		<>
			{!loading && (
				<div>
					<div className="grid" style={{ gridTemplateColumns: "auto 1fr" }}>
						<div
							className="w-fit relative h-screen transition-all"
							style={{ width: displaySidebar ? 300 : 0 }}
						>
							<AnimatePresence mode="wait">
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
									<motion.div
										initial={{ y: "100%" }}
										exit={{ y: "100%" }}
										animate={{ y: 0 }}
										className="z-10 fixed left-0 right-0 bottom-0 transition-all"
										style={{ marginLeft: displaySidebar ? 300 : 0 }}
									>
										<BottomBar></BottomBar>
									</motion.div>
								}
							</AnimatePresence>
							<EditorHeader></EditorHeader>
							<CenovaPonuka></CenovaPonuka>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
