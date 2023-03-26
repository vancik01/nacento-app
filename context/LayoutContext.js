import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { layoutConfig, themes } from "../lib/data";
import { firestore } from "../lib/firebase";
import { getColumnWidth, getVariantConfig } from "../lib/helpers";
import { useData } from "./AppWrap";
import { useAuth } from "./AuthContext";

const Layout = React.createContext();

export default function LayoutContext({ children, layout, headers }) {
	const { user, userData } = useAuth();

	if (!layout)
		layout = {
			displayColumns: [
				"title",
				"unit",
				"quantity",
				"total_delivery_price",
				"total_construction_price",
				"total",
			],
			primaryColor: "#63A695",
			isHorizontal: false,
			variant: "pro",
		};
	console.log(layout, headers);

	const [displayColumns, setdisplayColumns] = useState([
		...layout.displayColumns,
	]);
	const [tableRowTemplate, settableRowTemplate] = useState("");
	const [primaryColor, setprimaryColor] = useState(layout.primaryColor);
	//const [styles, setstyles] = useState(themes.theme1);
	const [isHorizontal, setisHorizontal] = useState(layout.isHorizontal);
	const [variant, setvariant] = useState(getVariantConfig(layout.variant));

	function handleDisplayColumnsChange(columnId) {
		var newData = [...displayColumns];
		if (newData.includes(columnId)) {
			const index = newData.indexOf(columnId);
			if (index > -1) {
				// only splice array when item is found
				newData.splice(index, 1); // 2nd parameter means remove one item only
			}
		} else {
			newData.push(columnId);
		}

		var row = getColumnWidth("index");

		headers.map((header, i) => {
			if (newData.includes(header)) {
				row += " " + getColumnWidth(header);
			}
		});
		//row += " 40px"

		settableRowTemplate(row);
		setdisplayColumns(newData);
	}

	useEffect(() => {
		var row = getColumnWidth("index");
		headers.map((header, i) => {
			if (displayColumns.includes(header)) {
				row += " " + getColumnWidth(header);
			}
		});
		//row += " 40px"
		settableRowTemplate(row);
	}, []);

	function getLayout() {
		return {
			displayColumns,
			primaryColor,
			isHorizontal,
			variant: variant.id,
		};
	}

	function changeVariant(variant) {
		setvariant(getVariantConfig(variant));
	}

	function saveLayoutTemplate() {
		const docRef = doc(firestore, `/users/${user.uid}`);
		updateDoc(docRef, {
			layoutTemplate: arrayUnion({ ...getLayout(), name: "Test" }),
		}).then(() => {});
	}

	const value = {
		displayColumns,
		handleDisplayColumnsChange,
		tableRowTemplate,

		primaryColor,
		setprimaryColor,

		setisHorizontal,
		isHorizontal,
		getLayout,
		variant,
		changeVariant,
		saveLayoutTemplate,
	};

	return <Layout.Provider value={value}>{children}</Layout.Provider>;
}

export function useLayout() {
	return useContext(Layout);
}
