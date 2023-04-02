import { AnimatePresence } from "framer-motion";
import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
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
} from "../lib/valueChangeFunctions";
import AddRow from "../public/SVG/AddRow";
import CenovaPonukaSkeleton from "../components/skeletons/CenovaPonukaSkeleton";
import { forEach } from "lodash";
import { useAuth } from "./AuthContext";
import LayoutContext, { useLayout } from "./LayoutContext";
import ScreenLayout from "../components/ScreenLayout";

const DataContext = React.createContext();

export function AppWrap({ children, dbData }) {
	//console.log(props, "SSR data");
	const [data, setdata] = useState(dbData.data);
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
	const [logo, setlogo] = useState(dbData.logo);
	const [displaySidebar, setdisplaySidebar] = useState(true);
	const [saving, setsaving] = useState(false);
	const [showUI, setshowUI] = useState(false);
	const [description, setdescription] = useState(dbData.description);
	const [templateTrigger, settemplateTrigger] = useState(null);
	const [dataDB, setdataDB] = useState(dbData);
	const [signature, setsignature] = useState();
	const [expiration, setexpiration] = useState(
		dbData.expiration
			? moment(dbData.expiration).valueOf()
			: moment().add(14, "days")
	);
	var today = new Date();
	const [subHeading, setsubHeading] = useState(
		dbData.subHeading ? dbData.subHeading : "#" + today.toLocaleDateString("sk")
	);

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

	function handleSave(show) {
		const offerId = router.query.projectId;
		setsaving(true);
		const docRef = doc(firestore, `/offers/${offerId}`);

		updateDoc(docRef, {
			data: data,
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
		})
			.then((snap) => {
				//setdata(snap.data().data);
				if (show)
					toast("Dáta sa uložili", { autoClose: 3000, type: "success" });
				setsaving(false);
			})
			.catch((err) => {
				console.log(err);
				toast("Vyskytla sa chyba pri ukladaní", { type: "error" });
				setsaving(true);
			});
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
		debounce(() => settotal(calculateTotals()), 200),
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
		if (data != null) {
			dataInit();
			loadTotals();
			var newData = { ...data };
			newData.supplyer.company_name = userData?.name;
			newData.supplyer.dic = userData.supplyer.dic ? userData.supplyer.dic : "";
			newData.supplyer.email = userData.email ? userData.email : "";
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

			console.log(dbData.images);
			if (dbData?.images?.logo) {
				setlogo(dbData.images.logo);
			}

			if (dbData?.images?.signature) {
				setsignature(dbData.images.signature);
			}
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
					if (item.quantity == 0) item.quantity = 1;
					newData.sections[k].blocks[i].items[j].total =
						parseFloat(
							newData.sections[k].blocks[i].items[j].total_construction_price
						) +
						parseFloat(
							newData.sections[k].blocks[i].items[j].total_delivery_price
						);
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

	function addBlockFull(section, block) {
		let newData = { ...data };
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
		let newData = { ...data };

		var lengthBeforeInsert = newData.sections[sectionId].blocks.length;
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
		if (!template) {
			if (lengthBeforeInsert == 0) {
				addTableRow(blockId, sectionId);
			} else {
				addTableRow(blockId + 1, sectionId);
			}
		}
		updateSectionTotals(newData.sections[sectionId]);

		setdata({ ...newData });
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
		addBlock(newData.sections.length - 1, 0);
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
		data,
		headers,
		total,
		initialTotal,
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

		saving,
		setsaving,

		addTableRow,

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

		signature,
		setsignature,
		expiration,
		setexpiration,

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
