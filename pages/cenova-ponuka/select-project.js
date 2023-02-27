import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import FullPageLoading from "../../components/loading/FullPageLoading";
import { LoggedIn } from "../../components/LoggedIn";
import { firestore } from "../../lib/firebase";
import Logo from "../../public/SVG/Logo";

export default function index() {
	const router = useRouter();
	const [loading, setloading] = useState(true);
	const [data, setdata] = useState(null);
	function handleSelectId(id) {
		setloading(true);
		localStorage.setItem("offerId", id);
		router.push("/cenova-ponuka/");
	}

	useEffect(() => {
		var newData = [];

		const collectionRef = collection(firestore, "/offers");
		getDocs(collectionRef).then((docs) => {
			if (!docs.empty) {
				docs.docs.map((doc) => {
					newData.push(doc.data());
				});
				setdata(newData);
			}
			console.log(newData);

			setloading(false);
		});
	}, []);

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
								<Link href="/cenova-ponuka/novy-projekt">
									<div className="bg-gray-50 rounded-lg min-h-[200px] p-4 flex items-center justify-center">
										<div className="text-2xl font-light text-start">
											Pridať nový projekt
										</div>
									</div>
								</Link>
								{console.log(data, "data")}
								{data?.map((project, projectId) => {
									return (
										<button
											onClick={() => {
												handleSelectId(project.id);
											}}
										>
											<div className="bg-gray-50 rounded-lg min-h-[200px] p-4">
												<div className="text-2xl font-light text-start">
													{project.name}
												</div>
												<div className="text-left text-sm text-gray-500 mt-3">
													{project.id}
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
