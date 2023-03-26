import React, { useState } from "react";
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
import ButtonSecondary from "../../components/ButtonSecondary";
import Dashboard from "../../public/SVG/buttons/Dashboard";
import EditName from "../../components/user_components/EditName";
import SupplyerTemplate from "../../components/user_components/SupplyerTemplate";
import AccountSidebarMenu from "../../components/user_components/AccountSidebarMenu";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import { toast } from "react-toastify";

export default function index() {
	const { user, loading, userData } = useAuth();
	const router = useRouter();
	const [name, setname] = useState(userData.name);

	function handleChange(e) {
		setname(e.target.value);
	}

	function handleSave() {
		const docRef = doc(firestore, `/users/${user.uid}`);
		updateDoc(docRef, { name: name }).then(() => {
			toast("Dáta sa uložili", { type: "success" });
		});
	}

	return (
		<div>
			<FullPageLoading loading={loading}></FullPageLoading>
			<div className="flex">
				{!loading ? (
					<AccountSidebarMenu></AccountSidebarMenu>
				) : (
					<AccountSidebarSkeleton />
				)}
				<div className="w-full py-16 px-10">
					<h1 className="text-2xl">Môj účet</h1>
					<div className="mt-4">
						<EditName
							account={userData.account}
							name={name}
							handleSave={(e) => {
								handleChange(e);
							}}
						></EditName>
						<div className="mt-4">
							<ButtonPrimary onClick={handleSave}>Uložiť zmeny</ButtonPrimary>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
