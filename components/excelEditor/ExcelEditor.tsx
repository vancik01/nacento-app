import React, { useRef , useEffect, useState } from "react";

import { RangeDirective, RangesDirective, SheetDirective, SheetsDirective, 
    SpreadsheetComponent } from "@syncfusion/ej2-react-spreadsheet"

import { useExcel } from "../../context/ExcelContext";

export default function ExcelEditor() {

    const { file } = useExcel()

    let SSObj: SpreadsheetComponent

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

        if(file) SSObj.open({ file: file}) 
      }, []);

      
	return (
        <div className="px-4 h-[90vh]">
            <SpreadsheetComponent allowOpen={true}
                openUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open"
                saveUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save"
                allowSave={true}
                ref={((s:SpreadsheetComponent)=>SSObj=s)}
                >
                <SheetsDirective>
                    <SheetDirective>
                        <RangesDirective>
                        <RangeDirective></RangeDirective>
                        </RangesDirective>
                    </SheetDirective>
                </SheetsDirective>
            </SpreadsheetComponent>
        </div>             
	);
}

