import { Link } from "@mui/material";
import React from "react";
import CreateToolbar from "../components/dashboard/CreateToolbar";
import ProjectList from "../components/dashboard/ProjectsList";
import Layout from "../components/Layout";
import UserInfoHeader from "../components/user_components/UserInfoHeader";
import IconHome from "../public/SVG/dashboard/IconHome";
import Logo from "../public/SVG/Logo";

export default function Dashboard() {
	return (
		<div>
			<div className="bg-[#2C2C2C]">
				<Layout className="h-[70px]">
					<div className="flex items-center justify-between h-full">
						<Link href="/">
							<div className="w-28">
								<IconHome></IconHome>
							</div>
						</Link>

						<UserInfoHeader />
					</div>
				</Layout>
			</div>

			<div className="grid" style={{ gridTemplateColumns: "240px 1fr" }}>
				<div className="h-screen border-r"></div>
				<div className="mb-16 mt-8 mx-16">
					<CreateToolbar></CreateToolbar>
					<ProjectList></ProjectList>
				</div>
			</div>
		</div>
	);
}
