import React from "react";

export default function AccountSidebarSkeleton() {
	return (
		<div className="h-full flex flex-col items-center justify-between ">
			<div className="w-full">
				<div className="min-h-[100px]">
					<div className="flex flex-col items-center">
						<div className="h-16 rounded-full p-1 aspect-square bg-white shadow-md">
							<div className="h-full aspect-square rounded-full skeleton"></div>
						</div>
						<div className="text-xl font-medium text-center mt-4 h-4 bg-gray-200 skeleton"></div>
					</div>
				</div>
				<div className="flex flex-col gap-8  mt-6 max-w-[250px] mx-auto mb-6">
					<MenuItem></MenuItem>
					<MenuItem></MenuItem>
					<MenuItem></MenuItem>
					<MenuItem></MenuItem>
				</div>
			</div>
			<div
				color="#361CC1"
				className="w-40 bg-gray-200 skeleton rounded-md h-4"
			></div>
		</div>
	);
}

function MenuItem() {
	return <div className="h-12 bg-gray-200 skeleton rounded-md"></div>;
}
