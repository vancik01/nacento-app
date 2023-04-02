import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import "react-tooltip/dist/react-tooltip.css";
import Head from "next/head";
import React from "react";
import { AppWrap } from "../../context/AppWrap";
import LayoutContext from "../../context/LayoutContext";
import ScreenLayout from "../../components/ScreenLayout";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import ActionsContext from "../../context/ActionsContext";

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
				<AppWrap dbData={dbData}>
					<ActionsContext>
						<ScreenLayout />
					</ActionsContext>
				</AppWrap>
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
