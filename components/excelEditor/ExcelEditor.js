import React, { useRef , useEffect, useState } from "react";

import { RangeDirective, RangesDirective, SheetDirective, SheetsDirective, 
    SpreadsheetComponent, getCell } from "@syncfusion/ej2-react-spreadsheet"

import { useExcel } from "../../context/ExcelContext";

import { L10n, loadCldr, setCulture } from '@syncfusion/ej2-base';
import sk from "@syncfusion/ej2-locale/src/sk.json"

import slovak from 'cldr-data/main/sk/numbers.json';
import timeZoneNames from 'cldr-data/main/sk/timeZoneNames.json';
import gregorian from 'cldr-data/main/sk/ca-gregorian.json';
import numberingSystems from 'cldr-data/supplemental/numberingSystems.json';

import PopUp from "../general/PopUp";
import { set } from "lodash";
import Copy from "../editor/Copy";

import { toast } from "react-toastify";


loadCldr(numberingSystems, slovak, timeZoneNames, gregorian);
L10n.load(sk)
setCulture('sk');


export default function ExcelEditor() {

    const [activeCell, setActiveCell] = useState('')
    const [cellData, setCellData] = useState('')
    const [items, setItems] = useState([])
    const [openPopup, setOpenPopup] = useState(false)
    const { file } = useExcel()
    const spreadsheetRef = useRef(null);


    useEffect(() => {
        if(openPopup) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';

    }, [openPopup]);

    const onContextMenuBeforeOpen = (args) => {
        let spreadsheet = spreadsheetRef.current;

        if (spreadsheet && args.element.id === spreadsheet.element.id + '_contextmenu') {
            spreadsheet.addContextMenuItems([{ text: 'Vyhľadať položku', id: 'customItem', iconCss: 'e-icons e-search' }], 'Paste Special', false);
            // spreadsheet.removeContextMenuItems(['Insert Column'], false);
        }
    };

    useEffect(() => {
        const divElements = document.querySelectorAll('div');

        divElements.forEach((div) => {
            const computedStyle = window.getComputedStyle(div);

            if(computedStyle.getPropertyValue('z-index') === '999999999')
                div.style.display = 'none';
            
            else if(computedStyle.getPropertyValue('z-index') === '99999')
                div.style.display = 'none'; 
        })

        if(file) spreadsheetRef.current.open({ file: file})

    }, [file]);


    const onMenuItemSelect = (args) => {

        let spreadsheet = spreadsheetRef.current;

        if (spreadsheet && args.item.id === 'customItem') {

            let [startCell, endCell] = activeCell.split(':');

            if (startCell === endCell) {
                // Only one cell is selected
                let cellAddress = spreadsheet.getActiveSheet().name + '!' + startCell;
                spreadsheet.getData(cellAddress).then((data) => {

                    let cellData = data.get(startCell).value;
                    
                    setCellData(cellData)

                    fetch('https://api.nacento.online/api/get_items/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "text" : cellData
                        }),
                        })
                        .then((response) => response.json())
                        .then((data) => {
                            setOpenPopup(true)
                            setItems(data)

                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                });

            } else {
                // More than one cell is selected
                console.log('More than one cell is selected');
            }

        }
    };
    
	return (
        <div className="h-[120vh]">

            {openPopup && 
                <PopUp title={"✨ Zhody v databáze"} open={openPopup} setOpen={setOpenPopup}> 
                    
                    <div className="pb-6">
                        <span className="opacity-50">Položka:</span> {cellData} 
                    </div>
                    <ItemTable data={items} setOpenPopup={setOpenPopup}/>

                </PopUp>
            }

            <SpreadsheetComponent allowOpen={true}
                openUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open"
                saveUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save"
                allowSave={true}
                select={(e) => setActiveCell(e.range)}
                ref={spreadsheetRef}
                contextMenuBeforeOpen={onContextMenuBeforeOpen}
                contextMenuItemSelect={onMenuItemSelect}
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


function ItemTable({data, setOpenPopup}){


    return(
        <table>
            <thead className="">
                <tr style={{ textAlign: 'left' }}>
                <th className="opacity-50 px-2 text-xs text-center"></th>
                <th className="px-2">Popis</th>
                <th className="px-2">Zhoda</th>
                <th className="px-2">Jednotková cena</th>
                </tr>
            </thead>
            <tbody className="mt-2">
                {data?.items.map((item, ix) => (
                <tr key={item.itemId}>
                    <td className="opacity-50 text-center px-2"> {ix+1} </td>
                    <td className="px-2">{item.description}</td>
                    {/* <td className="text-center px-2"> { getPrecisionDescription(data.distances[ix])} </td> */}
                    <td className="text-center"> { <DistanceState distance={data.distances[ix]}/> } </td>
                    <PriceComponent price={item.price.toFixed(2)} setOpenPopup={setOpenPopup}/>
                </tr>
                ))}
            </tbody>
        </table>
    )
}

function PriceComponent({ price, setOpenPopup }){
    const [hovered, setHovered] = useState(false)

    const handleCopyClick = async () => {
        try {
          await navigator.clipboard.writeText(price);
          toast('Cena skopírovaná', { type: "success" , autoClose: 3000});
          setOpenPopup(false)
          
        } catch (error) {
          console.error('Failed to copy text: ', error);
        }
      };

    return(
        <td onClick={handleCopyClick} className="text-center px-2 flex items-center gap-2 justify-center cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>

                <span>{price}€</span>
                <span className={"transition-opacity " + (hovered ? 'opacity-30' : 'opacity-0')}><Copy/></span>
                
            </td>
    )
}


function DistanceState({distance}){
    if(distance <= 0.3) return <span className="bg-green-500 px-2 rounded-full">Najvyššia</span>
    else if(distance <= 0.5) return <span className="bg-green-300 px-2 rounded-full">Vysoká</span>
    else if(distance <= 0.7) return <span className="bg-yellow-300 px-2 rounded-full">Dobrá</span>
    else return <span className="bg-orange-300 px-2 rounded-full">Nízka</span>
}

