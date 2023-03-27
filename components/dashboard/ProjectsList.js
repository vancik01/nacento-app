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
import IconHome from "../../public/SVG/dashboard/IconHome";
import Offer from "../../public/SVG/dashboard/EmptyOffer";
import AddOffer from "../../public/SVG/dashboard/AddOffer";
import InteractiveOffer from "../../public/SVG/dashboard/InteractiveOffer";

import { numberWithCommas } from "../../lib/helpers";
import { round } from "lodash";

export default function ProjectList({clicked}) {
	const router = useRouter();
	const [loading, setloading] = useState(false);
	const [sceletonLoading, setsceletonLoading] = useState(true);

	const [data, setdata] = useState(null);
	const [selected, setselected] = useState(null);

	const { user } = useAuth();
	function handleSelectId(id) {
		setloading(true);
		router.push(`/cenova-ponuka/${id}`);
	}

	function handleDelete(id) {
		const docRef = doc(firestore, `/offers/${id}`);
		var newData = [...data];
		newData = newData.filter((offer) => offer.id != id);
		setdata(newData);

		deleteDoc(docRef)
			.then((res) => {})
			.catch((err) => {
				setloading(false);
				console.log(err);
			});
	}

	useEffect(() => {
		if (user) {
			var newData = [];
			var newSelected = []
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
						newSelected.push(false)
					});
					setdata(newData);
					setselected(newSelected)
				}

				setsceletonLoading(false);
			});	
		}
	}, [user]);

	useEffect(() => {
		if(selected){
			var newSelected = []
			for(let i=0; i<selected.length; i++) newSelected.push(false)
			setselected(newSelected)
		}
		
	}, [clicked])

	return (
		<>
			<FullPageLoading loading={loading}></FullPageLoading>

			<div className="min-h-screen">

				<div className="flex justify-center items-center h-full">
					{
						<div className="w-full">
							{!sceletonLoading ? (
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-10 gap-4">
									{data?.map((project, i) => {
										return (
											<Project
												project={project}
												ix={i}
												key={i}
												handleDelete={handleDelete}
												handleSelectId={handleSelectId}
												setselect={setselected}
												select={selected}
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

function Project({ project, ix, handleDelete, handleSelectId, setselect, select }) {
	function handleClick() {
		handleDelete(project.id);
		settoggleDelete(false);
	}
	const [toggleDelete, settoggleDelete] = useState(false);
	const [selected, setselected] = useState(true)

	const styles = [""]

	return (
		<div onClick={(e) => {
			if(select[ix]) handleSelectId(project.id);
			else{
				var newSelected = []
				for(let i=0; i<select.length; i++) newSelected.push(false)
				newSelected[ix] = true
				setselect(newSelected)
			}
			e.stopPropagation();
		}} 
		//w-[18vw] h-[16vw]
		className={`shadow-md project-div outline ${!select[ix] ? "outline-gray-300 outline-0 hover:outline-1" : "outline-blue-500 outline-2"}  rounded-sm transition duration-100 ease-in-out`}>
			<div className="bg-gray-50 rounded-sm p-4 min-h-[250px] flex justify-between flex-col">
				<div className="">
					<div className="flex justify-between items-center">
						<div className="text-lg font-medium text-start">Cenová Ponuka</div>
						<div className="relative">
		
						<ButtonIcon
							icon={<TrashBin/>}
							tooltip="Zmazať ponuku"
							onClick={(e) => {
								settoggleDelete(!toggleDelete);
								e.stopPropagation();
							}}
							id="del"
						></ButtonIcon>

						<AnimatePresence mode="wait">
							{toggleDelete && (
								<motion.div
									onClick={(e) => e.stopPropagation()}
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
					</div>
					
					<div className="text-left font-regular text-sm text-black mt-2">
						Objednávateľ:
					</div>
					<div className="text-left font-light text-sm text-gray-500 mt-1">
						{project.data.customer && project.data.customer.name}
					</div>

					<div className="text-left font-regular text-sm text-black mt-4">
						Cena:
					</div>
					<div className="text-left font-light text-sm text-gray-500 mt-1">
						{project.totals
							? numberWithCommas(round(parseFloat(project?.totals?.total), 2))
							: "00.0"}
						€<span className="text-[10px]"> vrátane DPH</span>
					</div>
				</div>

				<div className="flex justify-between items-center">
					<div className="text-xs">
						{moment(project?.created).format("DD.MM. YYYY, HH:mm")}
					</div>

					<div className="flex items-center justify-center gap-1">
						
						{/* <ButtonIcon
							tooltip="Upraviť ponuku"
							id="add"
							onClick={() => {
								handleSelectId(project.id);
							}}
							icon={<Edit />}
						></ButtonIcon> */}
					</div>
				</div>
			</div>
			
			<div className="bg-white px-2 py-3 flex items-center">
				<div>
					{/* <InteractiveOffer color="#1400FF"></InteractiveOffer> */}
					<IconHome color="#1400FF"></IconHome>
				</div>
				<div className="text-sm ml-2 overflow-hidden w-[80%]">{project.name}</div>

			</div>
		</div>
	);
}

function Skeleton() {
	return (
		<div className="grid grid-cols-4 w-full mt-10 gap-4">
			{Array(12)
				.fill("")
				.map((name, ix) => {
					return <div key={`sk${ix}`} className="w-full h-[240px] bg-gray-100 skeleton"></div>;
				})}
		</div>
	);
}
