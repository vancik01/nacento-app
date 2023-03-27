import "react-tooltip/dist/react-tooltip.css";
import React, { useEffect } from "react";

import { useRouter } from "next/router";
import FullPageLoading from "../components/loading/FullPageLoading";

export default function Home() {
	const router = useRouter();
	useEffect(() => {
		router.push("/dashboard");
	}, []);

	return (
		<>
			<FullPageLoading loading={true}></FullPageLoading>
		</>
	);
}
