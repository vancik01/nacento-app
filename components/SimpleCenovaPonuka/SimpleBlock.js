import React from "react";
import SimpleTable from "./SimpleTable"

export default function Block({ block,headers }) {

	return (
		<>
			{block != null && (
				<div>
					<div className={`bg-white rounded-md "py-6"`}>

						<div className="flex pt-6 items-center">
							<span className="mr-2 text-xl"> 1. </span>

							<div className="text-center relative" style={{ fontSize: 20 }}>
                                <span>{block.info.title}</span>
                            </div>

	
						</div>

						
                        <SimpleTable
                            items={block.items}
                            headers={headers}
                        />
						
					</div>
				</div>
			)}
		</>
	);
}
