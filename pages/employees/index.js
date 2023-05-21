import React, {useState} from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

import { Pagination } from '@mui/material';
import EnhancedTable from "../../components/employees/Table";

export default function Dashboard() {

	return (
		<DashboardLayout scope={"employees"}>

            <div className="text-4xl pb-6">
                <div className="py-5">Zamestnanci</div>
                <EnhancedTable/>
            </div>

            <div className="text-4xl pb-6">
                <div className="py-5">Aktivita</div>
            </div>


        </DashboardLayout>
	);
}

