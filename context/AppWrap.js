import React, {
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { lang } from "../languages/languages";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../lib/firebase";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import { toast } from "react-toastify";
import moment from "moment/moment";
import {
	splitBetweenBlocks,
	splitBetweenItems,
	splitBetweenSections,
	updateBlockTotals,
	updateSectionTotals,
	updateTableRow,
	updateTotals
} from "../lib/valueChangeFunctions";

import CenovaPonukaSkeleton from "../components/skeletons/CenovaPonukaSkeleton";
import { useAuth } from "./AuthContext";
import { useLayout } from "./LayoutContext";

import { getValue } from "./ValuesContext";
import { update } from "lodash";

const DataContext = React.createContext();

export function AppWrap({ children, dbData }) {
	const [data, setData] = getValue((data) => data);

	const setdata = (data) => console.log(data);

	const [headers, setheaders] = useState(dbData.data.headers);
	const [errorLoading, seterrorLoading] = useState(false);
	const [loading, setloading] = useState(false);
	const [name, setname] = useState(dbData.name);
	const [bulkEdit, setbulkEdit] = useState(false);
	const [openTemplate, setopenTemplate] = useState(false);
	const [bulkEditData, setbulkEditData] = useState({
		blockId: -1,
		sectionId: -1,
		value: "",
		valueId: "",
		mode: "",
		title: "",
		x: 0,
		y: 0,
	});
	const [displayTotals, setdisplayTotals] = useState(true);
	const [reorderingBlocks, setreorderingBlocks] = useState(false);
	const [selectedFile, setselectedFile] = useState(null);
	const [logo, setlogo] = useState("");
	const [displaySidebar, setdisplaySidebar] = useState(true);
	const [saving, setsaving] = useState(false);
	const [showUI, setshowUI] = useState(false);
	const [description, setdescription] = useState(dbData.description);
	const [templateTrigger, settemplateTrigger] = useState(null);
	const [dataDB, setdataDB] = useState(dbData);
	const [openFormulas , setOpenFormulas] = useState(false);
	const [expiration, setexpiration] = useState(
		dbData.expiration
			? moment(dbData.expiration).valueOf()
			: moment().add(14, "days")
	);
	var today = new Date();
	const [subHeading, setsubHeading] = useState(
		dbData.subHeading ? dbData.subHeading : "#" + today.toLocaleDateString("sk")
	);

	const [ signature, setsignature ] = useState("");
	const { userData, user } = useAuth();
	const { getLayout } = useLayout();

	function changeDescription(e) {
		var newData = description;
		newData = e.target.value;
		setdescription(newData);
	}

	const [total, settotal] = useState({
		total_delivery_price: 0,
		total_construction_price: 0,
		total: 0,
	});
	const [initialTotal, setinitialTotal] = useState(total);
	const router = useRouter();


	async function handleSave(show) {
		const projectId = router.query.projectId;
		const docRef = doc(firestore, `/offers/${projectId}`);
		setsaving(true);
		try {
			await updateDoc(docRef, {
				data: data.data,
				name: name,
				totals: total,
				description: description ? description : "",
				layout: getLayout(),
				lastModified: moment().valueOf(),
				expiration: expiration ? moment(expiration).valueOf() : null,
				subHeading: subHeading ? subHeading : "",
				images: {
					logo: logo ? logo : "",
					signature: signature ? signature : "",
				},
			});
			if (show) toast("Dáta sa uložili", { type: "success" });
			setsaving(false);
		} catch (error) {
			console.log(error);
			toast("Vyskytla sa chyba pri ukladaní", { type: "error" });
			setsaving(false);
		}
	}

	function awaitHandleSave() {
		const projectId = router.query.projectId;
		return new Promise(async (resolve, reject) => {
			console.log(projectId);
			const docRef = doc(firestore, `/offers/${projectId}`);
			try {
				await updateDoc(docRef, {
					data: data.data,
					name: name,
					totals: total,
					description: description ? description : "",
					layout: getLayout(),
					lastModified: moment().valueOf(),
					expiration: expiration ? moment(expiration).valueOf() : null,
					subHeading: subHeading ? subHeading : "",
					images: {
						logo: logo ? logo : "",
						signature: signature ? signature : "",
					},
				});
			} catch (error) {
				console.log(error);
				toast("Vyskytla sa chyba pri ukladaní", { type: "error" });

				reject(error);
			}

			resolve("Wocap");
		});
	}

	function calculateTotals() {
		var t = {
			total_delivery_price: 0,
			total_construction_price: 0,
			total: 0,
		};

		var newData ={ ...data.data };

		newData.sections.map((section) => {
			t.total_delivery_price += parseFloat(
				section.info["total_delivery_price"]
			);

			t.total_construction_price += parseFloat(
				section.info["total_construction_price"]
			);
		});

		t.total = t.total_construction_price + t.total_delivery_price;
		return t;
	}

	const loadTotals = useCallback(
		debounce(() => settotal(calculateTotals()), 200),
		[loading]
	);

	useEffect(() => {
		console.log(data)
		// vypocet total price
		if (data != null) {
			loadTotals();
		}
	}, [data]);

	useEffect(() => {
		//kalkulácia ceny totalnej z blokov a pod...
		if (data != null) {
			dataInit();
			loadTotals();
			var newData ={ ...data.data };
			newData.supplyer.company_name = userData.supplyer.company_name ? userData.supplyer.company_name : "";
			newData.supplyer.dic = userData.supplyer.dic ? userData.supplyer.dic : "";
			newData.supplyer.email = userData.supplyer.email
				? userData.supplyer.email
				: "";
			newData.supplyer.ico = userData.supplyer.ico
				? userData?.supplyer.ico
				: "";
			newData.supplyer.phone = userData.supplyer.phone
				? userData?.supplyer.phone
				: "";
			newData.supplyer.web = userData.supplyer.web
				? userData?.supplyer.web
				: "";
			setdata(newData);
			setshowUI(true);

			if (dbData?.images?.logo) {
				setlogo(dbData.images.logo);
			} else if (userData?.images?.logo) {
				setlogo(userData.images.logo);
			}

			if (dbData?.images?.signature) {
				setsignature(dbData.images.signature);
			} else if (userData?.images?.signature) {
				setsignature(userData.images.signature);
			}
		}
	}, [loading]);

	function dataInit() {
		// inizializacia dat

		var newData ={ ...data };
		var t = {
			total_delivery_price: 0,
			total_construction_price: 0,
			total: 0,
		};

		newData.data.sections.map((section) => {
			section.blocks.map((block) => {
				t.total_delivery_price += parseFloat(
					block.info["total_delivery_price"]
				);
				t.total_construction_price += parseFloat(
					block.info["total_construction_price"]
				);
			});
		});

		t.total = t.total_delivery_price + t.total_construction_price;
		setinitialTotal(t);
		settotal(t);

		var section_total = 0,
			section_total_delivery_price = 0,
			section_total_construction_price = 0;
		newData.data.sections.map((section, k) => {
			var section_total = 0,
				section_total_delivery_price = 0,
				section_total_construction_price = 0;
			section.blocks.map((block, i) => {
				newData.data.sections[k].blocks[i].info.total =
					block.info["total_construction_price"] +
					block.info["total_delivery_price"];
				section_total_construction_price +=
					block.info["total_construction_price"];
				section_total_delivery_price += block.info["total_delivery_price"];
				section_total += newData.data.sections[k].blocks[i].info.total;

				block.items.map((item, j) => {
					// if (item.quantity == 0) item.quantity = 1;
					newData.data.sections[k].blocks[i].items[j].total =
						parseFloat(
							newData.data.sections[k].blocks[i].items[j].total_construction_price
						) +
						parseFloat(
							newData.data.sections[k].blocks[i].items[j].total_delivery_price
						);
					//2 desatinn
					newData.data.sections[k].blocks[i].items[j].total_construction_price =
						parseFloat(
							newData.data.sections[k].blocks[i].items[j].total_construction_price
						).toFixed(2);
					newData.data.sections[k].blocks[i].items[j].total_delivery_price =
						parseFloat(
							newData.data.sections[k].blocks[i].items[j].total_delivery_price
						).toFixed(2);

					newData.data.sections[k].blocks[i].items[j].unit_construction_price =
						parseFloat(
							newData.data.sections[k].blocks[i].items[j].unit_construction_price
						).toFixed(2);

					newData.data.sections[k].blocks[i].items[j].unit_delivery_price =
						parseFloat(
							newData.data.sections[k].blocks[i].items[j].unit_delivery_price
						).toFixed(2);
					newData.data.sections[k].blocks[i].items[j].total = parseFloat(
						newData.data.sections[k].blocks[i].items[j].total
					).toFixed(2);
				});
			});

			newData.data.sections[k].info.total = parseFloat(section_total).toFixed(2);
			newData.data.sections[k].info.total_construction_price = parseFloat(
				section_total_construction_price
			).toFixed(2);
			newData.data.sections[k].info.total_delivery_price = parseFloat(
				section_total_delivery_price
			).toFixed(2);
		});
		setdata(newData);
	}

	// function updateTotals() {

	// 	setData(prevData => {

	// 		var t = {
	// 			total_delivery_price: 0,
	// 			total_construction_price: 0,
	// 			total: 0,
	// 		};

	// 		prevData.data.sections.map((section) => {
	// 			t.total_delivery_price += parseFloat(
	// 				section.info["total_delivery_price"]
	// 			);

	// 			t.total_construction_price += parseFloat(
	// 				section.info["total_construction_price"]
	// 			);
	// 		});

	// 		t.total = t.total_delivery_price + t.total_construction_price;

	// 		console.log(t)

	// 		return {
	// 			...prevData,
	// 			totals: {
	// 				...prevData.totals,
	// 				total: t.total,
	// 				total_delivery_price: t.total_delivery_price,
	// 				total_construction_price: t.total_construction_price,
	// 			},
	// 		};
	// 	});

	// }

	function changeValue(cordinates, value) {
		const { fieldId, itemId, blockId, sectionId } = cordinates;

		updateTableRow(
			data.data.sections[sectionId].blocks[blockId].items[itemId],
			fieldId,
			value
		);

		updateBlockTotals(data.data.sections[sectionId].blocks[blockId]);
		updateSectionTotals(data.data.sections[sectionId]);
		updateTotals(data);

		settotal(data.totals);

		// console.log(data)

		// setData((store) => ({ ...store, ...data }));

		setData((store) => (store = data));

		// console.log(data)
	}

	function deleteRow(obj) {
		var newData ={ ...data };
		var newPolozky = newData.data.sections[obj.sectionId].blocks[obj.blockId].items;

		newPolozky.splice(obj.itemId, 1);
		updateBlockTotals(newData.data.sections[obj.sectionId].blocks[obj.blockId]);
		updateSectionTotals(newData.data.sections[obj.sectionId]);
		setData((store) => (store = newData));
	}

	function deleteBlock(sectionId, blockId) {
		var newData ={ ...data };

		const [removed] = newData.data.sections[sectionId].blocks.splice(blockId, 1);

		updateSectionTotals(newData.data.sections[sectionId]);
		setData((store) => (store = newData));
	}

	function deleteSection(sectionId) {
		setData(prevState => {

			const newData = { ...prevState };

			newData.data.sections.splice(sectionId, 1);

			return newData
		});
	}

	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	function reorderRows(blockId, sectionId, e) {
		var newData ={ ...data.data };

		if (!e.destination) {
			return;
		}

		const items = reorder(
			newData.sections[sectionId].blocks[blockId].items,
			e.source.index,
			e.destination.index
		);
		newData.sections[sectionId].blocks[blockId].items = items;

		setdata(newData);
	}

	function reorderBlocks(e, sectionId) {
		var newData ={ ...data.data };

		if (!e.destination) {
			return;
		}

		const items = reorder(
			newData.sections[sectionId].blocks,
			e.source.index,
			e.destination.index
		);
		newData.sections[sectionId].blocks = items;
		setdata(newData);
	}

	function addBlockFull(section, block) {
		let newData ={ ...data.data };
		console.log(newData.sections);

		let exists = false;

		for (var i = 0; i < newData.sections.lenght; i++) {
			if (newData.sections[i].info.title === section.info.title) {
				newData.sections[i].blocks.push({ ...block });
				setdata(newData);
				return;
			}
		}

		newData.sections.forEach((sec) => {
			console.log(sec.info.title);
			if (sec.info.title == section.info.title) {
				newData.sections[i].blocks.push({ ...block });
				exists = true;
				setdata(newData);
			}
		});
		newData.sections.push({ ...section });
		setdata(newData);
		// if (!exists) {

		// 	setTimeout(() => {
		// 		document
		// 			.getElementById("last-section")
		// 			.scrollIntoView({ behavior: "smooth" });
		// 	}, 100);
		// }
	}

	function addBlock(sectionId, blockId, template) {

		setData(data => {
			var newData = { ...data };

			var lengthBeforeInsert = newData.data.sections[sectionId].blocks.length;
			let newBlock;

			if (!template) {
				newBlock = {
					info: {
						title: "Nový blok",
						total_delivery_price: 0,
						total_construction_price: 0,
						total: 0,
					},
					items: [],
				};
			} else {
				newBlock = template;
			}

			newData.data.sections[sectionId].blocks.splice(blockId + 1, 0, newBlock);

			if (lengthBeforeInsert === 0) {
				newBlock.info.total = parseFloat(newData.data.sections[sectionId].info.total);
				newBlock.info.total_construction_price = parseFloat(
					newData.data.sections[sectionId].info.total_construction_price
				);
				newBlock.info.total_delivery_price = parseFloat(
					newData.data.sections[sectionId].info.total_delivery_price
				);
			}
			if (!template) {
				if (lengthBeforeInsert == 0) {
					addTableRow(blockId, sectionId);
				} else {
					addTableRow(blockId + 1, sectionId);
				}
			}
			updateSectionTotals(newData.data.sections[sectionId]);


			return newData;
		});
	}

	function getTitle(titleId, language) {
		return lang[language][titleId];
	}

	function changeSupplyerData(supplyerData) {
		var newData ={ ...data.data };
		newData.supplyer = supplyerData;

		setdata(newData);
	}
	function changeCustomerData(customerData) {

		

		var newData ={ ...data.data };
		newData.customer = customerData;
		setdata(newData);
	}

	function editBlockTitle(newTitle, sectionId, blockId) {
		var newData ={ ...data.data };
		newData.sections[sectionId].blocks[blockId].info.title = newTitle;

		setdata(newData);
	}

	function openBulkEdit(data, e) {
		if (bulkEdit) {
			closeBulkEdit();
			setTimeout(() => {
				const clientWidth = document.body.clientWidth;
				var pageX = e.pageX;
				var pageY = e.pageY - 30;

				if (pageX + 400 > clientWidth)
					pageX = pageX - 100 - (pageX + 400 - clientWidth);

				setbulkEdit(true);
				data.value = parseFloat(data.value).toFixed(2);
				setbulkEditData({ ...data, x: pageX, y: pageY });
			}, 100);
		} else {
			const clientWidth = document.body.clientWidth;
			var pageX = e.pageX;
			var pageY = e.pageY - 30;

			if (pageX + 400 > clientWidth)
				pageX = pageX - 100 - (pageX + 400 - clientWidth);

			setbulkEdit(true);
			data.value = parseFloat(data.value).toFixed(2);
			setbulkEditData({ ...data, x: pageX, y: pageY });
		}
	}

	function closeBulkEdit(data) {
		setbulkEdit(false);
		setbulkEditData({
			blockId: -1,
			sectionId: -1,
			value: "",
			valueId: "",
			mode: "",
			title: "",
			x: 0,
			y: 0,
		});
	}

	function saveBulkEdit(valueToAdd) {
		var newData ={ ...data.data };

		if (bulkEditData.mode === "block") {
			splitBetweenItems(
				newData.sections[bulkEditData.sectionId].blocks[bulkEditData.blockId],
				valueToAdd,
				bulkEditData.valueId
			);
			updateSectionTotals(newData.sections[bulkEditData.sectionId]);
		} else if (bulkEditData.mode === "section") {
			splitBetweenBlocks(
				newData.sections[bulkEditData.sectionId],
				valueToAdd,
				bulkEditData.valueId
			);
		} else if (bulkEditData.mode === "whole") {
			splitBetweenSections(
				newData.sections,
				valueToAdd,
				bulkEditData.valueId,
				total
			);
		}
		// setdata(newData);
		updateTotals();
		closeBulkEdit();
	}

	function toggleTotals() {
		setdisplayTotals(!displayTotals);
	}

	function addTableRow(blockId, sectionId) {
		setData(initialState => {

			var data = { ...initialState };

			data.data.sections[sectionId].blocks[blockId].items.push({
				service_type: "",
				item_id: "U000000",
				title: "Nová položka",
				unit: "m",
				quantity: 1,
				unit_delivery_price: 0.0,
				unit_construction_price: 0.0,
				total_delivery_price: 0.0,
				total_construction_price: 0.0,
				total: 0.0,
			});

			if (data.data.sections[sectionId].blocks[blockId].items.length === 1) {
				updateTableRow(
					data.data.sections[sectionId].blocks[blockId].items[0],
					"total_construction_price",
					parseFloat(
						data.data.sections[sectionId].blocks[blockId].info.total_construction_price
					)
				);
				updateTableRow(
					data.data.sections[sectionId].blocks[blockId].items[0],
					"total_delivery_price",
					parseFloat(
						data.data.sections[sectionId].blocks[blockId].info.total_delivery_price
					)
				);
			}

			return data;
		});
	}

	function addSection() {

		setData(data => {

			var newData ={ ...data };

			newData.data.sections.push({
				info: {
					title: "Nová sekcia",
					total_delivery_price: 0,
					total_construction_price: 0,
					total: 0,
				},
				blocks: [],
			});

			addBlock(newData.data.sections.length - 1, 0);

			setTimeout(() => {
				document
					.getElementById("last-section")
					.scrollIntoView({ behavior: "smooth" });
			}, 100);

			return newData;
		});



	}

	function changeSectionTitle(sectionId, newTitle) {
		var newData ={ ...data.data };
		newData.sections[sectionId].info.title = newTitle;
	}

	function triggerTemplate(itemId, blockId, sectionId, type) {
		settemplateTrigger({
			itemId,
			blockId,
			sectionId,
			type,
		});
		setopenTemplate(true);
	}

	const value = {
		headers,
		total,
		initialTotal, setinitialTotal,
		changeValue,
		deleteRow,
		reorderRows,
		getTitle,

		reorderBlocks,
		addBlockFull,
		addBlock,
		deleteBlock,

		name,
		setname,
		changeSupplyerData,
		changeCustomerData,
		editBlockTitle,

		saveBulkEdit,
		bulkEdit,
		bulkEditData,
		openBulkEdit,
		closeBulkEdit,

		displayTotals,
		toggleTotals,

		reorderingBlocks,
		setreorderingBlocks,

		selectedFile,
		setselectedFile,

		logo,
		setlogo,

		loading,
		displaySidebar,
		setdisplaySidebar,

		handleSave,
		awaitHandleSave,

		saving,
		setsaving,

		addTableRow,
		calculateTotals,

		changeSectionTitle,
		addSection,
		deleteSection,

		description,
		changeDescription,

		openTemplate,
		setopenTemplate,
		templateTrigger,
		settemplateTrigger,
		triggerTemplate,
		dataDB,

		openFormulas,
		setOpenFormulas,
		setsignature,
		expiration,
		setexpiration,

		updateBlockTotals,
		updateSectionTotals,

		subHeading,
		setsubHeading,
	};

	return (
		<DataContext.Provider value={value}>
			{showUI ? (
				<>
					{!errorLoading && children}
					{errorLoading && <DoesNotExist />}
				</>
			) : (
				<CenovaPonukaSkeleton />
			)}

			{/* <FullPageLoading loading={loading}></FullPageLoading> */}
		</DataContext.Provider>
	);
}

export function useData() {
	return useContext(DataContext);
}

function DoesNotExist() {
	const router = useRouter();
	function handleSelect() {
		localStorage.removeItem("offerId");
		router.push("/dashboard");
	}
	return (
		<div className='h-screen flex justify-center items-center flex-col'>
			<div className='text-2xl'>Cenová ponuka sa nenašla</div>
			<ButtonPrimary onClick={handleSelect} className='mt-10' color='#006f85'>
				Zoznam projektov
			</ButtonPrimary>
		</div>
	);
}
