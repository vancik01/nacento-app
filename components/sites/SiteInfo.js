import React from 'react'
import { useAuth } from '../../context/AuthContext'
import moment from 'moment/moment';

function SiteInfo({ site}) {
    const { employees } = useAuth()

	let start = site.dates[0]
	let end = site.dates[1]

	let startDate, endDate = "";

	if(start){
		const momentDate = moment(start);
		momentDate.locale('sk');
		startDate = momentDate.format('LL');
	}
	if(end){
		const momentDate = moment(end);
		momentDate.locale('sk');
		endDate = momentDate.format('LL');
	}

  return (
    <div>
      <div className="mt-8 text-3xl font-semibold">
					{site.icon}{" "}{site.name}
				</div>

				<div className="mt-4">
					<span className="opacity-50">Lokalita: </span>{site.location}{" "}📌
				</div>


				{start && 
					<div className="mt-2">
						<span className="opacity-50">Výstavba: </span>{startDate}

						{end && <span> - {endDate}</span>}{" "}🏁

					</div>
				}

				{employees.length &&
				<div className="mt-1">
					<span className="opacity-50">Prístup: </span>
						{employees.map((employee, ix) => 
							<img src={employee.img}  alt="employee" key={`emp${ix}`} width={32} className="inline-block opacity-100"
							style={{ transform: `translateX(-${ix * 13}px)` }}
							/>)
						}
				</div> 
				}
    </div>
  )
}

export default SiteInfo
