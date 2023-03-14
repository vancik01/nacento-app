import { Link } from "@mui/material";
import Head from "next/head";
import React from "react";
import CreateToolbar from "../components/dashboard/CreateToolbar";
import ProjectList from "../components/dashboard/ProjectsList";
import TeamsList from "../components/dashboard/TeamsList";
import Layout from "../components/Layout";
import UserInfoHeader from "../components/user_components/UserInfoHeader";
import IconHome from "../public/SVG/dashboard/IconHome";
import Logo from "../public/SVG/Logo";

export default function Dashboard() {
	return (
		<div>
			<Head>
				<title>Dashboard</title>
			</Head>
			<div className="bg-blue-600">
				<Layout className="h-[70px]">
					<div className="flex items-center justify-between h-full">
						<div className="text-white">LOGO</div>
						<UserInfoHeader color="white" />
					</div>
				</Layout>
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
