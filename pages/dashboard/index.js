import React, { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import CreateToolbar from "../../components/dashboard/CreateToolbar";
import ProjectList from "../../components/dashboard/ProjectsList";

import ExcelContext from "../../context/ExcelContext";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
	
	const { setActiveItem } = useAuth()

	return (
		<div onClick={() => setActiveItem(-1)}>
			<DashboardLayout scope={"dashboard"}> 

					<CreateToolbar></CreateToolbar>
					<ProjectList></ProjectList>

			</DashboardLayout>
		</div>
	);
}

