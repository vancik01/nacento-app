import { useRouter } from "next/router";
import React, { useState } from "react";
import ArrowDown from "../../public/SVG/ArrowDown";
import AllProjects from "../../public/SVG/editor/AllProjects";
import AddNewProject from "../../public/SVG/editor/AddNewProject";
import RecentClock from "../../public/SVG/editor/RecentClock";
import { useData } from "../../context/AppWrap";

export default function SelectProjectToolbar() {
	const [toolbar, settoolbar] = useState(false);
	const router = useRouter();

	function handleSelect() {
		localStorage.removeItem("offerId");
		router.reload();
	}
	const { name } = useData();

	return (
		<div className="relative">
			<button
				onClick={() => {
					settoolbar(!toolbar);
				}}
			>
				<div className="flex justify-start items-center gap-2">
					<div className="font-light text-gray-400">{name}</div>
					<div
						className="transition-all"
						style={{ rotate: toolbar ? "180deg" : "0deg" }}
					>
						<ArrowDown color={"#C0C0C0"}></ArrowDown>
					</div>
				</div>
			</button>

			{toolbar && (
				<div
					key="login-toolbar"
					className="absolute top-8 left-0 shadow-hardShadow bg-white rounded-md"
				>
					<div className="py-4 px-3 w-64 min-h-[200px]">
						<MenuItem onClick={handleSelect}>
							<div className="flex justify-between items-center gap-3 text-base font-light">
								<AllProjects></AllProjects>
								<div>Zobraziť všetky</div>
							</div>
						</MenuItem>

						<MenuItem href="/cenova-ponuka/novy-projekt/">
							<div className="flex justify-between items-center gap-3 text-base font-light">
								<AddNewProject></AddNewProject>
								<div>Pridať nový</div>
							</div>
						</MenuItem>

						<div className="w-full h-[1px] bg-gray-200 mt-2"></div>

						<div className="flex justify-start items-center gap-2 mt-4">
							<RecentClock></RecentClock>
							<div className="text-xs font-medium">Nedávne</div>
						</div>

						<div className="flex flex-col mt-2">
							{Array(4)
								.fill()
								.map((project, projectId) => {
									return (
										<MenuItem
											href={""}
											className="text-start text-sm font-light"
										>
											<div>Ponuka{projectId + 1}</div>
										</MenuItem>
									);
								})}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

function MenuItem({ href, className, onClick, children }) {
	const router = useRouter();
	return (
		<button
			onClick={
				onClick
					? onClick
					: () => {
							router.push(href);
					  }
			}
			className={`${className ? className : ""} mb-3`}
		>
			{children}
		</button>
	);
}
