import Head from "next/head";
import React, { useRef, useState, useEffect } from "react";

import MenuSidebar from "./MenuSidebar";
import UserInfoHeader from "../../components/user_components/UserInfoHeader";
import HomeSVG from "../../public/assets/general/HomeSVG"
import { useAuth } from "../../context/AuthContext"

import { useRouter } from "next/router";
import Search from "../../public/assets/dashboard/Search";

import FullPageLoading from "../../components/loading/FullPageLoading";


export default function DashboardLayout(props) {
	const { userData, data, user } = useAuth()

	const [hover, sethover] = useState(false)

	const [q, setQ] = useState("");
	const [isFocused, setIsFocused] = useState(null);
 
	const [filtered, setfiltered] = useState(data);


	useEffect(() => {

		let newfiltered = data.filter(
			project => {
			  return (
				project
				.data.customer?.name
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
			<div style={{ backgroundColor: "#2C2C2C" }} className={"drop-shadow	"}>

				<div className="flex items-center justify-between px-4 h-[47px]">

					<div className="flex">
						<div className="flex items-center gap-2">
							<HomeSVG/>

							<div className="text-white" style={{ letterSpacing: "-0.2px" }}>
								<div className="w-[180px] overflow-hidden" style={{ fontSize: "14px" }}> {userData.name} </div>
								<div className="opacity-50 mt-[-4px]" style={{ fontSize: "10px" }}> {userData.email} </div>
							</div>
						</div>

            {props.scope === 'dashboard' &&
              <div className="hidden md:block">
                <div className="w-fit flex text-sm items-center rounded-md ml-10 pt-[10px] pb-[9px] pr-8"
                onMouseEnter={() => sethover(true)} style={{backgroundColor: (hover? "#505050" : "#444444")}}
                onMouseLeave={() => sethover(false)}>

                  <div className="px-3"><Search color="white"/></div>
                  <SearchBar hover={hover} setIsFocused={setIsFocused} setQ={setQ} q={q}/>
                </div>
              </div>
            }

					</div>

					<UserInfoHeader color="white" is_smaller={true}/> 
				</div>
				
			</div>

			<div className="xl:grid" style={{ gridTemplateColumns: "240px 1fr" }}>
				<MenuSidebar scope={props.scope}></MenuSidebar>

				<div className="mb-16 mt-8 mx-8 md:mx-16">

          			{props.children}

					{props.scope === 'dashboard' && <>
						{isFocused && <FilteredList filtered={filtered}/>}
					</>}

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