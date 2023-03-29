import React, { useEffect, useState } from "react";
import { useData } from "../context/AppWrap";
import { useLayout } from "../context/LayoutContext";

export default function A4({ children }) {
	const { styles, isHorizontal } = useLayout();
	const [margin, setmargin] = useState(0);

	return (
		<div
			style={{ width: isHorizontal ? "1254px" : "894px", minHeight: 1260 }}
			className="mx-auto shadow-xl h-fit w-fit transition-all"
			id="a4-page"
		>
			{children}
		</div>
	);
}
