import React from "react";
import { useData } from "../../context/AppWrap";

export default function SubHeading() {
	const { subHeading, setsubHeading } = useData();
	return (
		<div>
			<input
				value={subHeading}
				onChange={(e) => {
					setsubHeading(e.target.value);
				}}
				className="text-gray-400 p-1 outline-none"
				placeholder="Podnadpis..."
			></input>
		</div>
	);
}
