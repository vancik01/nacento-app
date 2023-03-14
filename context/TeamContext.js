import React, { useEffect, useState } from "react";
const Team = React.createContext();
export default function TeamContext({ children }) {
	const value = {};
	const [team, setteam] = useState(null);

	useEffect(() => {
		const teamId = localStorage.getItem("teamId");
		if (!teamId) {
			console.log("Missing team id");
			return;
		}

		setteam();
	}, []);

	return <Team.Provider value={value}>{children}</Team.Provider>;
}
