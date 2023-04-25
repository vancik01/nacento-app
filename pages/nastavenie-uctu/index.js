import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import ButtonPrimary from "../../components/buttons/ButtonPrimary";
import FullPageLoading from "../../components/loading/FullPageLoading";
import Prefill from "../../public/SVG/account/Prefill";
import Logout from "../../components/user_components/Logout";
import AccountSidebarSkeleton from "../../components/skeletons/AccountSidebarSkeleton";
import { useRouter } from "next/router";
import EditName from "../../components/user_components/EditName";
import SupplyerTemplate from "../../components/user_components/SupplyerTemplate";
import AccountSidebarMenu from "../../components/user_components/AccountSidebarMenu";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import { toast } from "react-toastify";
import UploadImage from "../../components/editor/UploadImage";


export default function index() {
	const { user, loading, userData } = useAuth();
	const router = useRouter();
	const [name, setname] = useState(userData.name);

	const [supplyer, setsupplyer] = useState(userData.supplyer);
	const [logo, setlogo] = useState(
		userData?.images?.logo ? userData.images.logo : ""
	);
	const [signature, setsignature] = useState(
		userData?.images?.signature ? userData.images.signature : ""
	);

	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);
	const [typingTimeout, setTypingTimeout] = useState(0);


	function handleChange(e) {
		var newData = { ...supplyer };
		newData[`${e.target.name}`] = e.target.value;
		setsupplyer(newData);
	}
	

	const fetchResults = async (value) => {
		try {
		  const response = await axios.get(`https://api2.nacento.online/search?q=${value}`);
		  	setResults(response.data);
		} catch (error) {
		  console.error(error);
		}
	  };
	

	function handleCompanyChange(e) {
		var newData = { ...supplyer };
		newData[`${e.target.name}`] = e.target.value;
		setsupplyer(newData);


		const value = e.target.value;

		clearTimeout(typingTimeout);
			setTypingTimeout(setTimeout(() => {
			if (value.trim() !== '' && value.length > 2) {
				fetchResults(value);
			} else {
				setResults([]);
			}
		}, 200));

	}

	function handleCompanySet(company){
		setResults([])

		var newData = { ...supplyer }
		if(company.name) newData.company_name = company.name
		if(company.ico) newData.ico = company.ico
		if(company.dic) newData.dic = company.dic

		setsupplyer(newData);
	}

	function handleSave() {
		var newData = {
			name: name,
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
			<div className="flex">
				{!loading ? (
					<AccountSidebarMenu></AccountSidebarMenu>
				) : (
					<AccountSidebarSkeleton />
				)}
				<div className="w-full py-16 px-10">
					<h1 className="text-2xl">Môj účet</h1>
					
					<div className='mt-4'>
						<SupplyerTemplate
							userObject={user}
							
							name={name}
							setname={setname}

							account={userData.account}
							email={userData.supplyer.email}
							supplyer={supplyer}
							handleChange={(e) => {
								handleChange(e);
							}}

							handleCompanyChange={(e) => {
								handleCompanyChange(e);
							}}

							handleCompanySet={(e) => {
								handleCompanySet(e);
							}}

							results={results}


						></SupplyerTemplate>

					</div>


					<div className='flex gap-10 w-fit mb-10'>
						<div className='mt-10'>
							<h1 className='text-xl mb-2'>Logo</h1>
							<UploadImage
								onUpload={(url) => {
									setlogo(url);
								}}
								defaultPreview={logo}
								width={150}
								height={75}
								placeholder={"Nahrať logo"}
							></UploadImage>
						</div>

						<div className='mt-10'>
							<h1 className='text-xl mb-2'>Pečiatka a podpis</h1>
							<UploadImage
								onUpload={(url) => {
									setsignature(url);
								}}
								defaultPreview={signature}
								width={150}
								height={75}
								placeholder={"Nahrať Podpis"}
							></UploadImage>
						</div>
					</div>

					<div className=''>
						<ButtonPrimary onClick={handleSave}>Uložiť zmeny</ButtonPrimary>
					</div>

				</div>

			</div>
		</div>
	);
}
