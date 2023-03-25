import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import Pro from "../Pro";
import { useRouter } from "next/router";

import AccountIcon from "./AcountIcon";
import OfferIcon from "./OfferIcon";

export default function AccountToolbar() {
	function handleLogout() {
		logOut().then(() => {
			router.push("/");
		});
	}
	const router = useRouter();
	const { logOut, userData, user } = useAuth();

	return (
		<div className="pt-3 absolute top-0 right-0 w-max">
			<div className="shadow-hardShadow inline-block bg-white rounded-sm">
				<div className="px-4 py-4 flex flex-col gap-2 items-start">

					<MenuItem href={""} className={"cursor-default pb-1"} 
					icon={<img src={user.photoURL ? user.photoURL : "/static/default-user.png"}
								className="h-6 aspect-square rounded-full"
								alt="" />}>

								{userData.email}</MenuItem>

					<MenuItem icon={<AccountIcon/>} href={"/nastavenie-uctu"}>Môj účet</MenuItem>

					<MenuItem className={"pb-2"} icon={<OfferIcon/>} href={"/nastavenie-uctu"}>Nastavenia ponuky</MenuItem>

					<MenuItem onClick={handleLogout} className="text-red-500">
						<hr className=" w-full"/>
						Odhlásiť
					</MenuItem> 

				</div>
			</div>
		</div>
	);
}

function MenuItem({ href, className, onClick, children, icon }) {
	const router = useRouter();
	return (
		<div className="flex items-center gap-2">
		
		{icon}

		<button
			onClick={
				onClick
					? onClick
					: () => {
							router.push(href);
					  }}
			className={`${className ? className : ""}`}>
			{children}
		</button>

		</div>
	);
}
