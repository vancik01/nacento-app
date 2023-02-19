import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { layoutConfig, themes } from "../lib/data";
import { getColumnWidth, getVariantConfig } from "../lib/helpers";
import { useData } from "./AppWrap";

const Layout = React.createContext();

export default function LayoutContext({ children }) {
	const { headers } = useData();
	const [displayColumns, setdisplayColumns] = useState([
		...layoutConfig.defaultVisibleColumns,
	]);
	const [tableRowTemplate, settableRowTemplate] = useState("");
	const [primaryColor, setprimaryColor] = useState("#63A695");
	const [styles, setstyles] = useState(themes.theme1);
	const [isHorizontal, setisHorizontal] = useState(false);
	const [variant, setvariant] = useState(getVariantConfig("pro"));

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

	useEffect(() => {}, [primaryColor]);

	function changeVariant(variant) {
		setvariant(getVariantConfig(variant));
		console.log(variant);
	}

	const value = {
		styles,
		displayColumns,
		handleDisplayColumnsChange,
		tableRowTemplate,

		primaryColor,
		setprimaryColor,

		setisHorizontal,
		isHorizontal,

		variant,
		changeVariant,
	};

	return <Layout.Provider value={value}>{children}</Layout.Provider>;
}

export function useLayout() {
	return useContext(Layout);
}
