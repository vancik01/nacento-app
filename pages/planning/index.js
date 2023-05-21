import React from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';

export default function Dashboard() {


	return (
		<DashboardLayout scope={"planning"}>

            <div className="text-4xl pb-6">
                Plánovač
            </div>

            <ScheduleComponent>
                <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}/>
            </ScheduleComponent>

        </DashboardLayout>
	);
}

