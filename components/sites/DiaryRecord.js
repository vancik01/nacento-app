import React from 'react'


function DiaryRecord({ record }){

	return(
		<div className="mt-5">
			{record.date && <div>
				<span className="opacity-50">Dátum: </span>
				{record.date}
			</div>}

			{record.weather && <div>
				<span className="opacity-50">Počasie: </span>
				{record.weather}
			</div>}

			{record.description && <div className="mt-5" style={{ whiteSpace: 'pre-line' }}> {record.description} </div>}

			<hr className="w-full mt-4"/>

		</div>
	)
}

export default DiaryRecord
