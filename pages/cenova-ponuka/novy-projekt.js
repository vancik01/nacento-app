import Link from "next/link";
import React from "react";
import Functions from "../../components/landing_page/Functions";
import Layout from "../../components/Layout";
import FullPageLoading from "../../components/loading/FullPageLoading";
import { LoggedIn } from "../../components/LoggedIn";
import Logo from "../../public/SVG/Logo";

export default function NovyProjekt() {
	return (
		<>
			<FullPageLoading></FullPageLoading>

			<Layout className="pt-8">
				<div className="w-32">
					<Logo></Logo>
				</div>
			</Layout>

			<Layout className="min-h-screen mt-32 pb-32">
				<div className="flex justify-center items-center h-full mx-auto">
					{
						<div className="w-full">
							<h1 className="text-5xl font-light w-full text-center">
								Nový projekt
							</h1>
							<Functions></Functions>
						</div>
					}
				</div>
			</Layout>
		</>
	);
}
