import { createContext, useContext, useState, useEffect } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { firestore } from "../lib/firebase";
import moment from "moment/moment";
import { toast } from "react-toastify";


import { useAuth } from "../context/AuthContext";

import { useStepper } from "./StepperContext";
import { useData } from "./AppWrap";
import { getValue } from "./ValuesContext";
import { updateTotals } from "../lib/valueChangeFunctions";

const UseApiContext = createContext();

export function ApiContext({ children }) {
	const [images, setimages] = useState([]);
	const [pdf, setPdf] = useState("");
	const [dataloading, setdataloading] = useState(false);
	const { hsdata, sethsdata, edata, vdata } = useStepper();

	const { calculateTotals, initialTotal, setinitialTotal, setname } = useData()  

	const [data, setData] = getValue((store) => store);

	const { user } = useAuth();
	const router = useRouter();

	function DataToPriceOffer(type) {
		var api_route, data, name;

		if (type == "HS") {
			api_route = "hruba_stavba/";
			data = { ...hsdata };
			name = "Hrubá Stavba Rodinného Domu"
		}

        if(type=="EL"){
            api_route = "elektro/"
            data = {...edata}
			name = "Elektroinštalácie Rodinného Domu"
        }

		if(type=="VY"){
            api_route = "vykurovanie/"
            data = {...vdata}
			name = "Vykurovanie Rodinného Domu"
        }

		setdataloading(true);

		// fetch(`http://127.0.0.1:8000/api/data_offer_${api_route}`, {
		fetch(`https://api.nacento.online/api/data_offer_${api_route}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		}).then((response) => {
			if (response.ok) {
				response.json().then((CP) => {

					setdataloading(false);

                    const collectionRef = doc(collection(firestore, "/offers"));
                    //customBuild variable empty template
                    setDoc(collectionRef, {
                        id: collectionRef.id,
                        data: CP,
                        name: name,
                        created: moment().valueOf(),
                        userId: user != null ? user.uid : "none",
                        totals: {
                            total_delivery_price: 0,
                            total_construction_price: 0,
                            total: 0,
                        },
                    })
                        .then((response) => {
                            router.push(`/cenova-ponuka/${collectionRef.id}`);

							setloading(false);
						})
						.catch((err) => {
							console.log(err);
						});
				});
			}
		});

	}

	function set_new_data(sections){

		setname('Hrubá Stavba Rodinného Domu')

		setData(data => {

			var newData = { ...data };

			var dodavka = 0
			var montaz = 0

			sections.forEach(section => {
				dodavka += section.info.total_delivery_price
				montaz += section.info.total_construction_price
				newData.data.sections.push(section)

			});
	
			// calculateTotals()

			setinitialTotal({
				total_delivery_price: initialTotal.total_delivery_price + dodavka,
				total_construction_price:  initialTotal.total_construction_price + montaz,
				total: initialTotal.total + dodavka + montaz,
			})

			updateTotals(newData);

			return newData;
		});	
	}

	async function DataToSectionList(type){
		var api_route, apidata, name;

		if (type == "zakladovka" || type == 'murivo' || type=="strecha") {
			api_route = "hruba_stavba/";
			apidata = { ...hsdata };
		}

        if(type=="pripojka" || type=="instalacky" || type=="bleskozvod" || type=="predpripravy"){
            api_route = "elektro/"
            apidata = {...edata}
        }

		if(type=="vykurovanie"){
            api_route = "vykurovanie/"
            apidata = {...vdata}
        }

		apidata.type = type

		setdataloading(true);

		// fetch(`http://127.0.0.1:8000/api/sectionList_${api_route}`, {
		await fetch(`https://api.nacento.online/api/sectionList_${api_route}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(apidata),
		}).then((response) => {
			if (response.ok) {
				response.json().then((sections) => {
					toast('Položky pridané do ponuky', { type: "success" , autoClose: 3000});
					set_new_data(sections)
					setdataloading(false);

				});
			}


		}) .catch((err) => {
			setdataloading(false);
			console.log(err);
		});
	}

	function PredictParameters(type, pdf, setImage) {
		var path;
		if (type === "ZD") path = "zaklady/";
		else if (type === "MP") path = "murivo/";
		else if (type === "ST") path = "strecha/";

		// setActive(false);
		setdataloading(true);
		// fetch(`http://127.0.0.1:8000/api/${path}`, {
		fetch(`https://api.nacento.online/api/${path}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(pdf),
		}).then((response) => {

			if (response.ok) {
				response.json().then((json) => {
					if (type === "ZD") setZakladyData(json.data);
					else if (type === "MP") setMurivoData(json.data);
					else if (type === "ST") setStrechaData(json.data);
					setImage(json.image);
				});
			}

		}).catch((error) => {

			toast('Súbor je príliš veľký', { type: "error" , autoClose: 5000});
			setdataloading(false);

		});
	}

	function setZakladyData(data) {
		var newData = { ...hsdata };

		if (parseInt(data[0])) newData.doska.objem = data[0];
		if (parseInt(data[1])) newData.doska.dt20 = data[1];
		if (parseInt(data[2])) newData.doska.dt30 = data[2];
		if (parseInt(data[3])) newData.doska.dt40 = data[3];
		if (parseInt(data[4])) newData.doska.obvod = data[4];
		if (parseInt(data[5])) newData.doska.plocha = data[5];

		sethsdata(newData);
	}

	function setMurivoData(data) {
		var newData = { ...hsdata };

		if (parseInt(data[0])) newData.murivo.t10 = data[0];
		if (parseInt(data[1])) newData.murivo.t15 = data[1];
		if (parseInt(data[2])) newData.murivo.t25 = data[2];
		if (parseInt(data[3])) newData.murivo.t30 = data[3];
		if (parseInt(data[4])) newData.murivo.t45 = data[4];

		sethsdata(newData);
	}

	function setStrechaData(data) {
		var newData = { ...hsdata };

		if (parseInt(data[0])) newData.strecha.plocha = data[0];

		sethsdata(newData);
	}

	const fileToBase64 = (file, cb) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			cb(null, reader.result);
		};
		reader.onerror = function (error) {
			cb(error, null);
		};
	};

	const handleFileChange = (event, setFileName, setPdf) => {
		const fileObj = event.target.files && event.target.files[0];
		if (!fileObj) return;

		if (fileObj.type !== "application/pdf") {
			alert("Prosím vložte PDF súbor");
			return;
		}

		fileToBase64(fileObj, async (err, result) => {
			if (result) {
				setFileName(fileObj.name);
				setPdf(result);
			}
		});

		event.target.value = null;
	};

	function deletePdf(setFileName, setPdf, setPassed) {
		setFileName(null);
		setPdf("");
		setPassed(false);
	}

	const value = {
		pdf,
		setPdf,

		DataToPriceOffer,
		PredictParameters,

		fileToBase64,
		handleFileChange,

		deletePdf,

		dataloading,
		DataToSectionList
	};

	return (
		<UseApiContext.Provider value={value}>{children}</UseApiContext.Provider>
	);
}

export function useApi() {
	return useContext(UseApiContext);
}
