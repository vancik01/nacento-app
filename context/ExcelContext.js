import React, { useContext, useEffect, useState } from "react";


const Template = React.createContext();

export default function ExcelContext({ children }) {
    const [ file, setFile ] = useState(null)

	const value = {
		file, setFile
	};

	return (
		<>
			<Template.Provider value={value}>
				<>{children}</>
			</Template.Provider>
		</>
	);
}

export function useExcel() {
	return useContext(Template);
}
