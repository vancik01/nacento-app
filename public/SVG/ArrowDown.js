import React from "react";

export default function ArrowDown({ color, scale }) {
	if(!scale) scale = 1
	return (
		<svg
			width={`${12*scale}`}
			height={`${8*scale}`}
			viewBox="0 0 12 8"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M2.11997 1.29006L5.99997 5.17006L9.87997 1.29006C10.27 0.900059 10.9 0.900059 11.29 1.29006C11.68 1.68006 11.68 2.31006 11.29 2.70006L6.69997 7.29006C6.30997 7.68006 5.67997 7.68006 5.28997 7.29006L0.699971 2.70006C0.309971 2.31006 0.309971 1.68006 0.699971 1.29006C1.08997 0.910059 1.72997 0.900059 2.11997 1.29006Z"
				fill={color ? color : "black"}
			/>
		</svg>
	);
}
