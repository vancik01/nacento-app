import { collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { customBuild } from "../../data";
import { firestore } from "../../lib/firebase";
import IconHome from "../../public/SVG/dashboard/IconHome";
import Plus from "../../public/SVG/dashboard/Plus";
import moment from "moment/moment";

export default function CreateToolbar() {
	const { user } = useAuth();
	const router = useRouter();

	function createEmpty() {
		const collectionRef = doc(collection(firestore, "/offers"));
		//customBuild variable empty template
		setDoc(collectionRef, {
			id: collectionRef.id,
			data: customBuild,
			name: "Nová cenová ponuka",
			created: moment().valueOf(),
			userId: user != null ? user.uid : "none",
		})
			.then((response) => {
				// router.push(`/cenova-ponuka/${collectionRef.id}`);
				localStorage.setItem("offerId", collectionRef.id);
				router.push(`/cenova-ponuka/`);
				setloading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div className=" flex items-center justify-start gap-8">
			<AddButton
				onClick={createEmpty}
				text="Prázdna cenová ponuka"
				subtext="Začnite od nuly"
				color="#73A496"
			></AddButton>
			<AddButton
				text="Interaktívna cenová ponuka"
				subtext="Zadajte len parametre stavby"
			></AddButton>
		</div>
	);
}

function AddButton({ text, subtext, color, onClick }) {
	return (
		<button
			onClick={onClick}
			className="py-3 px-3 border rounded-md flex items-center justify-center gap-2 text-start hover:bg-gray-50 transition-all"
		>
			<IconHome color={color}></IconHome>
			<div>
				<div className="text-sm font-regular">{text}</div>
				<div className="text-xs font-light text-gray-400">{subtext}</div>
			</div>

			<div className="ml-8">
				<Plus></Plus>
			</div>
		</button>
	);
}
