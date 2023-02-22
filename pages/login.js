import { ThemeProvider } from "@emotion/react";
import { TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ButtonLoading from "../components/ButtonLoading";
import Layout from "../components/Layout";
import FullPageLoading from "../components/loading/FullPageLoading";
import { LoggedIn } from "../components/LoggedIn";

import { useAuth } from "../context/AuthContext";
import IconGoogle from "../public/SVG/IconGoogle";

import Logo from "../public/SVG/Logo";

export default function Login() {
	const { signInWithGoogle, loginWithEmailAndPassword, user } = useAuth();
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
				router.push("/");
			})
			.catch((err) => {
				setuserloading(false);
				seterror("Nesprávne meno alebo heslo");
				console.log(err);
			});
	}

	function handleGoogle() {
		setgoogleLoading(true);
		signInWithGoogle()
			.then(() => {
				router.push("/");
			})
			.catch((err) => {
				seterror(err);
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
