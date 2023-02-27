import React from "react";
import { useData } from "../../context/AppWrap";

export default function TestElement() {
	const { test } = useData();
	return (
		<div
			className="w-40 h-40 bg-white shadow-2xl absolute"
			style={{ left: test.x, top: test.y }}
		>
			Test
		</div>
	);
}
