import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import GeneratePDF from "../components/editor/GeneratePDF";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useData } from "./AppWrap";
import ShareProject from "../components/editor/ShareProject";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { firestore } from "../lib/firebase";

const Actions = React.createContext();

export default function ActionsContext({ children }) {
	const [download, setdownload] = useState(false);
	const [share, setshare] = useState(false);
	const [loading, setloading] = useState(false);
	const router = useRouter();
	const { name, awaitHandleSave } = useData();

	async function getServerPdf() {
		awaitHandleSave().then(() => {
			setdownload(true);
			const projectId = router.query.projectId;
			//https://api2.nacento.online/renderPdf
			fetch(`https://api2.nacento.online/renderPdf`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ projectId }),
			})
				.then((response) => {
					return response.blob();
				})
				.then((blob) => {
					// create a temporary <a> element to download the blob
					const url = URL.createObjectURL(blob);
					const a = document.createElement("a");
					a.href = url;
					a.download = `${name}.pdf`; // replace "your_filename" with your desired filename
					a.click();

					// cleanup: remove the temporary URL created by URL.createObjectURL()
					setTimeout(() => {
						URL.revokeObjectURL(url);
					}, 0);
					setdownload(false);
				})
				.catch((error) => {
					console.error("Error fetching PDF:", error);
					setdownload(false);
				});
		});
	}

	async function generateLink() {
		setloading(true);
		const docRef = doc(firestore, `/offers/${router.query.projectId}`);

		const offerSnap = await getDoc(docRef);
		if (!offerSnap.exists()) return "error";
		var data = offerSnap.data();

		const colRef = collection(firestore, `/shareView/`);
		const add = await addDoc(colRef, data);
		setloading(false);

		return `https://${window.location.hostname}/view/${add.id}`;
	}

	function openShare() {
		setshare(true);
	}
	function closeShare() {
		setshare(false);
	}

	const value = {
		getServerPdf,
		openShare,
		closeShare,
		generateLink,
	};

	return (
		<Actions.Provider value={value}>
			<>
				<AnimatePresence>
					{download && (
						<GeneratePDF
							close={() => {
								setdownload(false);
							}}
						></GeneratePDF>
					)}

					{share && (
						<ShareProject
							close={() => {
								closeShare();
							}}
						></ShareProject>
					)}
				</AnimatePresence>

				{children}
			</>
		</Actions.Provider>
	);
}

export function useActions() {
	return useContext(Actions);
}
