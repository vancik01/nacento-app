import React, { useState } from "react";
import AccountSidebarSkeleton from "../../components/skeletons/AccountSidebarSkeleton";
import AccountSidebarMenu from "../../components/user_components/AccountSidebarMenu";
import { useAuth } from "../../context/AuthContext";

function vzory() {
	const [loading, setloading] = useState(false);
	const { userData } = useAuth();
	return (
		<div>
			<div className="flex">
				{!loading ? (
					<AccountSidebarMenu></AccountSidebarMenu>
				) : (
					<AccountSidebarSkeleton />
				)}
				<div className="w-full py-16 px-10">
					<h1 className="text-2xl">Vzory</h1>
					<Sceleton color={"red"}></Sceleton>
				</div>
			</div>
		</div>
	);
}

export default vzory;

function Sceleton({ color }) {
	const [width, setwidth] = useState(600);
	return (
		<div>
			<div>
				<div
					style={{
						width: width,
						minHeight: width * 1.41,
					}}
					className="mx-auto shadow-xl h-fit w-fit transition-all mt-10"
					id="a4-page"
				>
					<div className="w-full h-12" style={{ backgroundColor: color }}></div>
					<div className="mx-10 mt-10 text-2xl">Cenová Ponuka</div>
					<div className="w-16 mx-10 -mt-1">
						<Text></Text>
					</div>

					<div className="grid grid-cols-3 mt-5 mx-10 gap-10">
						<div>
							<div className="h-5 w-full bg-gray-100 rounded-sm"></div>
							<Text></Text>
							<Text></Text>
							<Text></Text>
							<Text></Text>
						</div>
						<div>
							<div className="h-5 w-full bg-gray-100 rounded-sm"></div>
							<Text></Text>
							<Text></Text>
							<Text></Text>
							<Text></Text>
							<Text></Text>
						</div>
						<div>
							<div className="h-5 w-full bg-gray-100 rounded-sm"></div>
							<Text></Text>
							<Text></Text>
							<Text></Text>
							<Text></Text>
						</div>
					</div>

					<div className="mt-16 mx-10">
						<div className="h-[1px] bg-gray-300 w-full mb-3"></div>
						<div className="h-4 w-[400px] mx-auto bg-gray-100  rounded-sm"></div>
						<div className="w-[300px] flex flex-col items-center mx-auto">
							<Text></Text>
							<Text></Text>
						</div>
						<div className="h-[1px] bg-gray-300 w-full mt-3"></div>
					</div>

					<div className="mt-10">
						<Section>
							<Table />
						</Section>
					</div>
				</div>
			</div>
		</div>
	);
}

function Text({ same }) {
	const random = same ? 100 : Math.random();
	return (
		<div
			className="h-2 bg-gray-100 rounded-sm mt-[8px]"
			style={{ width: `${((random * 100) % 60) + 40}%` }}
		></div>
	);
}

function Section({ children }) {
	return (
		<div className="mx-10 border p-3 ">
			<div className="h-4 bg-gray-100 rounded-sm mx-auto w-[200px] mb-3"></div>
			<div className="flex justify-between gap-10">
				<Text same></Text>
				<Text same></Text>
				<Text same></Text>
			</div>
			<div>{children}</div>
		</div>
	);
}

function Table({ template }) {
	template = "1fr 1fr 1fr 1fr 1fr";
	return (
		<div>
			<div className="grid mt-3" style={{ gridTemplateColumns: template }}>
				<div>
					<Text same />
				</div>
				<div>
					<Text same />
				</div>
				<div>
					<Text same />
				</div>
				<div>
					<Text same />
				</div>
				<div>
					<Text same />
				</div>
			</div>
		</div>
	);
}
