import React from "react";
import { motion } from "framer-motion";

export default function ButtonTag({ onClick, children, color }) {
	return (
		<div>
			<motion.button
				whileTap={{
					scale: 0.85,
				}}
				onClick={onClick}
				style={{
					background: color,
					boxShadow:
						"0px 0px 2px rgb(0 0 0 / 17%), 0px 2px 2px rgb(19 19 19 / 20%)",
				}}
				className={`${
					color ? "" : "bg-row-header"
				}  text-white bg-opacity-70 w-fit px-[4px] py-[3px] text-xs rounded-md`}
			>
				{children}
			</motion.button>
		</div>
	);
}
