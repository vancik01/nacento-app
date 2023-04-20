import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import Pro from "../Pro";
import { useRouter } from "next/router";

import AccountIcon from "./AcountIcon";
import OfferIcon from "./OfferIcon";
import LogoutIcon from "./LogoutIcon";

export default function AccountToolbar() {
	function handleLogout() {
		logOut();
		router.push("/");
	}
	const router = useRouter();
	const { logOut, userData, user } = useAuth();

	return (

		<div className="pt-3 absolute top-0 right-0 w-max">
			<div className="shadow-hardShadow inline-block bg-white rounded-sm">
				<div className="pt-1 pb-1 flex flex-col items-start">

					<MenuItem profile={true} href={""} className={"cursor-default"}
						icon={<img src={user.photoURL ? user.photoURL : "/static/default-user.png"}
							className="w-[24px] aspect-square rounded-full"
							alt="" />}>
						{userData.email}
					</MenuItem>

					<MenuItem icon={<AccountIcon />} href={"/nastavenie-uctu"}>
						Môj účet
					</MenuItem>

					{/* <MenuItem icon={<OfferIcon />} href={"/nastavenie-uctu/vzory"}>Nastavenia ponuky</MenuItem> */}

					<hr className="w-full pb-1 mt-1" />

					<MenuItem icon={<LogoutIcon />} onClick={handleLogout} className="text-red-500">
						Odhlásiť
					</MenuItem>
				</div>
			</div>
		</div>
	);
}

function MenuItem({ href, className, onClick, children, icon, profile }) {
	const router = useRouter();
	return (
		<div onClick={onClick ? onClick : () => { router.push(href); }}
			className={`pl-3 w-full py-[6px] ${!profile && "hover:bg-blue-400"} pr-4 flex items-center gap-3 text-sm ${className && className}`}>

			<div className={`${!profile && "ml-[3px]"}`}>{icon}</div>

			<button className={`cursor-default ${!profile && "ml-[3px]"}`}>
				{children}
			</button>

		</div>
	);
}


