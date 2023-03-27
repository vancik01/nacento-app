import React from "react";

export default function ButtonLoading({
	onClick,
	className,
	children,
	loading,
}) {
	return (
		<button
			className={`w-full py-2 rounded-sm border border-gray-200 hover:bg-gray-50 transition-all ${
				className ? className : ""
			}`}
			onClick={onClick}
			disabled={loading}
		>
			{!loading && children}
			{loading && (
				<div className="w-full h-full flex items-center justify-center">
					<svg
						height={7}
						width={7}
						style={{ width: 15, height: 15, fill: "red" }}
						className="spinner"
						viewBox="0 0 50 50"
					>
						<circle
							className="path"
							cx="25"
							cy="25"
							r="20"
							fill="none"
							strokeWidth="3"
							style={{ stroke: "#929395" }}
						></circle>
					</svg>
				</div>
			)}
		</button>
	);
}
