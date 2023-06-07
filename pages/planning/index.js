import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

import { GanttComponent, Inject, Edit, Selection } from '@syncfusion/ej2-react-gantt';

import { L10n, loadCldr, setCulture } from '@syncfusion/ej2-base';
import sk from "@syncfusion/ej2-locale/src/sk.json"

import slovak from 'cldr-data/main/sk/numbers.json';
import timeZoneNames from 'cldr-data/main/sk/timeZoneNames.json';
import gregorian from 'cldr-data/main/sk/ca-gregorian.json';
import numberingSystems from 'cldr-data/supplemental/numberingSystems.json';


// loadCldr(numberingSystems, slovak, timeZoneNames, gregorian);
// L10n.load(sk)
// setCulture('sk');

export default function Dashboard() {
    const [view, setView] = useState('Month');
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const divElements = document.querySelectorAll('div');

        divElements.forEach((div) => {
            const computedStyle = window.getComputedStyle(div);

            if(computedStyle.getPropertyValue('z-index') === '999999999')
                div.style.display = 'none';
            
            else if(computedStyle.getPropertyValue('z-index') === '99999')
                div.style.display = 'none'; 

        })

      }, []);


    const GanttData = [
        {
            TaskID: 1,
            TaskName: 'Project Initiation',
            StartDate: new Date('04/02/2019'),
            EndDate: new Date('04/21/2019'),
            // subtasks: [
            //     { TaskID: 2, TaskName: 'Identify Site location', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
            //     { TaskID: 3, TaskName: 'Perform Soil test', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
            //     { TaskID: 4, TaskName: 'Soil test approval', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
            // ]
        },
        {
            TaskID: 5,
            TaskName: 'Project Estimation',
            StartDate: new Date('04/02/2019'),
            EndDate: new Date('04/21/2019'),
            subtasks: [
                { TaskID: 6, TaskName: 'Develop floor plan for estimation', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 },
                { TaskID: 7, TaskName: 'List materials', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 },
                { TaskID: 8, TaskName: 'Estimation approval', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 }
            ]
        },
    ];


    const taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        duration: 'Duration',
        progress: 'Progress',
        child: 'subtasks',
    };


	return (
		<DashboardLayout scope={"planning"}>

            <div className="text-4xl pb-6">
                Plánovač
            </div>

            <div className="w-[80vw]">
                <GanttComponent dataSource={GanttData} height="450px" taskFields={taskFields}>
                    <Inject services={[Edit, Selection]}/>
                </GanttComponent>
            </div>

        </DashboardLayout>
	);
}

