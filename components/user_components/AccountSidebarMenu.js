import React from "react";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import Settings from "../../public/SVG/account/Settings";
import Prefill from "../../public/SVG/account/Prefill";
import Plus from "../../public/SVG/buttons/Plus";
import Logout from "./Logout";
import ButtonSecondary from "../ButtonSecondary";
import ButtonPrimary from "../ButtonPrimary";
import ArrowBack from "../../public/SVG/buttons/ArrowBack";
import Dashboard from "../../public/SVG/buttons/Dashboard";
import { useRouter } from "next/router";
import Back from "../../public/SVG/user_setup/Back";

export default function AccountSidebarMenu() {
	const { user, userData } = useAuth();
	const router = useRouter();
	return (
		<div className="min-w-[350px] bg-gray-50 h-screen py-10 px-10">
			<div className="h-full flex flex-col items-center justify-between">
				<div className="w-full">
					<div className="min-h-[100px]">
						<div className="flex flex-col items-center">
							<div className="h-16 rounded-full p-1 aspect-square bg-white shadow-md">
								<img
									src={
										user.photoURL ? user.photoURL : "/static/default-user.png"
									}
									className="h-full aspect-square rounded-full"
									alt=""
								/>
							</div>
							<div className="text-xl font-medium text-center mt-4">
								{userData.name}
							</div>
							<div className="text-sm text-gray-300 font-medium text-center mt-1">
								{userData.email}
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-8  mt-6 max-w-[250px] mx-auto mb-6">
						<MenuItem
							icon={<Settings />}
							text="Môj účet"
							link="/nastavenie-uctu/"
						></MenuItem>
						<MenuItem
							icon={<Prefill />}
							text="Predvyplnenia"
							link="/nastavenie-uctu/predvyplnenia"
						></MenuItem>
						<MenuItem
							icon={<Plus></Plus>}
							text="Predplatné"
							link="#"
						></MenuItem>
						<MenuItem icon={<Plus></Plus>} text="Item 1" link="#"></MenuItem>
					</div>
					<Logout></Logout>
				</div>

				<div className="flex items-center justify-center gap-2 ">
					<ButtonPrimary
						href="/dashboard"
						iconBefore
						icon={<ArrowBack color="white" />}
						color="#361CC1"
						className=""
					>
						Späť na nástenku
					</ButtonPrimary>
				</div>
			</div>
		</div>
	);
}
function MenuItem({ text, icon, link }) {
	return (
		<Link
			href={link}
			className="active:text-red-600 no-underline flex justify-start items-center gap-3 px-12 py-5 bg-gray-100 w-full rounded-md"
		>
			<div>{icon}</div>

			<span className="text-black whitespace-nowrap">{text}</span>
		</Link>
	);
}
