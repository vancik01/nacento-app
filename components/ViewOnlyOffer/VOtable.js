import React, {useState} from 'react';
import {Tooltip} from "react-tooltip";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {useData} from "../../context/AppWrap";
import {useLayout} from "../../context/LayoutContext";
import ButtonIcon from "../buttons/ButtonIcon";
import TrashBin from "../../public/SVG/editor/TrashBin";
import DragableIcon from "../../public/SVG/Dragable";
import Save from "../../public/SVG/Save";
import {Input, TextareaAutosize} from "@mui/material";
import {getTitle} from "../../lib/helpers";
import {useViewOnly} from "../../context/ViewOnlyContext";

const VOtable = ({items, headers, blockId, sectionId}) => {

    const {displayColumns, tableRowTemplate, primaryColor} = useLayout();
    return (
        <>
            {
                <div key={blockId}>
                    <div style={{backgroundColor: primaryColor}} className="text-white">
                        <div
                            className="table_row heading select-none"
                            style={{gridTemplateColumns: tableRowTemplate}}
                        >
                            <div className="font-medium py-1 px-2">N.</div>
                            {headers.map((item, i) => {
                                var heading = getTitle(item, "sk");
                                if (displayColumns.includes(item)) {
                                    return (
                                        <div key={`table-header-${i}`}>
                                            <div
                                                className={`font-medium ${heading.short} py-1 px-2`}
                                                style={{color: "white"}}
                                            >
                                                <Tooltip
                                                    id="tooltip"
                                                    anchorSelect={`#col-${i}`}
                                                    place="top"
                                                    content={heading.long}
                                                    delayHide={3}
                                                />
                                                <span id={`col-${i}`}>{heading.short}</span>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>

                    <div>
                        {items?.map((polozka, i) => {
                            return (
                                <TableRow
                                    blockId={blockId}
                                    i={i}
                                    polozka={polozka}
                                    rowsCount={items.length}
                                ></TableRow>
                            );
                        })}
                    </div>
                </div>
            }
        </>
    );
};

export default VOtable;

function TableRow({polozka, blockId, i, rowsCount, sectionId}) {
    const {headers} = useViewOnly();
    const {displayColumns, tableRowTemplate, primaryColor} = useLayout();
    const [didChange, setdidChange] = useState(false);
    const [item, setitem] = useState(polozka);

    return (
        <div className="relative">
            <div
                className={`table_row content ${i === rowsCount - 1 ? "last" : ""}`}
                style={{gridTemplateColumns: tableRowTemplate}}
            >
                <div
                    className={`flex justify-center items-center select-none h-full py-1 table_unit`}
                >
                    {i + 1}
                </div>

                {headers.map((item) => {
                    var label = getTitle(item, "sk");

                    if (displayColumns.includes(item)) {
                        return (
                            <div
                                key={`value-${sectionId}-${blockId}-${item}-${item}`}
                                className="h-full flex items-center justify-start py-1 px-2 table_unit"
                            >
                                <TableUnit
                                    sectionId={sectionId}
                                    itemId={i}
                                    blockId={blockId}
                                    item={item}
                                    polozka={polozka}
                                    label={label}
                                />
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
}

function TableUnit({item, polozka, label}) {

    if (item === "service_type") {
        return (
            <div className={`flex align-middle items-center ${label.short}`}>
                {polozka.service_type}
            </div>
        );
    } else if (item === "item_id") {
        return (
            <div className={`flex align-middle items-center ${label.short}`}>
                {polozka.item_id}
            </div>
        );
    } else if (item === "title") {
        return (
            <div className={`flex align-middle items-center w-full ${label.short}`}>
                <div>{polozka.title}</div>
            </div>
        );
    } else if (item === "unit") {
        return (
            <div className={`flex align-middle items-center w-full ${label.short}`}>
                <div>{polozka.unit}</div>
            </div>
        );
    } else if (item === "quantity") {
        return (
            <div className={`flex align-middle items-center ${label.short}`}>
                <div>{polozka.quantity}</div>
            </div>
        );
    } else if (item === "unit_delivery_price") {
        return (
            <div className={`flex align-middle items-center ${label.short}`}>
                <div>{parseFloat(polozka.unit_delivery_price).toFixed(2)} €</div>
            </div>
        );
    } else if (item === "unit_construction_price") {
        return (
            <div className={`flex align-middle items-center ${label.short}`}>
                <div>{parseFloat(polozka.unit_construction_price).toFixed(2)} €</div>
            </div>
        );
    } else if (item === "total_delivery_price") {
        return (
            <div className={`flex justify-center items-center ${label.short}`}>
                <div>{parseFloat(polozka.total_delivery_price).toFixed(2)} €</div>
            </div>
        );
    } else if (item === "total_construction_price") {
        return (
            <div className={`flex align-middle items-center ${label.short}`}>
                <div>{parseFloat(polozka.total_construction_price).toFixed(2)} €</div>
            </div>
        );
    } else if (item === "total") {
        return (
            <div>{parseFloat(polozka.total).toFixed(2)} €</div>
        );
    }
}