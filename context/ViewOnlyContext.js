import React, { useContext } from "react";

const ViewOnly = React.createContext();

export default function ViewOnlyContext({ dbData, children }) {
	const value = {
		dbData,
		data: dbData.data,
		headers: dbData.data.headers,
	};

	return <ViewOnly.Provider value={value}>{children}</ViewOnly.Provider>;
}

export function useViewOnly() {
	return useContext(ViewOnly);
}
