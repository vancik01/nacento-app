import React from "react";

function CheckMark({ color }) {
	const colors = {
		red: "#ff0000",
		green: "green",
	};

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 52 52"
			className="checkmark h-[32px] w-[32px]"
		>
			<circle className="checkmark__circle" cx="26" cy="26" r="25" />
			<path
				className="checkmark__check"
				fill="none"
				d="M14.1 27.2l7.1 7.2 16.7-16.8"
			/>
		</svg>
	);
}

export default CheckMark;
