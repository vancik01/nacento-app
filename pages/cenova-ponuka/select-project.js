import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import ButtonIcon from "../../components/ButtonIcon";
import { motion } from "framer-motion";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import FullPageLoading from "../../components/loading/FullPageLoading";
import { LoggedIn } from "../../components/LoggedIn";
import { firestore } from "../../lib/firebase";
import Logo from "../../public/SVG/Logo";
import PaintBrush from "/public/SVG/PaintBrush";

import moment from "moment/moment";
import Edit from "../../public/SVG/Edit";
import UserInfoHeader from "../../components/user_components/UserInfoHeader";
import { useAuth } from "../../context/AuthContext";
import TrashBin from "../../public/SVG/editor/TrashBin";
import ButtonPrimary from "../../components/ButtonPrimary";
import { AnimatePresence } from "framer-motion";

export default function SelectProject() {
	const router = useRouter();
	const [loading, setloading] = useState(false);
	const [sceletonLoading, setsceletonLoading] = useState(true);

	const [data, setdata] = useState(null);
	const { user } = useAuth();
	function handleSelectId(id) {
		setloading(true);
		localStorage.setItem("offerId", id);
		router.push("/cenova-ponuka/");
	}

	function handleDelete(id) {
		const docRef = doc(firestore, `/offers/${id}`);
		var newData = [...data];
		newData = newData.filter((offer) => offer.id != id);
		setdata(newData);
		console.log(newData);

		// setloading(true);
		// deleteDoc(docRef)
		// 	.then((res) => {
		// 		setloading(false);
		// 	})
		// 	.catch((err) => {
		// 		setloading(false);
		// 	});
	}

	useEffect(() => {
		if (user) {
			var newData = [];
			const collectionRef = collection(firestore, "/offers");
			const q = query(
				collectionRef,
				orderBy("created", "desc"),
				where("userId", "==", user.uid)
			);
			//const query = query(collectionRef,);
			getDocs(q).then((docs) => {
				if (!docs.empty) {
					docs.docs.map((doc) => {
						newData.push(doc.data());
					});
					setdata(newData);
				}

				setsceletonLoading(false);
			});
		}
	}, [user]);

	return (
		<>
			<FullPageLoading loading={loading}></FullPageLoading>
			<Layout className="pt-8">
				<div className="flex items-center justify-between">
					<Link href="/">
						<div className="w-32">
							<Logo></Logo>
						</div>
					</Link>

					<UserInfoHeader />
				</div>
			</Layout>

			<div className="min-h-screen mt-32 mb-16">
				<div className="flex justify-center items-center h-full max-w-5xl mx-auto">
					{
						<div className="w-full">
							<h1 className="text-5xl font-light w-full text-center">
								Zoznam projektov
							</h1>
							{!sceletonLoading ? (
								<div className="grid grid-cols-3 w-full mt-10 gap-8">
									<Link href="/cenova-ponuka/novy-projekt">
										<div className="bg-gray-50 rounded-lg min-h-[200px] p-4 flex items-center justify-center">
											<div className="text-2xl font-light text-start">
												Pridať nový projekt
											</div>
										</div>
									</Link>

									{data?.map((project, i) => {
										return (
											<Project
												project={project}
												key={i}
												handleDelete={handleDelete}
												handleSelectId={handleSelectId}
											/>
										);
									})}
								</div>
							) : (
								<Skeleton></Skeleton>
							)}
						</div>
					}
				</div>
			</div>
		</>
	);
}

function Project({ project, handleDelete, handleSelectId }) {
	function handleClick() {
		handleDelete(project.id);
		settoggleDelete(false);
	}
	const [toggleDelete, settoggleDelete] = useState(false);
	return (
		<div>
			<div className="bg-gray-50 rounded-lg min-h-[200px] p-4 flex justify-between flex-col">
				<div>
					<div className="text-2xl font-light text-start">{project.name}</div>
					<div className="text-left text-sm text-gray-500 mt-3">
						{project.id}
					</div>
				</div>
				<div className="flex justify-between">
					<div>{moment(project?.created).format("DD.MM. YYYY, HH:mm")}</div>

					<div className="flex items-center justify-center gap-1">
						<div className="relative">
							<ButtonIcon
								icon={<TrashBin />}
								tooltip="Zmazať ponuku"
								onClick={() => {
									settoggleDelete(!toggleDelete);
								}}
								id="del"
							></ButtonIcon>

							<AnimatePresence mode="wait">
								{toggleDelete && (
									<motion.div
										key={`delete-${project.id}`}
										initial={{ opacity: 0, y: 10 }}
										exit={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.2 }}
										className="absolute left-0 mt-1 bg-white shadow-hardShadow min-w-[200px] rounded-md px-3 py-3"
									>
										<div className="text-lg">Naozaj zmazať?</div>
										<ButtonPrimary
											color={"red"}
											icon={<TrashBin color={"white"} />}
											iconBefore
											className="mt-4"
											onClick={handleClick}
										>
											Potvrdiť zmazanie
										</ButtonPrimary>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
						<ButtonIcon
							tooltip="Upraviť ponuku"
							id="add"
							onClick={() => {
								handleSelectId(project.id);
							}}
							icon={<Edit />}
						></ButtonIcon>
					</div>
				</div>
			</div>
		</div>
	);
}

function Skeleton() {
	return (
		<div className="grid grid-cols-3 w-full mt-10 gap-8 mb-16 max-w-5xl mx-auto ">
			{Array(9)
				.fill("")
				.map(() => {
					return (
						<div className="w-full h-[200px] bg-gray-100 rounded-md skeleton"></div>
					);
				})}
		</div>
	);
}
