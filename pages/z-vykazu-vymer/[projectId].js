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


import ExcelContext from "../../context/ExcelContext";

export default function Home({ dbData }) {
	const theme = createTheme({
		typography: {
			fontFamily: "Poppins",
			fontSize: 10,
		},
	});


    const data = {
        id: "4343",
        data: {
            customer: {
                name: "",
            },
            supplyer: {
                company_name: "",
                ico: "",
                dic: "",
                phone: "",
                email: "",
                web: "",
            },
            headers: [
                "service_type",
                "item_id",
                "title",
                "unit",
                "quantity",
                "unit_delivery_price",
                "unit_construction_price",
                "total_delivery_price",
                "total_construction_price",
                "total",
            ],
            sections: [],
        },
        name: "Nová cenová ponuka",
        created:100,
        userId: "none",
        totals: {
            total_delivery_price: 0,
            total_construction_price: 0,
            total: 0,
        },
        lastModified: 6546,
    }


	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>Excel Dokument</title>
			</Head>

            <LayoutContext headers={data.data.headers}>
				<AppWrap dbData={data}>
					<ActionsContext>
						<UseStepperContext>
							<ApiContext>

								    <ScreenLayout excel/>

							</ApiContext>
						</UseStepperContext>
					</ActionsContext>
				</AppWrap>
			</LayoutContext>
            
            

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
