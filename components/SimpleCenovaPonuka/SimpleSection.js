import React, { useState } from "react";
import SimpleBlock from "./SimpleBlock";

export default function SimpleSection({ section,  data}) {

	return (
		<div className="pb-16 relative">
			<div className="p-8 border-2">

				<div className="text-center relative" style={{ fontSize: 20 }}>
					<span>{section.info.title}</span>
				</div>

				<div className="mb-1 text-gray-300 capitalize">CENA:</div>

				<div className="text-sm flex flex-row items-center justify-between">
					<div className="relative w-fit text-sm">
						
							<div className="relative">
								<div className="text-left">
									Cena Montáže: <br />
									
										{section.info.total_construction_price} €

								</div>
	
							</div>

					</div>

					<div className="relative w-fit text-sm">
						
						
							<div className="relative">
								<div className="text-start">
									Cena Dodávky: <br />
									{section.info.total_delivery_price} €
								</div>
								
							</div>
					</div>

					<div className="relative w-fit text-sm">
						
							<div className="relative">
								<div className="text-left">
									Spolu: <br />
									{section.info.total} €
									<span className="text-[10px]">bez DPH</span>
								</div>
								
							</div>
					</div>
				</div>

			</div>

			
			<SimpleBlock
				block={section.blocks[0]}
				headers={data.headers}
			/>			


		</div>
	);
}
