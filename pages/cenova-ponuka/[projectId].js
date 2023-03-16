import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import "react-tooltip/dist/react-tooltip.css";
import Head from "next/head";
import React from "react";
import { AppWrap } from "../../context/AppWrap";
import LayoutContext from "../../context/LayoutContext";
import ScreenLayout from "../../components/ScreenLayout";
export default function Home({ lolec }) {
	console.log(lolec, "WOCAP");
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

			<AppWrap>
				<LayoutContext>
					<ScreenLayout />
				</LayoutContext>
			</AppWrap>
		</ThemeProvider>
	);
}

export async function getServerSideProps() {
	console.log("Lol");

	const docRef = doc(firestore, `/offers/${projectId}`);
	getDoc(docRef).then((snap) => {
		if (snap.exists()) {
			//setdata({ ...snap.data().data });
			//setheaders(snap.data().data.headers);
			//setname(snap.data().name);
			return {
				props: {
					dbData: { ...snap.data().data },
					dbName: snap.data().name,
				},
			};
		}
	});
}
