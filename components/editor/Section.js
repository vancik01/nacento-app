import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useData } from "../../context/AppWrap";
import { useLayout } from "../../context/LayoutContext";
import { numberWithCommas } from "../../lib/helpers";
import TrashBin from "../../public/assets/editor/TrashBin";
import EditPen from "../../public/assets/editor/EditPen";
import Block from "./Block";
import ButtonIcon from "../buttons/ButtonIcon";
import AddBlock from "./AddBlock";
import EditText from "./EditText";
import { getValue } from "../../context/ValuesContext";

export default function Section({ sectionId, isLast }) {
	const {
		headers,
		reorderingBlocks,
		deleteSection,
	} = useData();

	const { variant } = useLayout();

	const [section] = getValue((data) => data.data.sections[sectionId]);

	return (
		<div
			key={`section-${sectionId}`}
			className='pb-16 relative'
			id={isLast ? "last-section" : ""}
		>
			<SectionTotals sectionId={sectionId}></SectionTotals>

			{!reorderingBlocks &&
				variant.blocks &&
				section.blocks.map((block, j) => {
					return (
						<div key={`this-is-block-${j}-in-section-${sectionId}`}>
							<Block
								sectionId={sectionId}
								headers={headers}
								blockId={j}
								collapsed={reorderingBlocks}
							/>
						</div>
					);
				})}

			{section.blocks.length == 0 && (
				<AddBlock sectionId={sectionId}></AddBlock>
			)}

			{reorderingBlocks && (
				<ReorderingBlocks section={section} sectionId={sectionId} />
			)}
			<div className='absolute right-4 top-2 flex items-center gap-4 w-fit mt-2'>
				<ButtonIcon
					id={"0"}
					icon={<TrashBin color='#9ca3af' />}
					tooltip='Zmazať sekciu'
					onClick={() => {
						deleteSection(sectionId);
					}}
				/>
			</div>
		</div>
	);
}

function ReorderingBlocks({ section, sectionId }) {
	const { headers, total, reorderBlocks } = useData();
	return (
		<DragDropContext
			onDragEnd={(e) => {
				reorderBlocks(e, sectionId);
			}}
		>
			<Droppable droppableId={`block`}>
				{(provided) => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						{section.blocks.map((block, i) => {
							return (
								<Draggable key={i} draggableId={`block-${i}`} index={i}>
									{(provided) => (
										<div {...provided.draggableProps} ref={provided.innerRef}>
											<Block
												key={i}
												block={block}
												headers={headers}
												number={i}
												collapsed={true}
												sectionId={sectionId}
												blockId={i}
												dragHandleProps={{ ...provided.dragHandleProps }}
											/>
										</div>
									)}
								</Draggable>
							);
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}

function SectionTotals({ sectionId }) {
	const [total] = getValue((data) => parseFloat(data.data.sections[sectionId].info.total))
	const [total_delivery_price] = getValue(
		(data) => parseFloat(data.data.sections[sectionId].info.total_delivery_price)
	);
	const [total_construction_price] = getValue(
		(data) => parseFloat(data.data.sections[sectionId].info.total_construction_price)
	);

	const [title] = getValue((data) => data.data.sections[sectionId].info.title);

	const {
		openBulkEdit,
		changeSectionTitle,
	} = useData();

	return (
		<div className='p-8 border-2'>
			<EditText
				initialValue={title}
				onSave={(value) => {
					changeSectionTitle(sectionId, value);
				}}
			/>

			<div className='mb-1 text-gray-300 capitalize'>CENA:</div>

			<div className='text-sm flex flex-row items-center justify-between'>
				<div className='relative w-fit text-sm'>
					<button
						onClick={(e) => {
							openBulkEdit(
								{
									sectionId: sectionId,
									blockId: -1,
									value: total_construction_price,
									valueId: "total_construction_price",
									mode: "section",
								},
								e
							);
						}}
					>
						<div className='relative'>
							<div className='text-left'>
								Cena Montáže: <br />
								{numberWithCommas(
										total_construction_price.toFixed(2)
									)}{" "}
									€
							</div>
							<div className='absolute top-0 -right-3 w-2'>
								<EditPen></EditPen>
							</div>
						</div>
					</button>
				</div>

				<div className='relative w-fit text-sm'>
					<button
						onClick={(e) => {
							openBulkEdit(
								{
									sectionId: sectionId,
									blockId: -1,
									value: total_delivery_price,
									valueId: "total_delivery_price",
									mode: "section",
								},
								e
							);
						}}
					>
						<div className='relative'>
							<div className='text-start'>
								Cena Dodávky: <br />
								{numberWithCommas(total_delivery_price.toFixed(2))} €
							</div>
							<div className='absolute top-0 -right-3 w-2'>
								<EditPen></EditPen>
							</div>
						</div>
					</button>
				</div>

				<div className='relative w-fit text-sm'>
					<button
						onClick={(e) => {
							openBulkEdit(
								{
									sectionId: sectionId,
									blockId: -1,
									value: total,
									valueId: "total",
									mode: "section",
								},
								e
							);
						}}
					>
						<div className='relative'>
							<div className='text-left'>
								Spolu: <br />
								{numberWithCommas(total.toFixed(2))} €{" "}
								<span className='text-[10px]'>bez DPH</span>
							</div>
							<div className='absolute top-0 -right-3 w-2'>
								<EditPen></EditPen>
							</div>
						</div>
					</button>
				</div>
			</div>

			{/* {variant.sectionSummary && (
				<SectionSummary
					sectionsLength={data.sections.length}
					sectionId={sectionId}
					blocks={section.blocks}
				/>
			)} */}
		</div>
	);
}

function SectionRecapitulation({ section }) {
	return <div></div>;
}
