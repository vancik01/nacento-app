import React from "react";

export default function PageIcon({ color }) {
	return (
		<svg
			width="100%"
			height="auto"
			viewBox="0 0 16 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M10.59 0.59C10.21 0.21 9.7 0 9.17 0H2C0.9 0 0 0.9 0 2V18C0 19.1 0.89 20 1.99 20H14C15.1 20 16 19.1 16 18V6.83C16 6.3 15.79 5.79 15.41 5.42L10.59 0.59ZM11 16H5C4.45 16 4 15.55 4 15C4 14.45 4.45 14 5 14H11C11.55 14 12 14.45 12 15C12 15.55 11.55 16 11 16ZM11 12H5C4.45 12 4 11.55 4 11C4 10.45 4.45 10 5 10H11C11.55 10 12 10.45 12 11C12 11.55 11.55 12 11 12ZM9 6V1.5L14.5 7H10C9.45 7 9 6.55 9 6Z"
				fill={color}
			/>
		</svg>
	);
}
