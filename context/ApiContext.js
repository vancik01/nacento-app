import { createContext, useContext, useState, useEffect } from "react";
import { collection, doc, setDoc } from "firebase/firestore"
import { useRouter } from "next/router";
import { firestore } from "../lib/firebase";

import moment from "moment";
import { useAuth } from "../context/AuthContext";

import { useStepper } from "./StepperContext";


const UseApiContext = createContext();

export function ApiContext({ children }) {
    const [images, setimages] = useState([]);
	const [pdf, setPdf] = useState("");
    const [dataloading, setdataloading] = useState(false);
    const { hsdata, sethsdata } = useStepper()

    const { user } = useAuth();
    const router = useRouter();

    function DataToPriceOffer(type) {

        var api_route, data

        if(type=="HS"){
            api_route = "hruba_stavba/"
            data = {...hsdata}
        } 

        // fetch(`http://127.0.0.1:8000/api/data_offer_${api_route}`, {
        fetch(`https://api.nacento.online/api/data_offer_${api_route}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }).then((response) => {
            if (response.ok) {
                response.json().then((CP) => {

                    setdataloading(true);

                    const collectionRef = doc(collection(firestore, "/offers"));
                    //customBuild variable empty template
                    setDoc(collectionRef, {
                        id: collectionRef.id,
                        data: CP,
                        name: "Nová cenová ponuka",
                        created: moment().valueOf(),
                        userId: user != null ? user.uid : "none",
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

    function PredictParameters(type, pdf, setImage) {
        
        var path
        if(type === "ZD") path  = "zaklady/"
        else if(type === "MP") path  = "murivo/"
        else if(type === "ST") path  = "strecha/"

        // setActive(false);
        setdataloading(true);
        // fetch(`http://127.0.0.1:8000/api/${path}`, {
        fetch(`https://api.nacento.online/api/${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pdf),
        }).then((response) => {
            setdataloading(false);
            if (response.ok) {
                response.json().then((json) => {

                    if(type === "ZD") setZakladyData(json.data)
                    else if(type === "MP") setMurivoData(json.data)
                    else if(type === "ST") setStrechaData(json.data)

                    setImage(json.image);
                });
            }
        });
    }
    
    function setZakladyData(data){
        var newData = {...hsdata}

        if(parseInt(data[0])) newData.doska.objem = data[0]
        if(parseInt(data[1])) newData.doska.dt20 = data[1]
        if(parseInt(data[2])) newData.doska.dt30 = data[2]
        if(parseInt(data[3])) newData.doska.dt40 = data[3]
        if(parseInt(data[4])) newData.doska.obvod = data[4]
        if(parseInt(data[5])) newData.doska.plocha = data[5]

        sethsdata(newData)
    }

    function setMurivoData(data){
        var newData = {...hsdata}

        if(parseInt(data[0])) newData.murivo.t10 = data[0]
        if(parseInt(data[1])) newData.murivo.t15 = data[1]
        if(parseInt(data[2])) newData.murivo.t25 = data[2]
        if(parseInt(data[3])) newData.murivo.t30 = data[3]
        if(parseInt(data[4])) newData.murivo.t45 = data[4]

        sethsdata(newData)
    }

    function setStrechaData(data){
        var newData = {...hsdata}

        if(parseInt(data[0])) newData.strecha.plocha = data[0]

        sethsdata(newData)
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
        setPassed(false)
	}

  const value = {
    pdf, setPdf,

    DataToPriceOffer,
    PredictParameters,

    fileToBase64,
    handleFileChange,

    deletePdf,

    dataloading
  }

  return (
      <UseApiContext.Provider value={value}>
        {children}
      </UseApiContext.Provider>
  )
}

export function useApi() {
  return useContext(UseApiContext);
}
