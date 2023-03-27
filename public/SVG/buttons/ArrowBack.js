import React from "react";

export default function ArrowBack({ color }) {
	if (!color) color = "white";
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 14 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M5.00008 8.33329L1.66675 4.99996L5.00008 1.66663"
				stroke={color}
				stroke-width="1.33333"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M12.3334 12.3333V7.66667C12.3334 6.95942 12.0525 6.28115 11.5524 5.78105C11.0523 5.28095 10.374 5 9.66675 5H1.66675"
				stroke={color}
				stroke-width="1.33333"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
