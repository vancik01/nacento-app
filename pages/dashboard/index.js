import { Link } from "@mui/material";
import Head from "next/head";
import React, { useRef, useState, useEffect } from "react";
import CreateToolbar from "../../components/dashboard/CreateToolbar";
import ProjectList from "../../components/dashboard/ProjectsList";
import TeamsList from "../../components/dashboard/TeamsList";
import Layout from "../../components/Layout";
import UserInfoHeader from "../../components/user_components/UserInfoHeader";
import IconHome from "../../public/SVG/dashboard/IconHome";
import Logo from "../../public/SVG/Logo";
import HomeSVG from "../../components/HomeSVG"
import { useAuth } from "../../context/AuthContext"

import { useRouter } from "next/router";
import Search from "./icons/Search";

import { firestore } from "../../lib/firebase";
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	orderBy,
	query,
	where,
} from "firebase/firestore";

export default function Dashboard() {
	const { user, userData } = useAuth()
	const [clicked, setclicked] = useState(false)
	const [hover, sethover] = useState(false)
	const [data, setdata] = useState(null);
	const [selected, setselected] = useState(null);



	const router = useRouter();

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
		<div>
			<Head>
				<title>Naceňto</title>
			</Head>
			{/* <div style={{ backgroundColor: "#363636" }} className={"drop-shadow	"}> */}
			<div style={{ backgroundColor: "#2C2C2C" }} className={"drop-shadow	"}>

				{/* <Layout className="h-[55px]"> */}
				<div className="flex items-center justify-between px-4 h-[47px]">

					{/* <div className="flex gap-4 text-white items-center"> */}
					<div className="flex">
						<div className="flex items-center gap-2">
							<HomeSVG/>

							<div className="text-white" style={{ letterSpacing: "-0.2px" }}>
								<div className="w-[180px] overflow-hidden" style={{ fontSize: "14px" }}> {userData.name} </div>
								<div className="opacity-50 mt-[-4px]" style={{ fontSize: "10px" }}> {userData.email} </div>
							</div>
						</div>

						<div className="flex items-center rounded-md ml-10 pt-[8px] pb-[8px] pr-8" style={{backgroundColor: (hover? "#505050" : "#444444")}}
						onMouseEnter={() => sethover(true)}
						onMouseLeave={() => sethover(false)} >

							<div className="px-3"><Search color="white"/></div>
							<SearchBar data={data} hover={hover}/>
							{/* <span className="text-gray-500 text-sm"> Vyhľadaj ponuku podľa názvu... </span> */}
						</div>

					</div>


					<UserInfoHeader color="white" is_smaller={true}/> 
				</div>
				{/* </Layout> */}
			</div>

			<div className="xl:grid" onClick={() => setclicked(!clicked)} style={{ gridTemplateColumns: "240px 1fr" }}>
				<TeamsList></TeamsList>

				<div className="mb-16 mt-8 mx-8 md:mx-16">
					<CreateToolbar></CreateToolbar>
					<ProjectList selected={selected} setselected={setselected} data={data} handleDelete={handleDelete} clicked={clicked}></ProjectList>
				</div>
			</div>
		</div>
	);
}


function SearchBar({data, hover}){
	const [q, setQ] = useState("");
	const [isFocused, setIsFocused] = useState(false);

	return(
		<div className="relative">
			<label htmlFor="search-form">
				<input
					 onBlur={() => setIsFocused(false)}
					 onFocus={() => setIsFocused(true)}
					type="search"
					name="search-form"
					id="search-form"
					className="text-white"
					style={{backgroundColor: (hover? "#505050" : "#444444")}}
					placeholder="Vyhľadať ponuku podľa názvu..."
					value={q}
					/*
					// set the value of our useState q
					//  anytime the user types in the search box
					*/
					onChange={(e) => setQ(e.target.value)}
				/>
				<span className="sr-only">Search countries here</span>
			</label>
			
			{isFocused && <div className="absolute top-10 text-white" style={{backgroundColor: "#444444"}}>
				AAA	
			</div>}
			
		</div>
	)
}