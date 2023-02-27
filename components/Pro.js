import { hexToRgb } from "@mui/material";
import React from "react";
import { useLayout } from "../context/LayoutContext";
import { hexToHSL } from "../lib/helpers";

export default function Pro({ color }) {
	const layout = useLayout();

	if (layout) color = layout.primaryColor;
	else {
		color = "#006f85";
	}

	var hsl = hexToHSL(color);
	hsl.l = 95;
	return (
		<div
			className="px-2 py-[2px]  rounded-md text-[10px] w-fit"
			style={{
				backgroundColor: `hsl(${hsl.h}deg ${hsl.s}% ${hsl.l}%)`,
				color: color,
			}}
		>
			Pro
		</div>
	);
}
