import React from "react";
import { useLayout } from "../context/LayoutContext";
import { motion } from "framer-motion";
import { Link } from "@mui/material";

export default function ButtonPrimary({
	children,
	className,
	onClick,
	scale,
	disabled,
	href,
	color,
}) {
	const { primaryColor } = useLayout();
	return (
		<motion.button
			whileHover={{
				scale: scale ? scale : 0.95,
				boxShadow: "none",
				transition: { duration: 0.4, ease: "circOut" },
			}}
			whileTap={{ scale: 0.9 }}
			className={`text-white transition-colors py-1 px-4 font-medium disabled:!bg-gray-300 rounded-sm shadow-xl ${
				className ? className : ""
			}`}
			style={{ backgroundColor: color ? color : primaryColor }}
			onClick={onClick}
			disabled={disabled}
		>
			{href && (
				<div href={href}>
					<Link>{children}</Link>
				</div>
			)}

			{!href && <>{children}</>}
		</motion.button>
	);
}
