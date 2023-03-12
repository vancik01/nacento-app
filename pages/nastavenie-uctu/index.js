import React from "react";
import { useAuth } from "../../context/AuthContext";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useLayout } from "../../context/LayoutContext";
import ArrowBack from "../../public/SVG/buttons/ArrowBack";

import Plus from "../../public/SVG/buttons/Plus";
import Settings from "../../public/SVG/account/Settings";
import Link from "next/link";
import FullPageLoading from "../../components/loading/FullPageLoading";
import Prefill from "../../public/SVG/account/Prefill";
import Logout from "../../components/user_components/Logout";
import AccountSidebarSkeleton from "../../components/skeletons/AccountSidebarSkeleton";
import { useRouter } from "next/router";

export default function index() {
	const { user, loading } = useAuth();
	const router = useRouter();

	return (
		<div>
			<FullPageLoading loading={loading}></FullPageLoading>
			<div className="flex">
				<div className="min-w-[350px] bg-gray-50 h-screen py-10 px-10">
					{!loading ? (
						<div className="h-full flex flex-col items-center justify-between">
							<div className="w-full">
								<div className="min-h-[100px]">
									<div className="flex flex-col items-center">
										<div className="h-16 rounded-full p-1 aspect-square bg-white shadow-md">
											<img
												src={
													user.photoURL
														? user.photoURL
														: "/static/default-user.png"
												}
												className="h-full aspect-square rounded-full"
												alt=""
											/>
										</div>
										<div className="text-xl font-medium text-center mt-4">
											{user.displayName ? user.displayName : user.email}
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
										link="#"
									></MenuItem>
									<MenuItem
										icon={<Plus></Plus>}
										text="Predplatné"
										link="#"
									></MenuItem>
									<MenuItem
										icon={<Plus></Plus>}
										text="Item 1"
										link="#"
									></MenuItem>
								</div>
								<Logout></Logout>
							</div>

							<ButtonPrimary
								onClick={() => {
									router.back();
								}}
								iconBefore
								icon={<ArrowBack />}
								color="#361CC1"
								className="w-40"
							>
								Späť
							</ButtonPrimary>
						</div>
					) : (
						<AccountSidebarSkeleton />
					)}
				</div>
				<div className="w-full py-10 px-6">
					<h1>Môj účet</h1>
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
