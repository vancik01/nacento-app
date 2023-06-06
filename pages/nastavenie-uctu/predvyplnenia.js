import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ButtonPrimary from "../../components/buttons/ButtonPrimary";
import FullPageLoading from "../../components/loading/FullPageLoading";
import AccountSidebarSkeleton from "../../components/skeletons/AccountSidebarSkeleton";
import { useRouter } from "next/router";
import SupplyerTemplate from "../../components/user_components/SupplyerTemplate";
import AccountSidebarMenu from "../../components/user_components/AccountSidebarMenu";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import { toast } from "react-toastify";
import UploadImage from "../../components/editor/UploadImage";

export default function predvyplnenia() {
	const { user, loading, userData } = useAuth();
	const router = useRouter();

	const [supplyer, setsupplyer] = useState(userData.supplyer);
	const [logo, setlogo] = useState(
		userData?.images?.logo ? userData.images.logo : ""
	);
	const [signature, setsignature] = useState(
		userData?.images?.signature ? userData.images.signature : ""
	);

	function handleChange(e) {
		var newData = { ...supplyer };
		newData[`${e.target.name}`] = e.target.value;
		setsupplyer(newData);
	}

	function handleSave() {
		var newData = {
			supplyer: { ...supplyer },
			images: {
				logo,
				signature,
			},
		};

		const docRef = doc(firestore, `/users/${user.uid}`);
		updateDoc(docRef, newData).then(() => {
			toast("Dáta sa uložili", { type: "success" });
		});
	}

	return (
		<div>
			<FullPageLoading loading={loading}></FullPageLoading>
			<div className='flex'>
				{!loading ? (
					<AccountSidebarMenu></AccountSidebarMenu>
				) : (
					<AccountSidebarSkeleton />
				)}
				<div className='w-full py-16 px-10'>
					<h1 className='text-2xl'>Predvyplnenia</h1>

					<div className='flex gap-10 mb-20'>
						<div className='mt-10'>
							<h1 className='text-xl mb-2'>Logo</h1>
							<UploadImage
								onUpload={(url) => {
									setlogo(url);
								}}
								defaultPreview={logo}
								width={250}
								height={100}
								placeholder={"Nahrať logo"}
							></UploadImage>
						</div>

						<div className='mt-10'>
							<h1 className='text-xl mb-2'>Podpis</h1>
							<UploadImage
								onUpload={(url) => {
									setsignature(url);
								}}
								defaultPreview={signature}
								width={250}
								height={100}
								placeholder={"Nahrať Podpis"}
							></UploadImage>
						</div>
					</div>

					<div className='mt-4'>
						<SupplyerTemplate
							userObject={user}
							account={userData.account}
							email={userData.supplyer.email}
							supplyer={supplyer}
							handleChange={(e) => {
								handleChange(e);
							}}
						></SupplyerTemplate>

						<div className='mt-4'>
							<ButtonPrimary onClick={handleSave}>Uložiť zmeny</ButtonPrimary>
						</div>
					</div>


				</div>
			</div>
		</div>
	);
}
