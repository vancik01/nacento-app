import React, { useEffect, useState } from "react";
import { useSetup } from "../../pages/user-setup";
import SupplyerTemplate from "../user_components/SupplyerRegisterTemplate";

export default function Slide3() {
	const { userObject, setuserObject, setallowNext } = useSetup();

	function handleChange(e) {
		var newData = { ...userObject };
		newData.supplyer[`${e.target.name}`] = e.target.value;
		setuserObject(newData);
	}

	useEffect(() => {
		if (userObject.name != "") setallowNext(true);
		else setallowNext(false);
	}, []);

	return (
		<div className='w-full'>
			<h1 className='text-4xl text-center mb-10'>Zadajte Vaše údaje</h1>
			<p className='text-center text-gray-400'>
				Tieto informácie používame na predvypĺnanie cenových ponúk...
			</p>
			<div className='max-w-lg mx-auto flex justify-center mt-10'>
				<SupplyerTemplate
					account={userObject.account}
					supplyer={userObject.supplyer}
					userObject={userObject}
					handleChange={(e) => {
						handleChange(e);
					}}
				></SupplyerTemplate>
			</div>
		</div>
	);
}
