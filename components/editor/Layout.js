import React from "react";

export default function Layout({ children, className }) {
	return (
		<>
			<div
				className={`px-8 sm:px-8 lg:px-16 mx-auto lg:max-w-[1500px] max-w-7xl  ${
					className ? className : ""
				}`}
			>
				{children}
			</div>
		</>
	);
}
