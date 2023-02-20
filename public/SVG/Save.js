import React from "react";

export default function Save({ color }) {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M14.59 0.59C14.21 0.21 13.7 0 13.17 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V4.83C18 4.3 17.79 3.79 17.41 3.42L14.59 0.59ZM9 16C7.34 16 6 14.66 6 13C6 11.34 7.34 10 9 10C10.66 10 12 11.34 12 13C12 14.66 10.66 16 9 16ZM10 6H4C2.9 6 2 5.1 2 4C2 2.9 2.9 2 4 2H10C11.1 2 12 2.9 12 4C12 5.1 11.1 6 10 6Z"
				fill={color}
			/>
		</svg>
	);
}
