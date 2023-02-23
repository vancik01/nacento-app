import { Link } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ArrowDown from "../../public/SVG/ArrowDown";
import AccountToolbar from "./AccountToolbar";

export default function UserInfoHeader() {
	const { user, loading } = useAuth();
	const [toolbar, settoolbar] = useState(false);
	return (
		<>
			{user ? (
				<div className="relative">
					<button
						onClick={() => {
							settoolbar(!toolbar);
						}}
						className="flex justify-center items-center gap-4"
					>
						<div className="flex justify-start items-center gap-2">
							<div className="font-light text-gray-400">
								{user.displayName ? user.displayName : user.email}
							</div>
							<div
								className="transition-all"
								style={{ rotate: toolbar ? "180deg" : "0deg" }}
							>
								<ArrowDown color={"#C0C0C0"}></ArrowDown>
							</div>
						</div>
						{user.photoURL && (
							<div className="h-8">
								<img
									src={user.photoURL}
									className="h-full aspect-square rounded-full"
									alt=""
								/>
							</div>
						)}
					</button>

					<AnimatePresence>{toolbar && <AccountToolbar />}</AnimatePresence>
				</div>
			) : (
				<>{!loading && <Link href="/login">Prihláste sa</Link>}</>
			)}
		</>
	);
}
