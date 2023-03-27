import React from "react";
import { useLayout } from "../context/LayoutContext";
import { motion } from "framer-motion";
import { Link } from "@mui/material";
import { useRouter } from "next/router";

export default function ButtonPrimary({
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

	if (typeof layout !== "undefined") {
		const { primaryColor } = useLayout();
		color = primaryColor;
	} else {
		color = "#361CC1";
	}

	return (
		<motion.button
			whileHover={{
				y: 0,

				transition: { duration: 0.2, ease: "easeInOut" },
			}}
			whileTap={{ scale: 0.9 }}
			className={`text-white text-sm font-normal transition-colors py-[5px] px-[8px] rounded-md  disabled:!bg-gray-300 ${
				className ? className : ""
			}`}
			style={{
				backgroundColor: color,
				boxShadow:
					"rgba(50, 50, 93, 0.12) 0px 13px 27px -5px, rgba(0, 0, 0, 0.1) 0px 8px 16px -8px",
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
				{icon && iconBefore && <div className="mr-1"> {icon}</div>}
				<div>
					{href && (
						<div>
							<span className="no-underline text-white whitespace-nowrap">
								{children}
							</span>
						</div>
					)}

					{!href && <span className="whitespace-nowrap ">{children}</span>}
				</div>
				{icon && iconAfter && <div className="ml-1">{icon}</div>}
			</div>
		</motion.button>
	);
}
