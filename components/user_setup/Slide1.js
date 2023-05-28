import React, { useEffect } from "react";
import { useSetup } from "../../pages/user-setup";
import Spolocnost from "../../public/assets/user_setup/Spolocnost";
import Zivnostnik from "../../public/assets/user_setup/Zivnostnik";

export default function Slide1() {
	const { userObject, setuserObject, setallowNext } = useSetup();

	function handleSelect(type) {
		var newData = { ...userObject };
		newData.account = type;
		setuserObject(newData);
		setallowNext(true);
	}

	useEffect(() => {
		if (userObject.account != "") setallowNext(true);
		else setallowNext(false);
	}, []);

	return (
		<div>
			<h1 className="text-4xl text-center mb-10">Vyberte si typ účtu</h1>
			<div className="grid grid-cols-2 gap-10 max-w-lg mx-auto">
				<button
					onClick={() => {
						handleSelect("user");
					}}
					className={`shadow-hardShadow aspect-square p-4 rounded-md  flex flex-col items-center justify-center border  transition-all ${
						userObject.account == "user" && "border-blue-600"
					}`}
				>
					<Zivnostnik></Zivnostnik>
					<h3 className="text-center mt-4">Fyzická osoba</h3>
					<p className="text-center text-gray-400">Pracujem ako živnostník</p>
				</button>
				<button
					onClick={() => {
						handleSelect("company");
					}}
					className={`shadow-hardShadow aspect-square p-4 rounded-md  flex flex-col items-center justify-center border transition-all ${
						userObject.account == "company" && "border-blue-600"
					}`}
				>
					<Spolocnost></Spolocnost>
					<h3 className="text-center mt-4">Spoločnosť</h3>
					<p className="text-center text-gray-400">Pracujem ako firma</p>
				</button>
			</div>
		</div>
	);
}
