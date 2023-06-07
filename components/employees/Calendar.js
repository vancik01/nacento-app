import React, { useState, useEffect } from "react";

import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject} from '@syncfusion/ej2-react-schedule';

import { L10n, loadCldr, setCulture } from '@syncfusion/ej2-base';
import sk from "@syncfusion/ej2-locale/src/sk.json"

import slovak from 'cldr-data/main/sk/numbers.json';
import timeZoneNames from 'cldr-data/main/sk/timeZoneNames.json';
import gregorian from 'cldr-data/main/sk/ca-gregorian.json';
import numberingSystems from 'cldr-data/supplemental/numberingSystems.json';
import { useAuth } from "../../context/AuthContext";



loadCldr(numberingSystems, slovak, timeZoneNames, gregorian);
L10n.load(sk)
setCulture('sk');

export default function Calendar() {
    const [view, setView] = useState('Month');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { employees  } = useAuth()

    let time_data = []
    employees.forEach(employee => {
        employee.workTimes?.forEach(workTime => {
            time_data.push({
                Subject: employee.name,
                StartTime: workTime.StartTime, //Thu May 25 2023 06:15:00 GMT+0200 (Central European Summer Time)
                EndTime: workTime.EndTime, //Thu May 25 2023 16:30:00 GMT+0200 (Central European Summer Time)
                Location: (workTime.Location? workTime.Location : "Práca")
            })
        })
        employee.WorkTimes?.forEach(workTime => {
            time_data.push({
                Subject: employee.name,
                StartTime: workTime.StartTime, //Thu May 25 2023 06:15:00 GMT+0200 (Central European Summer Time)
                EndTime: workTime.EndTime, //Thu May 25 2023 16:30:00 GMT+0200 (Central European Summer Time)
                Location: (workTime.Location? workTime.Location : "Práca")
            })
        })
    });

    

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


    const onCellDoubleClick = (args) => {
        setView('Day');
        setSelectedDate(args.startTime);
      }


	return (
        <div className="h-[80vh]">
            <ScheduleComponent height="80vh" currentView={view} selectedDate={selectedDate}
            eventSettings={{ dataSource: time_data, allowAdding: false, allowEditing: false, allowDeleting: false, }}>
               <Inject services={[Day, Week, WorkWeek, Month, Agenda,]}/>       
            </ScheduleComponent>
        </div>    
	);
}

