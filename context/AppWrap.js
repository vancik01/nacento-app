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
		console.log(projectId);

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
			console.log(offerId);
			setsaving(true);
			const docRef = doc(firestore, `/offers/${offerId}`);

			updateDoc(docRef, { data: data, name: name })
				.then((snap) => {
					//setdata(snap.data().data);

					setsaving(false);
				})
				.catch((err) => {
					console.log(err);
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
			section.blocks.map((block) => {
				t.total_delivery_price += parseFloat(
					block.info["total_delivery_price"]
				);

				t.total_construction_price += parseFloat(
					block.info["total_construction_price"]
				);
			});
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
		if (obj.value < 0 || obj.value === NaN || isNaN(obj.value) || !obj.value) {
			obj.value = 0;
		}

		if (obj.valueId != "total") {
			newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId][
				obj.valueId
			] = parseFloat(obj.value);
		}

		if (obj.valueId === "total_construction_price") {
			//ak je quantity 0 nastav na 1
			if (
				newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId]
					.quantity == 0
			) {
				newData.sections[obj.sectionId].blocks[obj.blockId].items[
					obj.itemId
				].quantity = 1;
			}

			newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId][
				"unit_construction_price"
			] = parseFloat(
				parseFloat(obj.value) /
					newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId][
						"quantity"
					]
			).toFixed(2);
			newData.sections[obj.sectionId].blocks[obj.blockId].items[
				obj.itemId
			].total = parseFloat(
				parseFloat(
					newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId]
						.total_construction_price
				) +
					parseFloat(
						newData.sections[obj.sectionId].blocks[obj.blockId].items[
							obj.itemId
						].total_delivery_price
					)
			).toFixed(2);
		} else if (obj.valueId === "total_delivery_price") {
			newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId][
				"unit_delivery_price"
			] = (
				newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId][
					obj.valueId
				] /
				newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId][
					"quantity"
				]
			).toFixed(2);

			newData.sections[obj.sectionId].blocks[obj.blockId].items[
				obj.itemId
			].total_delivery_price = obj.value;

			newData.sections[obj.sectionId].blocks[obj.blockId].items[
				obj.itemId
			].total = parseFloat(
				parseFloat(
					newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId]
						.total_construction_price
				) +
					parseFloat(
						newData.sections[obj.sectionId].blocks[obj.blockId].items[
							obj.itemId
						].total_delivery_price
					)
			).toFixed(2);
		} else if (obj.valueId === "total") {
			var valueChange = obj.value - getValue(newData, obj, obj.valueId);
			var cmcIndex;
			var cdcIndex;
			if (parseFloat(getValue(newData, obj, obj.valueId)) !== 0) {
				var cmcIndex =
					getValue(newData, obj, "total_construction_price") /
					getValue(newData, obj, "total");
				var cdcIndex =
					getValue(newData, obj, "total_delivery_price") /
					getValue(newData, obj, "total");
			} else {
				var cmcIndex = 0.5;
				var cdcIndex = 0.5;
			}

			// console.log("cmc -> ", cmcIndex *100, "% ->" , parseFloat(valueChange * cmcIndex))
			// console.log("cdc -> ", cdcIndex *100, "%->", parseFloat(valueChange * cdcIndex))

			newData.sections[obj.sectionId].blocks[obj.blockId].items[
				obj.itemId
			].total_construction_price = (
				parseFloat(getValue(newData, obj, "total_construction_price")) +
				parseFloat(valueChange * cmcIndex)
			).toFixed(2);
			newData.sections[obj.sectionId].blocks[obj.blockId].items[
				obj.itemId
			].total_delivery_price = (
				parseFloat(parseFloat(getValue(newData, obj, "total_delivery_price"))) +
				parseFloat(valueChange * cdcIndex)
			).toFixed(2);

			newData.sections[obj.sectionId].blocks[obj.blockId].items[
				obj.itemId
			].unit_construction_price = parseFloat(
				getValue(newData, obj, "total_construction_price") /
					getValue(newData, obj, "quantity")
			).toFixed(2);

			newData.sections[obj.sectionId].blocks[obj.blockId].items[
				obj.itemId
			].unit_delivery_price = parseFloat(
				getValue(newData, obj, "total_delivery_price") /
					getValue(newData, obj, "quantity")
			).toFixed(2);

			newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId][
				obj.valueId
			] = parseFloat(obj.value);
		} else {
			newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId][
				"total_construction_price"
			] =
				newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId][
					"unit_construction_price"
				] *
				newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId][
					"quantity"
				];
			newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId][
				"total_delivery_price"
			] =
				newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId][
					"unit_delivery_price"
				] *
				newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId][
					"quantity"
				];
			newData.sections[obj.sectionId].blocks[obj.blockId].items[
				obj.itemId
			].total =
				newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId][
					"total_construction_price"
				] +
				newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId][
					"total_delivery_price"
				];
			//2 desatinné miesta
			newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId][
				"total_construction_price"
			] = parseFloat(
				newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId][
					"total_construction_price"
				]
			).toFixed(2);
			newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId][
				"unit_construction_price"
			] = parseFloat(
				newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId][
					"unit_construction_price"
				]
			).toFixed(2);
			newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId][
				"total"
			] = parseFloat(
				newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId][
					"total"
				]
			).toFixed(2);
		}

		newData.sections[obj.sectionId].blocks[obj.blockId].info[
			"total_delivery_price"
		] = 0;
		newData.sections[obj.sectionId].blocks[obj.blockId].info[
			"total_construction_price"
		] = 0;

		newData.sections[obj.sectionId].blocks[obj.blockId].items.map(
			(polozka, i) => {
				newData.sections[obj.sectionId].blocks[obj.blockId].info[
					"total_delivery_price"
				] += parseFloat(polozka["total_delivery_price"]);
				newData.sections[obj.sectionId].blocks[obj.blockId].info[
					"total_construction_price"
				] += parseFloat(polozka["total_construction_price"]);
			}
		);

		newData.sections[obj.sectionId].info["total_delivery_price"] = 0;
		newData.sections[obj.sectionId].info["total_construction_price"] = 0;
		newData.sections[obj.sectionId].blocks.map((block, i) => {
			newData.sections[obj.sectionId].info["total_delivery_price"] =
				parseFloat(
					newData.sections[obj.sectionId].info["total_delivery_price"]
				) + parseFloat(block.info["total_delivery_price"]);
			newData.sections[obj.sectionId].info["total_construction_price"] =
				parseFloat(
					newData.sections[obj.sectionId].info["total_construction_price"]
				) + parseFloat(block.info["total_construction_price"]);
			newData.sections[obj.sectionId].info["total"] =
				parseFloat(
					newData.sections[obj.sectionId].info["total_delivery_price"]
				) +
				parseFloat(
					newData.sections[obj.sectionId].info["total_construction_price"]
				);
		});

		newData.sections[obj.sectionId].blocks.map((block, i) => {
			newData.sections[obj.sectionId].blocks[i].info.total =
				block.info["total_construction_price"] +
				block.info["total_delivery_price"];
		});

		var x = getValue(newData, obj, "total");
		x = 696969;

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
		var polozkaRemoved =
			newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.itemId];
		var newPolozky = newData.sections[obj.sectionId].blocks[obj.blockId].items;
		console.log(polozkaRemoved, "removed");

		newPolozky.splice(obj.itemId, 1);
		newData.sections[obj.sectionId].blocks[
			obj.blockId
		].info.total_construction_price -= parseFloat(
			polozkaRemoved.total_construction_price
		).toFixed(2);

		newData.sections[obj.sectionId].blocks[
			obj.blockId
		].info.total_delivery_price -= parseFloat(
			polozkaRemoved.total_delivery_price
		).toFixed(2);

		newData.sections[obj.sectionId].blocks[obj.blockId].info.total -=
			parseFloat(
				polozkaRemoved.total_delivery_price * 1 +
					polozkaRemoved.total_construction_price * 1
			).toFixed(2);

		setdata(newData);
	}

	function deleteBlock(sectionId, blockId) {
		var newData = { ...data };

		const [removed] = newData.sections[sectionId].blocks.splice(blockId, 1);
		console.log(removed);

		newData.sections[sectionId].info.total_construction_price -=
			removed.info.total_construction_price;
		newData.sections[sectionId].info.total_delivery_price -=
			removed.info.total_delivery_price;
		newData.sections[sectionId].info.total -= removed.info.total;

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

	function addBlock(sectionId) {
		var newData = { ...data };
		newData.sections[sectionId].blocks.push({
			info: {
				title: "",
				total_delivery_price: 0,
				total_construction_price: 0,
				total: 0,
			},
			items: [],
		});

		setdata(newData);
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

	function openBulkEdit(data) {
		setbulkEdit(true);
		setbulkEditData(data);
	}

	function closeBulkEdit(data) {
		setbulkEdit(false);
		setbulkEditData(null);
	}

	function saveBulkEdit(value, blockId, sectionId, valueId) {
		if (value == 0) return;

		var newData = { ...data };

		if (
			blockId >= 0 &&
			newData.sections[sectionId].blocks[blockId].items.length == 0
		) {
			if (valueId == "total") {
				if (newData.sections[sectionId].blocks[blockId].info["total"] === 0) {
					newData.sections[sectionId].blocks[blockId].info[
						"total_construction_price"
					] = parseFloat(value / 2).toFixed(2);

					newData.sections[sectionId].blocks[blockId].info[
						"total_delivery_price"
					] = parseFloat(value / 2).toFixed(2);

					newData.sections[sectionId].blocks[blockId].info["total"] =
						parseFloat(value).toFixed(2);
				} else {
					var cdcIndex =
						newData.sections[sectionId].blocks[blockId].info[
							"total_delivery_price"
						] / newData.sections[sectionId].blocks[blockId].info["total"];

					var cmcIndex =
						newData.sections[sectionId].blocks[blockId].info[
							"total_construction_price"
						] / newData.sections[sectionId].blocks[blockId].info["total"];

					newData.sections[sectionId].blocks[blockId].info["total"] =
						parseFloat(
							newData.sections[sectionId].blocks[blockId].info["total"]
						) + parseFloat(value);

					console.log(cdcIndex, cmcIndex);
					newData.sections[sectionId].blocks[blockId].info[
						"total_construction_price"
					] =
						parseFloat(
							newData.sections[sectionId].blocks[blockId].info[
								"total_construction_price"
							]
						) + parseFloat(value * cmcIndex);

					newData.sections[sectionId].blocks[blockId].info[
						"total_delivery_price"
					] =
						parseFloat(
							newData.sections[sectionId].blocks[blockId].info[
								"total_delivery_price"
							]
						) + parseFloat(value * cdcIndex);
				}
			} else {
				newData.sections[sectionId].blocks[blockId].info[valueId] =
					parseFloat(
						newData.sections[sectionId].blocks[blockId].info[valueId]
					) + parseFloat(value);

				newData.sections[sectionId].blocks[blockId].info["total"] =
					parseFloat(
						newData.sections[sectionId].blocks[blockId].info["total"]
					) + parseFloat(value);
			}

			setdata(newData);
			return;
		}

		var sum = parseFloat(
			newData.sections[sectionId].blocks[blockId].info[valueId]
		);
		var allZero = true;

		newData.sections[sectionId].blocks[blockId].items.map((item, i) => {
			//console.log(`${((item[valueId] / sum) *100).toFixed(2)}% -> + ${((item[valueId] / sum) * value).toFixed(2)}`)
			item[valueId] = parseFloat(item[valueId]);
			if (item[valueId] === 0 || item["quantity"] === 0) {
			} else {
				changeValue({
					blockId: blockId,
					sectionId: sectionId,
					itemId: i,
					valueId: valueId,
					value: parseFloat(
						parseFloat(
							newData.sections[sectionId].blocks[blockId].items[i][valueId]
						) + parseFloat((item[valueId] / sum) * value)
					).toFixed(2),
				});
				allZero = false;
			}
		});

		if (allZero) {
			newData.sections[sectionId].blocks[blockId].items.map((item, i) => {
				// console.log(
				// 	`${((item[valueId] / sum) * 100).toFixed(2)}% -> + ${(
				// 		(item[valueId] / sum) *
				// 		value
				// 	).toFixed(2)}`
				// );
				changeValue({
					blockId: blockId,
					sectionId: sectionId,
					itemId: i,
					valueId: valueId,
					value: (
						parseFloat(
							newData.sections[sectionId].blocks[blockId].items[i][valueId]
						) +
						parseFloat(
							value / newData.sections[sectionId].blocks[blockId].items.length
						)
					).toFixed(2),
				});
			});
		}
	}

	function toggleTotals() {
		setdisplayTotals(!displayTotals);
	}

	function changeTableRow(value, valueId, rowId, blockId, sectionId) {
		var newData = { ...data };
		newData.sections[sectionId].blocks[blockId].items[rowId][valueId] = value;
		setdata(newData);
	}

	function addTableRow(blockId, sectionId) {
		var newData = { ...data };
		newData.sections[sectionId].blocks[blockId].items.push({
			service_type: "",
			item_id: "",
			title: "",
			unit: "",
			quantity: 1,
			unit_delivery_price: 0,
			unit_construction_price: 0,
			total_delivery_price: 0,
			total_construction_price: 0,
			total: 0,
		});

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

		changeTableRow,
		addTableRow,

		changeSectionTitle,
		addSection,

		test,
		settest,
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
