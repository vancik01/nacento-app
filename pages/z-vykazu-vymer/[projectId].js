import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import "react-tooltip/dist/react-tooltip.css";
import Head from "next/head";
import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import { useRouter } from "next/router";

import ExcelEditor from "../../components/excelEditor/ExcelEditor";
import ButtonSecondary from "../../components/buttons/ButtonSecondary";
import ArrowBack from "../../public/assets/buttons/ArrowBack";

export default function Home() {
	const theme = createTheme({
		typography: {
			fontFamily: "Poppins",
			fontSize: 10,
		},
	});

    const router = useRouter();

	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>Excel Dokument</title>
			</Head>


            <div className="p-10">
                <div className="flex gap-10 pb-4">
                    <h1 className="text-2xl font-bold">Excel Editor</h1>

                    <ButtonSecondary
                        onClick={() => { router.replace("/dashboard");}}
                        iconBefore
                        icon={<ArrowBack color={"black"}></ArrowBack>}>
                        Zoznam ponúk
                    </ButtonSecondary>

                </div>
                
                
                <ExcelEditor/>
            </div>
            
            

		</ThemeProvider>
	);
}

export async function getServerSideProps(context) {
	const projectId = context.query.projectId;
    console.log(projectId)

	const docRef = doc(firestore, `/excels/${projectId}`);
	const snap = await getDoc(docRef);
	if (snap.exists()) {
		return {
			props: {
				dbData: { ...snap.data() },
			},
		};
	}
}
