import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import ButtonIcon from "../buttons/ButtonIcon";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
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
import ButtonPrimary from "../buttons/ButtonPrimary";
import { AnimatePresence } from "framer-motion";
import IconHome from "../../public/SVG/dashboard/IconHome";
import Offer from "../../public/SVG/dashboard/EmptyOffer";
import AddOffer from "../../public/SVG/dashboard/AddOffer";
import InteractiveOffer from "../../public/SVG/dashboard/InteractiveOffer";
import Download from "../../public/SVG/Download";
import GeneratePDF from "../editor/GeneratePDF";

import { useActions } from "../../context/ActionsContext";
import { getLastModified, numberWithCommas } from "../../lib/helpers";
import { round } from "lodash";

export default function ProjectList({ clicked }) {
	const router = useRouter();
	const [loading, setloading] = useState(false);
	const [download, setdownload] = useState(false);
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
			.then((res) => { })
			.catch((err) => {
				setloading(false);
				console.log(err);
			});
	}

	useEffect(() => {
		if (user) {
			var newData = [];
			var newSelected = [];
			const collectionRef = collection(firestore, "/offers");
			const q = query(
				collectionRef,
				//orderBy("created", "desc"),
				orderBy("lastModified", "desc"),
				where("userId", "==", user.uid)
			);
			//const query = query(collectionRef,);
			getDocs(q).then((docs) => {
				if (!docs.empty) {
					docs.docs.map((doc) => {
						newData.push(doc.data());
						newSelected.push(false);
					});
					setdata(newData);
					setselected(newSelected);
				}

				setsceletonLoading(false);
			});
		}
	}, [user]);

	useEffect(() => {
		if (selected) {
			var newSelected = [];
			for (let i = 0; i < selected.length; i++) newSelected.push(false);
			setselected(newSelected);
		}
	}, [clicked]);

	return (
		<>
			<FullPageLoading loading={loading}></FullPageLoading>
			{download && (
				<GeneratePDF
					close={() => setloading(false)}
				></GeneratePDF>
			)}

			<div className='min-h-screen'>
				<div className='flex justify-center items-center h-full'>
					{
						<div className='w-full'>
							{!sceletonLoading ? (
								<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-10 gap-4'>
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
												setloading={setdownload}
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

function Project({
	project,
	ix,
	handleDelete,
	handleSelectId,
	setselect,
	select,
	setloading
}) {

	function handleClick() {
		handleDelete(project.id);
		settoggleDelete(false);
	}

	async function getServerPdf(projectId, name) {
		setloading(true);
		fetch(`https://api2.nacento.online/renderPdf`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ projectId }),
		})
			.then((response) => {
				return response.blob();
			})
			.then((blob) => {
				// create a temporary <a> element to download the blob
				const url = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = `${name}.pdf`;
				a.click();

				// cleanup: remove the temporary URL created by URL.createObjectURL()
				setTimeout(() => {
					URL.revokeObjectURL(url);
				}, 0);
				setloading(false);
			})
			.catch((error) => {
				toast("Nastala chyba. Skúste znovu neskôr prosím", { type: "error", autoClose: 5000 });
				setloading(false);
			});
	}

	const [toggleDelete, settoggleDelete] = useState(false);
	const [selected, setselected] = useState(true);
	const [hovered, sethovered] = useState(false);

	const styles = [""];

	console.log(project)

	return (
		<div
			onClick={(e) => {
				if (select[ix]) handleSelectId(project.id);
				else {
					var newSelected = [];
					for (let i = 0; i < select.length; i++) newSelected.push(false);
					newSelected[ix] = true;
					setselect(newSelected);
				}
				e.stopPropagation();
			}}

			onMouseEnter={() => sethovered(true)}
			onMouseLeave={() => sethovered(false)}

			className={`shadow-md project-div outline ${!select[ix]
				? "outline-gray-300 outline-0 hover:outline-1"
				: "outline-blue-500 outline-2"
				}  rounded-sm transition duration-100 ease-in-out`}
		>
			<div className='bg-gray-50 min-h-[250px] flex justify-between flex-col relative'>

				<div className="w-full h-[18px] absolute opacity-95" style={{ backgroundColor: project?.layout?.primaryColor, borderRadius: "2px 2px 0px 0px" }}></div>

				<div className="px-4 py-1">

					<div className='flex justify-between items-center mt-6'>
						<div className='text-lg font-medium text-start'>
							{project.data.customer.name ? "Cenová ponuka" : "Cenová ponuka"}
						</div>

						<div className='relative'>
							<ButtonIcon
								icon={<TrashBin />}
								tooltip='Zmazať ponuku'
								onClick={(e) => {
									settoggleDelete(!toggleDelete);
									e.stopPropagation();
								}}
								id='del'
							></ButtonIcon>

							<AnimatePresence mode='wait'>
								{toggleDelete && (
									<motion.div
										onClick={(e) => e.stopPropagation()}
										key={`delete-${project.id}`}
										initial={{ opacity: 0, y: 10 }}
										exit={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.2 }}
										className='absolute left-0 mt-1 bg-white shadow-hardShadow min-w-[200px] z-20 rounded-md px-3 py-3'
									>
										<div className='text-lg'>Naozaj zmazať?</div>
										<ButtonPrimary
											color={"red"}
											icon={<TrashBin color={"white"} />}
											iconBefore
											className='mt-4'
											onClick={handleClick}
										>
											Potvrdiť zmazanie
										</ButtonPrimary>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>

					<div>
						{project.data.customer.name && (
							<>
								<div className='text-left font-regular text-sm text-black mt-2'>
									Objednávateľ:
								</div>
								<div className='text-left font-light text-sm text-gray-500 mt-1'>
									{project.data.customer.name}
								</div>
							</>
						)}

						{project.expiration && (
							<>
								<div className='text-left font-regular text-sm text-black mt-3'>
									Platná do:
								</div>
								<div className='text-left font-light text-sm text-gray-500 mt-1'>
									{moment(project.expiration).format("DD.MM. YYYY")} {" "}
									<span style={{fontSize: "10px"}}>
									{moment(project.expiration).diff(moment(), "days") + 1 > 0? 
									`(končí o ${moment(project.expiration).diff(moment(), "days") + 1} dní)` : "(platnosť vypršala)"}
									</span>
								</div>
							</>
						)}
					</div>

					<div className='text-left font-regular text-sm text-black mt-4'>
						Cena:
					</div>
					<div className='text-left font-light text-sm text-gray-500 mt-1'>
						{project.totals
							? numberWithCommas(round(parseFloat(project?.totals?.total), 2))
							: "00.0"}
						€<span className='text-[10px]'> vrátane DPH</span>
					</div>

				</div>

			</div>

			<div className='bg-white px-2 py-3 relative w-full flex items-center'>
				<div>
					{/* <InteractiveOffer color="#1400FF"></InteractiveOffer> */}
					<IconHome color={project?.layout?.primaryColor}></IconHome>
				</div>

				<div className="flex flex-col justify-center ml-2 w-[80%] max-h-[34px]">
					<div className='text-sm overflow-hidden'>
						{project.name}
					</div>

					<div className="text-gray-400" style={{ fontSize: "10px" }}>
						Upravená {getLastModified(project?.lastModified)}
					</div>
				</div>

				{hovered &&
					<div className="absolte right-0 ml-1">
						<ButtonIcon
							icon={<Download color={"gray"} />}
							tooltip='Stiahnuť ako PDF'
							onClick={(e) => {
								e.stopPropagation();
								getServerPdf(project.id, project.name)
							}}
							id='download'
						></ButtonIcon>
					</div>
				}

			</div>
		</div>
	);
}

function Skeleton() {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full mt-10 gap-4'>
			{Array(12)
				.fill("")
				.map((name, ix) => {
					return (
						<div
							key={`sk${ix}`}
							className='w-full h-[240px] bg-gray-100 skeleton'
						></div>
					);
				})}
		</div>
	);
}
