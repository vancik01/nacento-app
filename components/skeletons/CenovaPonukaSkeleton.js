import React from "react";
import A4 from "../A4";

export default function CenovaPonukaSkeleton() {
	return (
		<div>
			<div className="grid" style={{ gridTemplateColumns: "auto 1fr" }}>
				<div
					className="w-fit relative h-screen transition-all"
					style={{ width: 300 }}
				>
					<div
						key={"sidebar"}
						className="fixed z-50 bg-gray-50 h-screen skeleton"
						initial={{ x: -300, width: 0 }}
						animate={{ x: 0, width: 300 }}
						exit={{ x: -300, width: 0 }}
					>
						<div className="w-[300px]"></div>
					</div>
				</div>

				<div>
					<div className="">
						<nav className="h-32 flex items-center px-10">
							<div className="flex justify-between items-center w-full">
								<div className="h-10 bg-grey w-44 bg-gray-50 skeleton rounded-md"></div>
								<div className="h-10 bg-grey w-44 bg-gray-50 skeleton rounded-md"></div>
							</div>
						</nav>
					</div>
					{/* <EditorHeader></EditorHeader>
					<CenovaPonuka></CenovaPonuka> */}
					<div
						style={{
							width: "894px",
							minHeight: 1260,
						}}
						className="mx-auto shadow-xl h-fit w-fit transition-all mt-10"
						id="a4-page"
					>
						<div className="w-full h-20 skeleton"></div>
						<div className="grid grid-cols-3 mt-20 mx-10 gap-10">
							<div>
								<div className="h-8 w-full skeleton rounded-sm"></div>
								<div className="h-4 w-8/12 skeleton rounded-sm mt-4"></div>
							</div>
							<div>
								<div className="h-8 w-full skeleton rounded-sm"></div>
								<div className="h-4 w-8/12 skeleton rounded-sm mt-4"></div>
								<div className="h-4 w-8/12 skeleton rounded-sm mt-4"></div>
								<div className="h-4 w-8/12 skeleton rounded-sm mt-4"></div>
								<div className="h-4 w-8/12 skeleton rounded-sm mt-4"></div>
							</div>
							<div>
								<div className="h-8 w-full skeleton rounded-sm"></div>
								<div className="h-4 w-8/12 skeleton rounded-sm mt-4"></div>
								<div className="h-4 w-8/12 skeleton rounded-sm mt-4"></div>
								<div className="h-4 w-8/12 skeleton rounded-sm mt-4"></div>
								<div className="h-4 w-8/12 skeleton rounded-sm mt-4"></div>
							</div>
						</div>

						<div className="mt-32">
							<div className="h-8 w-[400px] mx-auto skeleton rounded-sm"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
