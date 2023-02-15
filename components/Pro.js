import React from "react";
import { useLayout } from "../context/LayoutContext";

export default function Pro({ color }) {
	const { primaryColor } = useLayout();
	return (
		<div
			className="px-2 py-[2px]  rounded-md text-[10px] w-fit"
			style={{ backgroundColor: `${primaryColor}3b`, color: primaryColor }}
		>
			Pro
		</div>
	);
}
