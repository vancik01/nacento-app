import React from "react";
import EditPen from "../../public/SVG/EditPen";
import VOtable from "./VOtable";
import {useData} from "../../context/AppWrap";
import {useLayout} from "../../context/LayoutContext";

export default function VOblock({block, headers, blockId, sectionId}) {


    return (<>
        {block != null && (
            <div
                className={`bg-white rounded-md mb-24`}
                key={blockId}
            >
                <div className="flex justify-start items-center mb-4 text-xl">
                    <span className="mr-2">{blockId + 1}. </span>
                    <div>{block.info.title}</div>
                </div>

                <VOtable
                    sectionId={sectionId}
                    blockId={blockId}
                    items={block.items}
                    headers={headers}
                />

                <div className="flex flex-row gap-10 text-xs items-end justify-between mt-4">
                    <div className="flex justify-end items-center gap-6 w-full">
                        <div className=" w-fit">
                            <div>
                                Cena montáže celkom:{" "}
                                {parseFloat(block.info["total_construction_price"]).toFixed(2)}{" "}
                                €
                            </div>
                        </div>


                        <div className=" w-fit">
                            <div>
                                Cena dodávky celkom:{" "}
                                {parseFloat(block.info["total_delivery_price"]).toFixed(2)}{" "}
                                €
                            </div>
                        </div>


                        <div className=" w-fit">
                            <div className="font-bold">
                                Cena spolu: {" "} {parseFloat(block.info.total).toFixed(2)} €
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
    </>);
}
