import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import Slide1 from "../components/user_setup/Slide1";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";
import Next from "../public/SVG/user_setup/Next";
import Slide2 from "../components/user_setup/Slide2";
import Back from "../public/SVG/user_setup/Back";
import Slide3 from "../components/user_setup/Slide3";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import Slide4 from "../components/user_setup/Slide4";
import { useAuth } from "../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../lib/firebase";
import { useRouter } from "next/router";

const Setup = React.createContext();

export default function UserSetup() {
	const { userData, user } = useAuth();
	const [page, setpage] = useState(0);
	const [allowNext, setallowNext] = useState(false);
	const [userObject, setuserObject] = useState({ ...userData });
	const router = useRouter();

	useEffect(() => {
		console.log(userObject);
	}, [userObject]);

	function nextPage() {
		setallowNext(false);
		setpage(page + 1);
	}
	function prevPage() {
		setpage(page - 1);
	}

	function handleSave() {
		const docRef = doc(firestore, `/users/${user.uid}`);
		updateDoc(docRef, {
			...userObject,
			setup: true,
		}).then(() => {
			router.push("/dashboard/");
		});
	}

	const theme = createTheme({
		typography: {
			fontFamily: "Poppins",
			fontSize: 12,
		},
		palette: {
			primary: {
				main: "#361CC1",
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Setup.Provider
				value={{
					userObject,
					setuserObject,
					allowNext,
					setallowNext,
					handleSave,
				}}
			>
				<div>
					<Layout className="">
						<div className="mx-auto h-[500px] max-w-2xl min-h-screen flex flex-col justify-center items-center">
							{userData.setup == false ? (
								<div>
									<div>{page == 0 && <Slide1></Slide1>}</div>
									<div>{page == 1 && <Slide2></Slide2>}</div>
									<div>{page == 2 && <Slide3></Slide3>}</div>
									<div>{page == 3 && <Slide4></Slide4>}</div>

									{/* Navigation */}
									<div className="mt-10 flex items-center gap-4">
										{page != 0 && (
											<ButtonSecondary
												onClick={prevPage}
												icon={<Back></Back>}
												iconBefore
												color="#361CC1"
											>
												Späť
											</ButtonSecondary>
										)}

										{page != 3 && (
											<ButtonPrimary
												icon={<Next></Next>}
												iconAfter
												disabled={!allowNext}
												color="#361CC1"
												onClick={nextPage}
											>
												Ďalej
											</ButtonPrimary>
										)}

										{page == 3 && (
											<ButtonPrimary
												icon={<Next></Next>}
												iconAfter
												disabled={!allowNext}
												color="#361CC1"
												onClick={handleSave}
											>
												Uložiť
											</ButtonPrimary>
										)}
									</div>
								</div>
							) : (
								<>
									<div className="mb-2">Váš účet je už nakonfigurovaný</div>
									<ButtonPrimary color="#361CC1" href="/nastavenie-uctu/">
										Môj účet
									</ButtonPrimary>
								</>
							)}
						</div>
					</Layout>
				</div>
			</Setup.Provider>
		</ThemeProvider>
	);
}
export function useSetup() {
	return useContext(Setup);
}
