import { ThemeProvider } from "@emotion/react";
import { TextField } from "@mui/material";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ButtonLoading from "../components/ButtonLoading";
import Layout from "../components/Layout";
import FullPageLoading from "../components/loading/FullPageLoading";
import { LoggedIn } from "../components/LoggedIn";

import { useAuth } from "../context/AuthContext";
import { firestore } from "../lib/firebase";
import { firebaseError, validateEmail } from "../lib/helpers";
import IconGoogle from "../public/SVG/IconGoogle";
import Logo from "../public/SVG/Logo";
import moment from "moment/moment";

export default function CreateAccount() {
	const { signInWithGoogle, createUser, user } = useAuth();
	const router = useRouter();
	const [userloading, setuserloading] = useState(false);
	const [googleLoading, setgoogleLoading] = useState();
	const [error, seterror] = useState({
		email: "",
		password: "",
		repeatPassword: "",
		firebaseError: "",
	});

	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [repeatPassword, setrepeatPassword] = useState("");

	function handleSubmit() {
		seterror();

		firebaseError("");
		var newError = {
			email: "",
			password: "",
			repeatPassword: "",
			firebaseError: "",
		};
		var errorExists = false;

		if (!email) {
			newError.email = "Zadajte email";
			errorExists = true;
		} else if (!validateEmail(email)) {
			newError.email = "Email v nesprávnom formáte";
			errorExists = true;
		}

		if (!pass) {
			newError.password = "Zadajte heslo";
			errorExists = true;
		}

		if (!repeatPassword) {
			newError.password = "Zopakujte Heslo";
			errorExists = true;
		}

		if (pass && repeatPassword) {
			if (pass != repeatPassword) {
				newError.repeatPassword = "Heslá sa nezhodujú";
				errorExists = true;
			} else if (pass.length < 6) {
				newError.password = "Heslo musí obsahovať aspoň 6 znakov";
				errorExists = true;
			}
		}
		seterror(newError);
		if (!errorExists) {
			setuserloading(true);
			createUser(email, pass)
				.then((user) => {
					const docRef = doc(firestore, `/users/${user.user.uid}`);
					//console.log(docRef.path);
					setDoc(docRef, {
						email: email,
						createdAt: moment().valueOf(),
						account: "",
						name: "",
						supplyer: {},
						setup: false,
						intro: false,
					})
						.then(() => {
							router.push("/user-setup/");
						})
						.catch((err) => {
							console.log(err);
						});
					//console.log(user);
				})
				.catch((err) => {
					newError.firebaseError = firebaseError(err.code);
					seterror(newError);
					setuserloading(false);
				});
		}
	}

	function handleGoogle() {
		setgoogleLoading(true);
		signInWithGoogle()
			.then((user) => {
				const docRef = doc(firestore, `/users/${user.user.uid}`);

				getDoc(docRef).then((snap) => {
					if (!snap.exists()) {
						//const docRef = doc(firestore, `/users/${user.user.uid}`);
						//console.log(docRef.path);
						setDoc(docRef, {
							email: user.user.email,
							createdAt: moment().valueOf(),
							account: "",
							name: "",
							supplyer: {},
							setup: false,
							intro: false,
						})
							.then(() => {
								router.push("/user-setup/");
							})
							.catch((err) => {
								console.log(err);
							});
					} else if (snap.data().setup == false) {
						router.push("/user-setup/");
					} else {
						router.push("/dashboard");
					}
				});
			})
			.catch((err) => {
				seterror({ firebaseError: "Chyba pri prihlasovaní" });
				setgoogleLoading(false);
			});
	}

	return (
		<>
			<FullPageLoading loading={googleLoading}></FullPageLoading>

			<Layout className="pt-8">
				<div className="w-32">
					<Logo></Logo>
				</div>
			</Layout>

			<div className="h-screen -mt-20">
				<div className="flex justify-center items-center h-full max-w-xs mx-auto">
					{user == null && (
						<div className="w-full">
							<h1 className="text-5xl font-light w-full text-center">
								Vytvorit Účet
							</h1>
							<div className="flex flex-col mt-4">
								<div className="h-48 flex flex-col gap-4 ">
									<div className="text-red-600 text-center">
										{error.firebaseError && firebaseError(error.firebaseError)}
									</div>

									<TextField
										label="Email"
										variant="filled"
										type={"email"}
										name="email"
										onChange={(e) => {
											setEmail(e.target.value);
										}}
										error={error.email != ""}
										helperText={error.email}
									/>
									<TextField
										label="Heslo"
										variant="filled"
										type={"password"}
										name="email"
										onChange={(e) => {
											setPass(e.target.value);
										}}
										error={error.password != ""}
										helperText={error.password}
									/>

									<TextField
										label="Zopakujte Heslo"
										variant="filled"
										type={"password"}
										name="email"
										onChange={(e) => {
											setrepeatPassword(e.target.value);
										}}
										error={error.repeatPassword != ""}
										helperText={error.repeatPassword}
									/>

									<ButtonLoading
										className=""
										loading={userloading}
										onClick={handleSubmit}
									>
										Vytvoriť účet
									</ButtonLoading>
								</div>

								<div className="w-full h-4 py-10 mt-32">
									<div className="relative  h-[1px] bg-gray-300">
										<div className="absolute px-4 left-0 right-0 top-0 bottom-0 flex items-center justify-center">
											<div className="bg-white px-4 text-sm text-gray-300">
												alebo
											</div>
										</div>
									</div>
								</div>

								<button
									onClick={handleGoogle}
									className="w-full py-2 rounded-sm border"
								>
									<div className="flex items-center justify-center gap-4">
										<div className="w-6">
											<IconGoogle></IconGoogle>
										</div>
										<div>Prihlásiť sa cez Google</div>
									</div>
								</button>
								<Link href="/login">
									<div className="text-sm underline mt-4 text-center text-gray-300">
										Už mám účet
									</div>
								</Link>
							</div>
						</div>
					)}

					{user && <LoggedIn />}
				</div>
			</div>
		</>
	);
}
