import { AnimatePresence } from "framer-motion";
import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { lang } from "../languages/languages";
import FullPageLoading from "../components/loading/FullPageLoading";
import { d, empty, newd, template_config } from "../data";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../lib/firebase";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import ButtonPrimary from "../components/ButtonPrimary";
import { toast } from "react-toastify";

import {
	splitBetweenBlocks,
	splitBetweenItems,
	splitBetweenSections,
	updateBlockTotals,
	updateSectionTotals,
	updateTableRow,
} from "../lib/valueChangeFunctions";
import AddRow from "../public/SVG/AddRow";

const DataContext = React.createContext();

export function AppWrap({ children }) {
	const [data, setdata] = useState(null);
	const [headers, setheaders] = useState(null);
	const [errorLoading, seterrorLoading] = useState(false);
	const [loading, setloading] = useState(true);
	const [name, setname] = useState("Zadajte názov...");
	const [bulkEdit, setbulkEdit] = useState(false);
	const [bulkEditData, setbulkEditData] = useState(null);
	const [displayTotals, setdisplayTotals] = useState(true);
	const [reorderingBlocks, setreorderingBlocks] = useState(false);
	const [download, setdownload] = useState(false);
	const [selectedFile, setselectedFile] = useState(null);
	const [logo, setlogo] = useState(null);
	const [displaySidebar, setdisplaySidebar] = useState(true);
	const [saving, setsaving] = useState(false);
	const [test, settest] = useState(null);

	const [total, settotal] = useState({
		total_delivery_price: 0,
		total_construction_price: 0,
		total: 0,
	});
	const [initialTotal, setinitialTotal] = useState(total);
	const router = useRouter();

	useEffect(() => {
		seterrorLoading(false);
		//nacitanie dat z db
		//const { projectId } = router.query;

		const projectId = localStorage.getItem("offerId");

		if (projectId && projectId != "") {
			const docRef = doc(firestore, `/offers/${projectId}`);
			getDoc(docRef).then((snap) => {
				if (snap.exists()) {
					setdata({ ...snap.data().data });
					setheaders(snap.data().data.headers);
					setname(snap.data().name);
				} else {
					seterrorLoading(true);
				}
				setloading(false);
			});
		} else {
			router.push("/cenova-ponuka/select-project/");
		}
	}, [router]);

	function handleSave() {
		const offerId = localStorage.getItem("offerId");
		if (!offerId) {
			console.log("error, missing ID");
			return;
		} else {
			setsaving(true);
			const docRef = doc(firestore, `/offers/${offerId}`);

			updateDoc(docRef, { data: data, name: name })
				.then((snap) => {
					//setdata(snap.data().data);
					toast("Dáta sa uložili", { autoClose: 3000, type: "success" });
					setsaving(false);
				})
				.catch((err) => {
					console.log(err);
					toast("Vyskytla sa chyba pri ukladaní", {
						autoClose: 3,
						type: "error",
					});
				});
		}
	}

	function calculateTotals() {
		var t = {
			total_delivery_price: 0,
			total_construction_price: 0,
			total: 0,
		};

		var newData = { ...data };

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
		debounce(() => settotal(calculateTotals()), 500),
		[loading]
	);

	useEffect(() => {
		// vypocet total price
		if (data != null) {
			loadTotals();
		}
	}, [data]);

	useEffect(() => {
		//kalkulácia ceny totalnej z blokov a pod...
		if (data) {
			dataInit();
			loadTotals();
		}
	}, [loading]);

	function dataInit() {
		// inizializacia dat

		var newData = { ...data };
		var t = {
			total_delivery_price: 0,
			total_construction_price: 0,
			total: 0,
		};

		newData.sections.map((section) => {
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
		newData.sections.map((section, k) => {
			var section_total = 0,
				section_total_delivery_price = 0,
				section_total_construction_price = 0;
			section.blocks.map((block, i) => {
				newData.sections[k].blocks[i].info.total =
					block.info["total_construction_price"] +
					block.info["total_delivery_price"];
				section_total_construction_price +=
					block.info["total_construction_price"];
				section_total_delivery_price += block.info["total_delivery_price"];
				section_total += newData.sections[k].blocks[i].info.total;

				block.items.map((item, j) => {
					newData.sections[k].blocks[i].items[j].total =
						newData.sections[k].blocks[i].items[j].total_construction_price +
						newData.sections[k].blocks[i].items[j].total_delivery_price;
					//2 desatinn
					newData.sections[k].blocks[i].items[j].total_construction_price =
						parseFloat(
							newData.sections[k].blocks[i].items[j].total_construction_price
						).toFixed(2);
					newData.sections[k].blocks[i].items[j].total_delivery_price =
						parseFloat(
							newData.sections[k].blocks[i].items[j].total_delivery_price
						).toFixed(2);

					newData.sections[k].blocks[i].items[j].unit_construction_price =
						parseFloat(
							newData.sections[k].blocks[i].items[j].unit_construction_price
						).toFixed(2);

					newData.sections[k].blocks[i].items[j].unit_delivery_price =
						parseFloat(
							newData.sections[k].blocks[i].items[j].unit_delivery_price
						).toFixed(2);
					newData.sections[k].blocks[i].items[j].total = parseFloat(
						newData.sections[k].blocks[i].items[j].total
					).toFixed(2);
				});
			});

			newData.sections[k].info.total = parseFloat(section_total).toFixed(2);
			newData.sections[k].info.total_construction_price = parseFloat(
				section_total_construction_price
			).toFixed(2);
			newData.sections[k].info.total_delivery_price = parseFloat(
				section_total_delivery_price
			).toFixed(2);
		});
		setdata(newData);
	}

	function changeValue(obj) {
		var newData = { ...data };

		updateTableRow(
			newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId],
			obj.valueId,
			obj.value
		);
		updateBlockTotals(newData.sections[obj.sectionId].blocks[obj.blockId]);

		updateSectionTotals(newData.sections[obj.sectionId]);

		setdata(newData);
	}

	function getValue(
		newData,
		{ sectionId = null, blockId = null, itemId = null },
		valueId = null
	) {
		if (
			sectionId != null &&
			blockId != null &&
			itemId != null &&
			valueId != null
		) {
			return newData.sections[sectionId].blocks[blockId].items[itemId][valueId];
		} else if (sectionId != null && blockId != null) {
			return newData.sections[sectionId].blocks[blockId][valueId];
		} else if (sectionId != null && valueId != null) {
			return newData.sections[sectionId][valueId];
		} else {
			return "err";
		}
	}

	function deleteRow(obj) {
		var newData = { ...data };
		var newPolozky = newData.sections[obj.sectionId].blocks[obj.blockId].items;

		newPolozky.splice(obj.itemId, 1);
		updateBlockTotals(newData.sections[obj.sectionId].blocks[obj.blockId]);
		updateSectionTotals(newData.sections[obj.sectionId]);

		setdata(newData);
	}

	function deleteBlock(sectionId, blockId) {
		var newData = { ...data };

		const [removed] = newData.sections[sectionId].blocks.splice(blockId, 1);

		updateSectionTotals(newData.sections[sectionId]);
		setdata(newData);
	}

	function deleteSection(sectionId) {
		var newData = { ...data };

		const [removed] = newData.sections.splice(sectionId, 1);
		setdata(newData);
	}

	const reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	function reorderRows(blockId, sectionId, e) {
		var newData = { ...data };

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
		var newData = { ...data };

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

	function addBlock(sectionId, blockId) {
		let newData = { ...data };

		var lengthBeforeInsert = newData.sections[sectionId].blocks.length;
		let newBlock = {
			info: {
				title: "Nový blok",
				total_delivery_price: 0,
				total_construction_price: 0,
				total: 0,
			},
			items: [],
		};

		newData.sections[sectionId].blocks.splice(blockId + 1, 0, newBlock);

		if (lengthBeforeInsert === 0) {
			newBlock.info.total = parseFloat(newData.sections[sectionId].info.total);
			newBlock.info.total_construction_price = parseFloat(
				newData.sections[sectionId].info.total_construction_price
			);
			newBlock.info.total_delivery_price = parseFloat(
				newData.sections[sectionId].info.total_delivery_price
			);
		}

		//newData.sections[sectionId].blocks.push(newBlock);

		setdata({ ...newData });
		addTableRow(blockId + 1, sectionId);
	}

	function getTitle(titleId, language) {
		return lang[language][titleId];
	}

	function changeSupplyerData(supplyerData) {
		var newData = { ...data };
		newData.supplyer = supplyerData;

		setdata(newData);
	}
	function changeCustomerData(customerData) {
		var newData = { ...data };
		newData.customer = customerData;
		setdata(newData);
	}

	function editBlockTitle(newTitle, sectionId, blockId) {
		var newData = { ...data };
		newData.sections[sectionId].blocks[blockId].info.title = newTitle;

		setdata(newData);
	}

	function openBulkEdit(data, e) {
		const clientWidth = document.body.clientWidth;
		var pageX = e.pageX;
		var pageY = e.pageY - 30;

		if (pageX + 400 > clientWidth)
			pageX = pageX - 100 - (pageX + 400 - clientWidth);

		setbulkEdit(true);
		data.value = parseFloat(data.value).toFixed(2);
		setbulkEditData({ ...data, x: pageX, y: pageY });
	}

	function closeBulkEdit(data) {
		setbulkEdit(false);
		setbulkEditData(null);
	}

	function saveBulkEdit(valueToAdd) {
		var newData = { ...data };

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
		setdata(newData);
		closeBulkEdit();
	}

	function toggleTotals() {
		setdisplayTotals(!displayTotals);
	}

	function addTableRow(blockId, sectionId) {
		var newData = { ...data };
		newData.sections[sectionId].blocks[blockId].items.push({
			service_type: "",
			item_id: "",
			title: "Nová položka",
			unit: "",
			quantity: 1,
			unit_delivery_price: 0.0,
			unit_construction_price: 0.0,
			total_delivery_price: 0.0,
			total_construction_price: 0.0,
			total: 0.0,
		});

		if (newData.sections[sectionId].blocks[blockId].items.length === 1) {
			updateTableRow(
				newData.sections[sectionId].blocks[blockId].items[0],
				"total_construction_price",
				parseFloat(
					newData.sections[sectionId].blocks[blockId].info
						.total_construction_price
				)
			);
			updateTableRow(
				newData.sections[sectionId].blocks[blockId].items[0],
				"total_delivery_price",
				parseFloat(
					newData.sections[sectionId].blocks[blockId].info.total_delivery_price
				)
			);
		}

		setdata(newData);
	}

	function addSection() {
		var newData = { ...data };
		newData.sections.push({
			info: {
				title: "Nová sekcia",
				total_delivery_price: 0,
				total_construction_price: 0,
				total: 0,
			},
			blocks: [],
		});

		setdata(newData);
		addBlock(newData.sections.length - 1, -1);
		setTimeout(() => {
			document
				.getElementById("last-section")
				.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}

	function changeSectionTitle(sectionId, newTitle) {
		var newData = { ...data };
		newData.sections[sectionId].info.title = newTitle;
	}

	const value = {
		data,
		headers,
		total,
		initialTotal,
		changeValue,
		deleteRow,
		reorderRows,
		getTitle,

		reorderBlocks,
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

		download,
		setdownload,

		selectedFile,
		setselectedFile,
		logo,
		loading,

		displaySidebar,
		setdisplaySidebar,

		handleSave,

		saving,
		setsaving,

		addTableRow,

		changeSectionTitle,
		addSection,
		deleteSection,
	};

	useEffect(() => {
		if (selectedFile && selectedFile.target.files.length > 0) {
			setlogo(URL.createObjectURL(selectedFile?.target?.files[0]));
		} else {
			setlogo(null);
		}
	}, [selectedFile]);

	return (
		<DataContext.Provider value={value}>
			{!loading && (
				<>
					{!errorLoading && children}
					{errorLoading && <DoesNotExist />}
				</>
			)}
			<FullPageLoading loading={loading}></FullPageLoading>
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
		router.push("/cenova-ponuka/select-project/");
	}
	return (
		<div className="h-screen flex justify-center items-center flex-col">
			<div className="text-2xl">Cenová ponuka sa nenašla</div>
			<ButtonPrimary onClick={handleSelect} className="mt-10" color="#006f85">
				Zoznam projektov
			</ButtonPrimary>
		</div>
	);
}
