import React, { useState, useRef, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import "react-tooltip/dist/react-tooltip.css";
import Head from "next/head";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

import ButtonSecondary from "../../components/buttons/ButtonSecondary";
import ArrowBack from "../../public/assets/buttons/ArrowBack";
import DashboardLayout from "../../components/dashboard/DashboardLayout";


import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterMoment } from '@mui/x-date-pickers-pro/AdapterMoment'
import "moment/locale/sk"

import ImagesComponent from "../../components/sites/ImagesComponent";
import SiteInfo from "../../components/sites/SiteInfo";
import Diary from "../../components/sites/Diary";

export default function Home({ site }) {

	const theme = createTheme({
		typography: {
			fontFamily: "Poppins",
			fontSize: 12,
		},
	});

	const router = useRouter();

	return (
		<LocalizationProvider dateAdapter={AdapterMoment} locale="sk">
		<ThemeProvider theme={theme}>
			
			<Head>
				<title>Stavba</title>
			</Head>


            <DashboardLayout scope={"stavba"}>

				<ButtonSecondary
                        onClick={() => { router.replace("/stavby");}}
                        iconBefore
                        icon={<ArrowBack color={"black"}></ArrowBack>}>
                        Späť
                </ButtonSecondary>

				<SiteInfo site={site}/>

				<ImagesComponent images={site.images}/> 

				<Diary site={site}/>

			</DashboardLayout>
            
            

		</ThemeProvider>
		</LocalizationProvider>
	);
}


export async function getServerSideProps(context) {
	const projectId = context.query.projectId;

	const docRef = doc(firestore, `/sites/${projectId}`);
	const snap = await getDoc(docRef);
	if (snap.exists()) {
		return {
			props: {
				site: { ...snap.data() },
			},
		};
	}
}
