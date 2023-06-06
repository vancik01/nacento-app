import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import "react-tooltip/dist/react-tooltip.css";
import Head from "next/head";
import React from "react";
import { AppWrap } from "../../context/AppWrap";
import LayoutContext from "../../context/LayoutContext";
import ScreenLayout from "../../components/editor/ScreenLayout";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import ActionsContext from "../../context/ActionsContext";

import { UseStepperContext } from "../../context/StepperContext";
import { ApiContext } from "../../context/ApiContext";
import ValuesContext from "../../context/ValuesContext";


export default function Home({ dbData }) {
	const theme = createTheme({
		typography: {
			fontFamily: "Poppins",
			fontSize: 10,
		},
	});
	
	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>Cenová ponuka</title>
			</Head>

			<LayoutContext layout={dbData?.layout} headers={dbData.data.headers}>
				<ValuesContext dbData={dbData}>
					<AppWrap dbData={dbData}>
						<ActionsContext>
							<UseStepperContext>
								<ApiContext>

									<ScreenLayout />

								</ApiContext>
							</UseStepperContext>
						</ActionsContext>
					</AppWrap>
				</ValuesContext>
			</LayoutContext>

		</ThemeProvider>
	);
}

export async function getServerSideProps(context) {
	const projectId = context.query.projectId;

	const docRef = doc(firestore, `/offers/${projectId}`);
	const snap = await getDoc(docRef);
	if (snap.exists()) {
		return {
			props: {
				dbData: { ...snap.data() },
			},
		};
	}
}
