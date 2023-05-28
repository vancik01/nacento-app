import React, { useRef , useEffect } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

import EnhancedTable from "../../components/employees/Table";
import Calendar from "../../components/employees/Calendar";

export default function Dashboard() {

	return (
		<DashboardLayout scope={"employees"}>

            <div className="text-4xl pb-6">
                <div className="py-5">Zamestnanci</div>
                <EnhancedTable/>
            </div>

            <div className="text-4xl pb-6">
                <div className="py-5">Aktivita</div>
                <Calendar/>
            </div>


        </DashboardLayout>
	);
}

