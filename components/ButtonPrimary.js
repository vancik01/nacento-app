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
	const layout = useLayout();

	if (!color) color = layout?.primaryColor;

	return (
		<motion.button
			whileHover={{
				scale: scale ? scale : 0.95,
				boxShadow:
					"rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
				transition: { duration: 0.4, ease: "circOut" },
			}}
			whileTap={{ scale: 0.9 }}
			className={`text-white transition-colors py-1 px-4 font-medium disabled:!bg-gray-300 rounded-sm ${
				className ? className : ""
			}`}
			style={{
				backgroundColor: color,
				boxShadow:
					"rgba(50, 50, 93, 0.12) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
			}}
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
