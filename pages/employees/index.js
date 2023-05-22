import React, { useRef , useEffect } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

import { Pagination } from '@mui/material';
import EnhancedTable from "../../components/employees/Table";

import { L10n } from '@syncfusion/ej2-base';
import { RangeDirective, RangesDirective, SheetDirective, SheetsDirective, 
    SpreadsheetComponent } from "@syncfusion/ej2-react-spreadsheet"

export default function Dashboard() {

    const spreadsheetRef = useRef(null);


    L10n.load({
        'sk': {
          'spreadsheet': {
            'Cut': 'Vystrihnúť',
            'Copy': 'Kopírovať',
            'Paste': 'Prilepiť',
            // Add other translations for specific strings used in the component
          }
        }
      });
    L10n.locale = 'sk'; 

    const handleDownload = () => {
        // const spreadsheetInstance = spreadsheetRef.current.spreadsheet;
        // const fileName = 'modified_excel.xlsx';
        // spreadsheetInstance.save(fileName);
      };

    //delete watermark of unpaid subsription for syncfusion spreadsheet component :)) 
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


	return (
		<DashboardLayout scope={"employees"}>

            <div className="text-4xl pb-6">
                <div className="py-5">Zamestnanci</div>
                <EnhancedTable/>
            </div>

            <div className="text-4xl pb-6">
                <div className="py-5">Aktivita</div>

                <div className="h-[100vh]">
                    <SpreadsheetComponent allowOpen={true}
                        openUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open"
                        saveUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save"
                        allowSave={true}
                        ref={spreadsheetRef}
                        >
                        <SheetsDirective>
                        <SheetDirective>
                            <RangesDirective>
                            <RangeDirective></RangeDirective>
                            </RangesDirective>
                        </SheetDirective>
                        </SheetsDirective>
                    </SpreadsheetComponent>
                    <button onClick={handleDownload}>Download Excel</button>
                </div>

            </div>


        </DashboardLayout>
	);
}

