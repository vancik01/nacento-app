import "react-tooltip/dist/react-tooltip.css";
import React, { useEffect } from "react";

import HomeArea from "../components/landing_page/HomeArea";
import About from "../components/landing_page/About";
import Functions from "../components/landing_page/Functions";
import Footer from "../components/landing_page/Footer";
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
