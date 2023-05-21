import { AnimatePresence } from "framer-motion";
import React from "react";
import { useData } from "../../context/AppWrap";
import CenovaPonuka from "./CenovaPonuka";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import OpenSidebar from "../../public/assets/editor/OpenSidebar";
import EditorHeader from "./EditorHeader";
import TemplateGallery from "../template_gallery/TemplateGallery";
import TemplateContext from "../template_gallery/TemplateContext";

export default function ScreenLayout() {
	const { displaySidebar, setdisplaySidebar, loading, openTemplate } =
		useData();
	return (
		<>
			<div>
				<div className='grid' style={{ gridTemplateColumns: "auto 1fr" }}>
					<div
						className='w-fit relative h-screen transition-all'
						style={{ width: displaySidebar ? 300 : 0 }}
					>
						<AnimatePresence mode='wait' initial={false}>
							{displaySidebar && (
								<motion.div
									key={"sidebar"}
									className='fixed z-50'
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
									className='fixed bottom-28 p-3 left-0 z-10 bg-white shadow-lg'
								>
									<div className='w-6 '>
										<OpenSidebar></OpenSidebar>
									</div>
								</motion.button>
							)}
						</AnimatePresence>
					</div>

					<div>
						<AnimatePresence>
							{openTemplate && (
								<TemplateContext>
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.1 }}
										className='fixed inset-0 bg-black bg-opacity-60 z-[200] flex justify-center items-center'
									>
										<TemplateGallery></TemplateGallery>
									</motion.div>
								</TemplateContext>
							)}
						</AnimatePresence>

						<EditorHeader></EditorHeader>
						<CenovaPonuka></CenovaPonuka>
					</div>
				</div>
			</div>
		</>
	);
}
