import { TextField } from "@mui/material";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ButtonLoading from "../components/buttons/ButtonLoading";
import Layout from "../components/editor/Layout";
import FullPageLoading from "../components/loading/FullPageLoading";
import { LoggedIn } from "../components/user_components/LoggedIn";

import { useAuth } from "../context/AuthContext";
import IconGoogle from "../public/assets/general/IconGoogle";
import moment from "moment/moment";

import Logo from "../public/assets/editor/Logo";
import { firestore } from "../lib/firebase";

export default function Login() {
	const { signInWithGoogle, loginWithEmailAndPassword, user, user_is_employee } = useAuth();
	const router = useRouter();
	const [userloading, setuserloading] = useState(false);
	const [googleLoading, setgoogleLoading] = useState();
	const [error, seterror] = useState("");
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	function handleSubmit() {
		seterror();
		setuserloading(true);

		loginWithEmailAndPassword(email, pass)
			.then((user) => {

				if(user_is_employee(user.uid)){
					setuserloading(false);
					seterror("Nesprávne meno alebo heslo");
					return;
				}
				
				else{
					router.push("/dashboard");
				}
			})
			.catch((err) => {
				setuserloading(false);
				seterror("Nesprávne meno alebo heslo");
			});
	}

	function handleGoogle() {
		setgoogleLoading(true);
		signInWithGoogle()
			.then((user) => {
				const docRef = doc(firestore, `/users/${user.user.uid}`);
				getDoc(docRef).then((snap) => {
					console.log(snap.data());
					if (!snap.exists() || snap.data().setup == false) {
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
								console.log("Navigate setup");
							})
							.catch((err) => {
								console.log(err);
							});
					} else {
						console.log("Navigate dashboard");
						router.push("/dashboard");
					}
				});
			})
			.catch((err) => {
				seterror("Chyba pri prihlasovaní");
				setgoogleLoading(false);
			});
	}

	return (
		<>
			<FullPageLoading loading={googleLoading}></FullPageLoading>

			<Layout className="pt-8">
				<div className="w-32">
					<Link href="/">
						<Logo></Logo>
					</Link>
				</div>
			</Layout>

			<div className="h-screen -mt-20">
				<div className="flex justify-center items-center h-full max-w-xs mx-auto">
					{!user && (
						<div className="w-full">
							<h1 className="text-5xl font-light w-full text-center">
								Prihlásiť sa
							</h1>
							<div className="flex flex-col mt-4">
								<div className="h-48 flex flex-col gap-4 ">
									<div className="text-red-600 text-center">{error}</div>

									<TextField
										label="Email"
										variant="filled"
										type={"email"}
										name="email"
										onChange={(e) => {
											setEmail(e.target.value);
										}}
									/>
									<TextField
										label="Heslo"
										variant="filled"
										type={"password"}
										name="email"
										onChange={(e) => {
											setPass(e.target.value);
										}}
									/>

									<ButtonLoading
										className=""
										loading={userloading}
										onClick={handleSubmit}
									>
										Prihlásiť sa
									</ButtonLoading>
								</div>

								<div className="w-full h-[1px] bg-gray-300 my-10 relative mt-20">
									<div className="absolute px-4 left-0 right-0 top-0 bottom-0 flex items-center justify-center">
										<div className="bg-white px-4 text-sm text-gray-300">
											alebo
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
								<Link href="/vytvorit-ucet">
									<div className="text-sm underline mt-4 text-center text-gray-300">
										Ešte nemám účet
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
