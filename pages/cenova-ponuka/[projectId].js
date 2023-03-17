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

			<AppWrap dbData={dbData.data} dbName={dbData.name}>
				<LayoutContext>
					<ScreenLayout />
				</LayoutContext>
			</AppWrap>
		</ThemeProvider>
	);
}

async function getServerSideProps(context) {
	console.log(context.query.projectId);
	const projectId = context.query.projectId;
	console.log("Lol");

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
