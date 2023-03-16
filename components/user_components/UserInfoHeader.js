import { Link } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ArrowDown from "../../public/SVG/ArrowDown";
import AccountToolbar from "./AccountToolbar";
import { motion } from "framer-motion";
import Pro from "../Pro";

export default function UserInfoHeader({ color, is_smaller }) {
	const [toolbar, settoolbar] = useState(false);
	const { user, loading, userData } = useAuth();

	if (!color) color = "black";
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
						<div className={`${is_smaller? "h-7" : "h-8"} flex items-center gap-2`}>
							<img
								src={user.photoURL ? user.photoURL : "/static/default-user.png"}
								className="h-full aspect-square rounded-full"
								alt=""
							/>
							<div
								className="transition-all"
								style={{ rotate: toolbar ? "180deg" : "0deg" }}
							>
								<ArrowDown color={color}></ArrowDown>
							</div>
							{/* <Pro color={"#361cc1"}></Pro> */}
						</div>

						{/* <div className="flex justify-start items-center gap-2">
							<div className="font-light" style={{ color: color }}>
								{userData.name}
							</div>
							<div
								className="transition-all"
								style={{ rotate: toolbar ? "180deg" : "0deg" }}
							>
								<ArrowDown color={color}></ArrowDown>
							</div>
						</div> */}
						
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
