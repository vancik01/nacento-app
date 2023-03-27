import React from "react";
import { useLayout } from "../../context/LayoutContext";
import { motion } from "framer-motion";
import { Link } from "@mui/material";
import { useRouter } from "next/router";

export default function ButtonSecondary({
	children,
	className,
	onClick,
	scale,
	disabled,
	href,
	color,
	onKeyDown,
	icon,
	iconBefore,
	iconAfter,
}) {
	const layout = useLayout();
	const router = useRouter();

	if (!color) color = layout?.primaryColor;

	return (
		<motion.button
			whileHover={{
				y: 0,

				transition: { duration: 0.2, ease: "easeInOut" },
			}}
			whileTap={{ scale: 0.9 }}
			className={`text-gray-700 border-[0.7px] text-sm font-normal transition-colors py-[5px] px-[8px] rounded-md  disabled:!bg-gray-300 ${
				className ? className : ""
			}`}
			style={{
				backgroundColor: "white",
				boxShadow:
					"rgba(50, 50, 93, 0.15) 0px 2px 5px -1px, rgba(0, 0, 0, 0.13) 0px 1px 3px -1px",
			}}
			onClick={
				onClick
					? onClick
					: () => {
							router.push(href);
					  }
			}
			onKeyDown={onKeyDown}
			disabled={disabled}
		>
			<div className="flex items-center justify-center w-full">
				{icon && iconBefore && <div className="mr-2"> {icon}</div>}
				<div>{children}</div>
				{icon && iconAfter && <div className="ml-2"> {icon}</div>}
			</div>
		</motion.button>
	);
}
