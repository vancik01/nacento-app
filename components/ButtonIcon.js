import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function ButtonIcon({ icon, children, onClick, tooltip, id }) {
	const [hover, sethover] = useState(false);

	return (
		<>
			{tooltip && (
				<Tooltip
					id={`tooltip`}
					anchorSelect={`#button-icon-${id}`}
					place="bottom"
					content={tooltip}
					delayHide={3}
				/>
			)}
			<motion.button
				id={`button-icon-${id}`}
				whileTap={{ scale: 0.7 }}
				onHoverStart={() => {
					sethover(true);
				}}
				onHoverEnd={() => {
					sethover(false);
				}}
				onClick={onClick}
				className="flex items-center gap-1 rounded-md  hover:bg-gray-100 py-[4px] px-[6px] text-gray-400 transition-all"
			>
				{icon}
				{children && (
					<div className="text-xs whitespace-nowrap">{children}</div>
				)}
			</motion.button>
		</>
	);
}
