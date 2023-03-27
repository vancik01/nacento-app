import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useLayout } from "../../context/LayoutContext";
import { useViewOnly } from "../../context/ViewOnlyContext";
import { numberWithCommas } from "../../lib/helpers";

import TrashBin from "../../public/SVG/editor/TrashBin";
import EditPen from "../../public/SVG/EditPen";
import ButtonIcon from "../buttons/ButtonIcon";
import VOblock from "./VOblock";
import VOsectionSummary from "./VOsectionSummary";

export default function VOsection({ section, sectionId, isLast }) {
	const { headers, data } = useViewOnly();
	const { primaryColor, variant } = useLayout();

	var total = {
		total: parseFloat(data.sections[sectionId].info.total),
		total_construction_price: parseFloat(
			data.sections[sectionId].info.total_construction_price
		),
		total_delivery_price: parseFloat(
			data.sections[sectionId].info.total_delivery_price
		),
	};

	return (
		<div
			key={`section-${sectionId}`}
			className="pb-16 relative"
			id={isLast ? "last-section" : ""}
		>
			<div className="p-8 border-2 mb-8">
				<div className="text-lg text-center">{section.info.title}</div>
				<div className="mb-1 text-gray-300 capitalize">CENA:</div>
				<div className="text-sm flex flex-row items-center justify-between">
					<div className="relative w-fit text-sm">
						<div className="relative">
							<div className="text-left">
								Cena Montáže: <br />
								{numberWithCommas(total.total_construction_price.toFixed(2))} €
							</div>
						</div>
					</div>

					<div className="relative w-fit text-sm">
						<div className="relative">
							<div className="text-start">
								Cena Dodávky: <br />
								{numberWithCommas(total.total_delivery_price.toFixed(2))} €
							</div>

						</div>
					</div>

					<div className="relative w-fit text-sm">
						<div className="relative">
							<div className="text-left">
								Spolu: <br />
								{numberWithCommas(total.total.toFixed(2))} €{" "}
								<span className="text-[10px]">bez DPH</span>
							</div>
						</div>
					</div>
				</div>
				 {variant.sectionSummary && (
					<VOsectionSummary
						sectionsLength={data.sections.length}
						sectionId={sectionId}
						blocks={section.blocks}
					/>
				)}
			</div>
			{variant.blocks &&
				section.blocks.map((block, j) => {
					return (
						<div key={`this-is-block-${j}-in-section-${sectionId}`}>
							<div>
								<VOblock
									sectionId={sectionId}
									key={j}
									block={block}
									headers={headers}
									blockId={j}
								/>
							</div>
						</div>
					);
				})}
		</div>
	);
}
