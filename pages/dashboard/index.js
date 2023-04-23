import { Link } from "@mui/material";
import Head from "next/head";
import React, { useRef, useState, useEffect } from "react";
import CreateToolbar from "../../components/dashboard/CreateToolbar";
import ProjectList from "../../components/dashboard/ProjectsList";
import TeamsList from "../../components/dashboard/TeamsList";
import Layout from "../../components/Layout";
import UserInfoHeader from "../../components/user_components/UserInfoHeader";
import Logo from "../../public/SVG/Logo";
import HomeSVG from "../../components/HomeSVG"
import { useAuth } from "../../context/AuthContext"

import { useRouter } from "next/router";
import Search from "./icons/Search";

import IconHome from "../../public/SVG/dashboard/IconHome";

import AccountToolbar from "../../components/user_components/AccountToolbar";

import { AnimatePresence, motion } from "framer-motion";


import { firestore } from "../../lib/firebase";
import { transform } from "lodash";
import FullPageLoading from "../../components/loading/FullPageLoading";


export default function Dashboard() {
	const { user, userData, data } = useAuth()
	const [clicked, setclicked] = useState(false)
	const [hover, sethover] = useState(false)

	const [userhover, setuserhover] = useState(false)

	const [isFocused, setIsFocused] = useState(null);
	const [q, setQ] = useState("");
 
	const [filtered, setfiltered] = useState(data);

	useEffect(() => {

		let newfiltered = data.filter(
			project => {
			  return (
				project
				.data.customer.name
				.toLowerCase()
				.includes(q.toLowerCase()) ||
				
				project
				.name
				.toLowerCase()
				.includes(q.toLowerCase())

			  );
			}
		  );

		  setfiltered(newfiltered)

	}, [q])


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

						<div className="hidden md:block">

							<div className="w-fit flex text-sm items-center rounded-md ml-10 pt-[10px] pb-[9px] pr-8"
							onMouseEnter={() => sethover(true)} style={{backgroundColor: (hover? "#505050" : "#444444")}}
							onMouseLeave={() => sethover(false)}>

								<div className="px-3"><Search color="white"/></div>
								<SearchBar hover={hover} setIsFocused={setIsFocused} setQ={setQ} q={q}/>
							</div>
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
					<ProjectList clicked={clicked}></ProjectList>

					{isFocused && <FilteredList filtered={filtered}/>}
					{/* { userhover && <AccountToolbar />} */}
							

				</div>
			</div>
		</div>
	);
}


function SearchBar({hover, setIsFocused, setQ, q}){

	return(
			<label htmlFor="search-form">
				<input
					 onBlur={() => setIsFocused(false)}
					 onFocus={() => setIsFocused(true)}
					type="search"
					name="search-form"
					id="search-form"
					className="text-white"
					style={{backgroundColor: (hover? "#505050" : "#444444")}}
					placeholder="Hľadať podľa názvu, objednávateľa..."
					value={q}
					onChange={(e) => setQ(e.target.value)}
					autoComplete="off"
				/>
			</label>
	
	)
}


function FilteredList({filtered}){
	const [isHovered, setIsHovered] = useState(null)
	const [loading, setloading] = useState(false)

	const router = useRouter();


	function handleSelectId(id) {
		setloading(true);
		router.push(`/cenova-ponuka/${id}`);
	}

	return(
		<>
		<FullPageLoading loading={loading}></FullPageLoading>
		<div className="absolute flex flex-col top-[50px] left-[268px] cursor-default shadow-xl border rounded py-2 w-[350px] overflow-x-hidden text-black bg-white overflow-y-auto max-h-[400px] z-30 text-lg"
		 id="filtered-list">
		{filtered.length? filtered?.map((project, i) => {

			return (
				<div key={`search${i}`} id={`${i}`} className={"flex items-center gap-3 w-full px-4 py-2 " + (isHovered === `${i}` && "bg-gray-100")}
				onMouseEnter={(e) => setIsHovered(e.target.id)} onMouseLeave={() => setIsHovered(null)}
				onClick={() => handleSelectId(project.id)} onMouseDown={(e) => e.preventDefault()}
				>

					{/* <IconHome smaller color={project?.layout?.primaryColor}></IconHome> */}
					<div className="h-4 aspect-square" style={{backgroundColor: `${project?.layout?.primaryColor}`}}></div>

					<div className="flex flex-col ">
						<span className="text-sm text-gray-700">{project.data.customer.name ? project.data.customer.name : "Neznámy objednávateľ"}</span>
						<span className="text-xs text-gray-500">{project.name}</span>
					</div>

				</div>
			);
		}) : <div className="text-sm text-gray-700 w-full px-4 py-3">
				Nenašli sa žiadne výsledky...

			</div>}	
		</div>
		</>
	)
}