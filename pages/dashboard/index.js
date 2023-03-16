import { Link } from "@mui/material";
import Head from "next/head";
import React from "react";
import CreateToolbar from "../../components/dashboard/CreateToolbar";
import ProjectList from "../../components/dashboard/ProjectsList";
import TeamsList from "../../components/dashboard/TeamsList";
import Layout from "../../components/Layout";
import UserInfoHeader from "../../components/user_components/UserInfoHeader";
import IconHome from "../../public/SVG/dashboard/IconHome";
import Logo from "../../public/SVG/Logo";
import HomeSVG from "../../components/HomeSVG"
import { useAuth } from "../../context/AuthContext"


export default function Dashboard() {
	const { userData } = useAuth()

	return (
		<div>
			<Head>
				<title>Dashboard</title>
			</Head>
			{/* <div style={{ backgroundColor: "#363636" }} className={"drop-shadow	"}> */}
			<div style={{ backgroundColor: "#2C2C2C" }} className={"drop-shadow	"}>

				{/* <Layout className="h-[55px]"> */}
				<div className="flex items-center justify-between px-4 h-[47px]">

					<div className="flex gap-4 text-white items-center">
						<HomeSVG />

						<div style={{ letterSpacing: "-0.2px" }}>
							<div style={{ fontSize: "14px" }}> {userData.name} </div>
							<div className="opacity-50 mt-[-4px]" style={{ fontSize: "10px" }}> {userData.email} </div>
						</div>

					</div>


					<UserInfoHeader color="white" is_smaller={true}/> 
				</div>
				{/* </Layout> */}
			</div>

			<div className="grid" style={{ gridTemplateColumns: "240px 1fr" }}>
				<TeamsList></TeamsList>

				<div className="mb-16 mt-8 mx-16">
					<CreateToolbar></CreateToolbar>
					<ProjectList></ProjectList>
				</div>
			</div>
		</div>
	);
}
