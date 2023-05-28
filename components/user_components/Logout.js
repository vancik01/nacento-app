import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import LogOut from "../../public/assets/buttons/LogOut";

export default function Logout() {
	const { logOut } = useAuth();
	const router = useRouter();

	function handleLogout() {
		logOut().then(() => {
			router.push("/");
		});
	}
	return (
		<button
			className="flex items-center justify-center w-full gap-2"
			onClick={handleLogout}
		>
			<LogOut></LogOut>
			<div className="text-red-500">Odhlásiť sa</div>
		</button>
	);
}
