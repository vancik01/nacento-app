import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ButtonIcon({ icon, children, onClick }) {
	const [hover, sethover] = useState(false);
	return (
		<motion.button
			whileTap={{ scale: 0.7 }}
			onHoverStart={() => {
				sethover(true);
			}}
			onHoverEnd={() => {
				sethover(false);
			}}
			onClick={onClick}
			className="flex items-center gap-1 rounded-md bg-white hover:bg-gray-100 py-[4px] px-[6px] text-gray-400 transition-all"
		>
			{icon}
			<div className="text-xs whitespace-nowrap ">{children}</div>
		</motion.button>
	);
}
