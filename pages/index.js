import "react-tooltip/dist/react-tooltip.css";
import React from "react";

import HomeArea from "../components/landing_page/HomeArea";
import About from "../components/landing_page/About";
import Functions from "../components/landing_page/Functions";
import Footer from "../components/landing_page/Footer";

export default function Home() {
	return (
		<>
			<HomeArea />
			<About />
			<Functions />
			<Footer />
		</>
	);
}
