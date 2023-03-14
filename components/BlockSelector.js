import React, { useEffect, useState } from "react";

import { useData } from "../context/AppWrap";

import ArrowDown from "../public/SVG/ArrowDown";
import { AccordionDetails } from "@mui/material";
import { Accordion } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import PageIcon from "../public/SVG/PageIcon";
import Plus from "../public/SVG/buttons/Plus";

import { elektorinstalacie } from "../public/subory-prac/elektroinstalacie";
import vykurovanie from "../public/subory-prac/vykurovane.json";

function BlockSelector() {
	const { data } = useData();
	const [subory_prac, setsubory_prac] = useState([]);
	useEffect(() => {
		setsubory_prac([{ ...elektorinstalacie }, { ...vykurovanie }]);
	}, [data]);

	useEffect(() => {
		console.log(subory_prac);
	}, [subory_prac]);

	//const subory_prac = [{...elektroinstalacie}, {...vykurovanie}]

	const { addBlockFull, addBlock, addSection } = useData();

	function handleAddBlock(suborId, sectionId, blockId) {
		var newData = { ...subory_prac };
		let new_section = newData[suborId].sections[sectionId];
		let new_block = newData[suborId].sections[sectionId].blocks[blockId];
		new_section.blocks = [new_block];
		addBlockFull(new_section, new_block);
	}

	return (
		<div className="pt-5">
			<div className="pb-3"> Pridať do ponuky: </div>

			{subory_prac.map((subor, suborId) => {
				return (
					<div key={`subor-${suborId}`}>
						<Accordion>
							<AccordionSummary
								expandIcon={<ArrowDown />}
								onClick={() => {
									console.log("click");
								}}
							>
								<div className="flex items-center gap-2">
									<div className="w-4">
										<PageIcon color={"blue"}></PageIcon>
									</div>
									<div>{subor.title}</div>
								</div>
							</AccordionSummary>

							<AccordionDetails>
								<div className="flex-row">
									{subor["sections"].map((section, sectionId) => {
										return (
											<Accordion key={`subor-${suborId}-section${sectionId}`}>
												<AccordionSummary expandIcon={<ArrowDown />}>
													<div className="flex justify-center gap-5">
														{section.info.title}
													</div>
												</AccordionSummary>

												<AccordionDetails>
													<div className="flex flex-col gap-3 pr-2">
														{section["blocks"].map((block, blockId) => {
															return (
																<div
																	key={`subor-${suborId}-section${sectionId}-block-${blockId}`}
																	className="flex items-center gap-3"
																>
																	<div>{block.info.title}</div>
																	<button
																		onClick={() =>
																			handleAddBlock(
																				suborId,
																				sectionId,
																				blockId
																			)
																		}
																	>
																		+
																	</button>
																</div>
															);
														})}
													</div>
												</AccordionDetails>
											</Accordion>
										);
									})}
								</div>
							</AccordionDetails>
						</Accordion>

						{/* <div className='text-base flex items-center gap-2'> 
                <button> {subor.title} </button>
                <ArrowDown/>
             </div> */}
					</div>
				);
			})}
		</div>
	);
}

export default BlockSelector;
