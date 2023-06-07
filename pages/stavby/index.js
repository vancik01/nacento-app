import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";


export default function Dashboard() {

	return (
		<DashboardLayout scope={"planning"}>

            <div className="text-4xl pb-6">
                Stavby
            </div>

            <div className="w-[80vw]">
                Ahojte
            </div>

        </DashboardLayout>
	);
}

