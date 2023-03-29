import React from 'react';
import {useLayout} from "../../context/LayoutContext";

const VOsectionSummary = ({ blocks, sectionId, sectionsLength }) => {
    const {primaryColor} = useLayout();
    return (
        <div className="mt-4 table_wrap ">
            {blocks.length > 0 && (
                <div
                    className="grid py-2 text-white"
                    style={{
                        background: primaryColor,
                        gridTemplateColumns: "50px 1fr 140px 140px 140px",
                    }}
                >
                    <div className="text-center text-sm">N.</div>
                    <div className="pl-2 text-sm">Názov</div>
                    <div className="pl-2 text-sm">Cena Montáže</div>
                    <div className="pl-2 text-sm">Cena Dodávky</div>
                    <div className="pl-2 text-sm">Cena Celkom</div>
                </div>
            )}

            <div>
                {blocks.map((block, blockId) => {
                    return (
                        <div>
                            <div
                                className={`grid table_row content relative ${
                                    blockId === blocks.length - 1 ? "last" : ""
                                }`}
                                style={{
                                    gridTemplateColumns: "50px 1fr 140px 140px 140px",
                                }}
                            >
                                <div
                                    className="h-full flex items-center justify-start py-1 px-2 table_unit text-sm">
                                    {blockId + 1}
                                </div>
                                <div
                                    className="h-full flex items-center justify-start py-1 px-2 table_unit">
                                    {block.info.title}
                                </div>
                                <div
                                    className="h-full flex items-center justify-start py-1 px-2 table_unit">
                                    {parseFloat(
                                        block.info.total_construction_price
                                    ).toFixed(2)}{" "}
                                    €
                                </div>

                                <div
                                    className="h-full flex items-center justify-start py-1 px-2 table_unit">
                                    {parseFloat(
                                        block.info.total_delivery_price
                                    ).toFixed(2)}{" "}
                                    €
                                </div>

                                <div className="h-full flex items-center justify-start py-1 px-2 table_unit">
                                    {parseFloat(block.info.total).toFixed(2)} €
                                </div>

                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    );
};

export default VOsectionSummary;