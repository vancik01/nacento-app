import React, { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import CreateToolbar from "../../components/dashboard/CreateToolbar";
import ProjectList from "../../components/dashboard/ProjectsList";

import ExcelContext from "../../context/ExcelContext";

export default function Dashboard() {

	const [clicked, setclicked] = useState(false)	

	return (
		<div onClick={() => setclicked(!clicked)}>
			<DashboardLayout scope={"dashboard"}> 

					<CreateToolbar></CreateToolbar>
					<ProjectList clicked={clicked}></ProjectList>

			</DashboardLayout>
		</div>
	);
}

