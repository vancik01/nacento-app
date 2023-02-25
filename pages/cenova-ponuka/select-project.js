import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import FullPageLoading from "../../components/loading/FullPageLoading";
import { LoggedIn } from "../../components/LoggedIn";
import Logo from "../../public/SVG/Logo";

export default function index() {
	const router = useRouter();
	const [loading, setloading] = useState(false);
	function handleSelectId(id) {
		setloading(true);
		localStorage.setItem("offerId", id);
		router.push("/cenova-ponuka/");
	}
	return (
		<>
			<FullPageLoading loading={loading}></FullPageLoading>

			<Layout className="pt-8">
				<Link href="/">
					<div className="w-32">
						<Logo></Logo>
					</div>
				</Link>
			</Layout>

			<div className="min-h-screen mt-32">
				<div className="flex justify-center items-center h-full max-w-5xl mx-auto">
					{
						<div className="w-full">
							<h1 className="text-5xl font-light w-full text-center">
								Zoznam projektov
							</h1>
							<div className="grid grid-cols-3 w-full mt-10 gap-8">
								{Array(10)
									.fill()
									.map((project, projectId) => {
										return (
											<button
												onClick={() => {
													handleSelectId(projectId);
												}}
											>
												<div className="bg-gray-50 rounded-lg min-h-[200px] p-4">
													<div className="text-2xl font-light text-start">
														Projekt {projectId + 1}
													</div>
												</div>
											</button>
										);
									})}
							</div>
						</div>
					}
				</div>
			</div>
		</>
	);
}
