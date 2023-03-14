import { Link } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ArrowDown from "../../public/SVG/ArrowDown";
import AccountToolbar from "./AccountToolbar";
import { motion } from "framer-motion";

export default function UserInfoHeader() {
	const [toolbar, settoolbar] = useState(false);
	const { user, loading, userData } = useAuth();

	return (
		<div>
			{user != null ? (
				<div className="relative z-50">
					<button
						onClick={() => {
							settoolbar(!toolbar);
						}}
						className="flex justify-center items-center gap-4"
					>
						<div className="flex justify-start items-center gap-2">
							<div className="font-light text-gray-400">{userData.name}</div>
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

					<AnimatePresence mode="wait">
						{toolbar && (
							<motion.div
								key="user-toolbar"
								className="relative"
								initial={{ opacity: 0, y: 10 }}
								exit={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.1 }}
							>
								<AccountToolbar />
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			) : (
				<div>{<Link href="/login">Prihláste sa</Link>}</div>
			)}
		</div>
	);
}
