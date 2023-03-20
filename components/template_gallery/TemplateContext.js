import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useData } from "../../context/AppWrap";
import { useAuth } from "../../context/AuthContext";
import { firestore } from "../../lib/firebase";

const Template = React.createContext();

export default function TemplateContext({ children }) {
	const [templates, settemplates] = useState(null);
	const [loading, setloading] = useState(true);
	const [insert, setinsert] = useState([]);
	const { user } = useAuth();
	const { addBlock, setopenTemplate, templateTrigger } = useData();
	const [tab, settab] = useState("all");

	//const [templateTrigger, settemplateTrigger] = useState(null);

	useEffect(() => {
		const docRef = doc(firestore, `/users/${user.uid}/templates/default`);
		getDoc(docRef).then((snap) => {
			if (snap.exists()) {
				settemplates(snap.data().data);
				setloading(false);
			}
		});
		console.log(templateTrigger, "trigger");
	}, []);

	function closeTemplates() {
		setopenTemplate(false);
		//settemplateTrigger(null);
		setinsert([]);
	}

	function addBlockToInsert(block) {
		const { blockId, sectionId } = templateTrigger;
		var newData = [...insert];
		delete block.type;
		newData.push({
			type: "block",
			blockId: blockId,
			sectionId: sectionId,
			data: { ...block },
		});
		setinsert(newData);
	}

	function handleInsert() {
		insert?.map((temp, tempId) => {
			if (temp.type === "block") {
				console.log(temp, "temp");
				addBlock(temp.sectionId, temp.blockId, { ...temp.data });
			}
		});
		closeTemplates();
	}

	useEffect(() => {
		console.log(insert, "Insert");
	}, [insert]);

	function selectTab(id) {
		settab(id);
	}

	const value = {
		templates,
		settemplates,
		loading,
		addBlockToInsert,
		handleInsert,
		closeTemplates,
		selectTab,
		tab,
	};

	return (
		<>
			<Template.Provider value={value}>
				<>{children}</>
			</Template.Provider>
		</>
	);
}

export function useTemplate() {
	return useContext(Template);
}
