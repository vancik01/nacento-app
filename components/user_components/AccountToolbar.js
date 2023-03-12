import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import Pro from "../Pro";
import { useRouter } from "next/router";

export default function AccountToolbar() {
	function handleLogout() {
		logOut().then(() => {
			router.push("/");
		});
	}
	const router = useRouter();

	const { logOut } = useAuth();
	return (
		<div className="absolute top-4 right-0 shadow-hardShadow bg-white rounded-md">
			<div className="px-4 pb-4 pt-6 w-52">
				<MenuItem href={"/nastavenie-uctu"}>Môj účet 👨🏼</MenuItem>
				<MenuItem
					href={"/pro"}
					className="mt-3 flex items-center justify-start gap-4"
				>
					<div>Become</div> <Pro></Pro>
				</MenuItem>
				<MenuItem onClick={handleLogout} className="mt-4 text-red-500">
					Logout
				</MenuItem>
			</div>
		</div>
	);
}

function MenuItem({ href, className, onClick, children }) {
	const router = useRouter();
	return (
		<button
			onClick={
				onClick
					? onClick
					: () => {
							router.push(href);
					  }
			}
			className={`${className ? className : ""}`}
		>
			{children}
		</button>
	);
}
