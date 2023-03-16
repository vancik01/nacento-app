import { Input } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";
import Layout from "./Layout";
import ThreejsView from "./landing_page/ThreejsView";
import x from "../public/static/x.svg"
import FullPageLoading from "../components/loading/FullPageLoading";
import { firestore } from "../lib/firebase";
import moment from "moment";
import { useAuth } from "../context/AuthContext"
import {
	collection,
	doc,
	setDoc,
} from "firebase/firestore";


export default function Preds() {

	const [data, setdata] = useState([{
		"id":"zaklady",
		"label":"Základová doska",
		"items":[
			{
				"id":"ryhy",
				"label":"Výkopové pásy",
				"items":[
					{
						"id":"dlzka",
						"label":"Dĺžka",
						"value":0,
						"unit":"m"
					},
					{
						"id":"sirka",
						"label":"Šírka",
						"value":0,
						"unit":"m"
					},
					{
						"id":"hlbka",
						"label":"Hĺbka",
						"value":0,
						"unit":"m"
					}
				]
			},
			{
				"id":"rozmery",
				"label":"Rozmery stavby",
				"items":[
					{
						"id":"obsah",
						"label":"Obsah",
						"value":0,
						"unit":"m2"
					},
					{
						"id":"obvod",
						"label":"Obvod",
						"value":0,
						"unit":"m"
					}
				]
			},
			{
				"id": "dt",
				"label":"Debniace tvárnice",
				"items" : [
					{
						"id":"50x20x25",
						"label":"20tky",
						"value": 0,
						"unit":"ks"
					},
					{
						"id":"30",
						"label":"30tky",
						"value": 0,
						"unit":"ks"
					},
					{
						"id":"40",
						"label":"40tky",
						"value": 0,
						"unit":"ks"
					}
				]
				
			},
			
		]
	},{
	  "id":"murivo",
	  "label":"Murovací materiál",
	  "items":[
	  {
		  "id":"ytong_rozmer",
		  "label":"YTONG rozmer",
		  "items":[
		  {
			  "id":"10",
			  "label":"10",
			  "value": 0,
			  "unit":"ks"
		  },
		  {
			  "id":"15", 
			  "label":"15", 
			  "value": 0,
			  "unit":"ks"
		  },
		  {
			  "id":"25", 
			  "label":"25", 
			  "value": 0,
			  "unit":"ks"
		  },
		  {
			  "id":"30", 
			  "label":"30", 
			  "value": 0,
			  "unit":"ks"
		  },
		  {
			  "id":"45", 
			  "label":"45", 
			  "value": 0,
			  "unit":"ks"
		  }]
	  }]
  }, {  
	"id" : "strecha",
	"label" : "Strecha",
	"items" : [
		{
			"id":"strecha",
				"label":"Rozmery",
				"items":[
					{
						"id":"obsah",
						"label":"Obsah",
						"value": 0,
						"unit":"m2"
					}
			]
		}
	]          
  }])

	const [images, setimages] = useState([])
	const [zakaldyPdf, setZaklady] = useState("");
	const [podorysyPdf, setPodorysy] = useState([]);
	const [strechaPdf, setStrecha] = useState("");
	const [active, setActive] = useState(true);
	const [loading, setloading] = useState(false);
	const { user } = useAuth()
  	const router = useRouter()


	function handleChange(e) {
		const newData = [...data];
		var identificator = e.target.name;
		var value = e.target.value;

		var ids = identificator.split(";");
		if (ids.length == 2) {
			newData[ids[0]].items[[ids[1]]].value = parseFloat(value);
		} else if (ids.length === 3) {
			newData[ids[0]].items[[ids[1]]].items[ids[2]].value = parseFloat(value);
		}
		setdata(newData);
	}

	function redirect_to_ponuka() {
		fetch(`http://127.0.0.1:8000/api/make_from_preds/`, {
		// fetch(`http://165.227.150.191/api/make_from_preds/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		}).then((response) => {
			if (response.ok) {
				response.json().then((CP) => {
					setloading(true);
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
							// router.push(`/cenova-ponuka/${collectionRef.id}`);
							localStorage.setItem("offerId", collectionRef.id);
							router.push(`/cenova-ponuka/`);
							setloading(false);
						})
						.catch((err) => {
							console.log(err);
						});
				});
			}
		});
	}

	function make_predicions() {
		var data = {
			zaklady: zakaldyPdf,
			podorysy: podorysyPdf,
			strecha: strechaPdf,
		};

		setActive(false)
		setloading(true);
		// fetch(`http://165.227.150.191/api/aspdf/`, {
		fetch(`http://127.0.0.1:8000/api/aspdf/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		}).then((response) => {
			setloading(false);
			if (response.ok) {
				response.json().then((json) => {
					console.log(json)
					setdata(json.data);
					setimages(json.images);
				});
			}
		});
	}

	return (
		<Layout className=" text-center">
			<FullPageLoading loading={loading}></FullPageLoading>
			<div className="flex justify-evenly">
			{data.map((block1, i) => {
				return (
					<div className="flex flex-col items-center gap-3">
					<div className="mt-16">
						{/* <div className="text-xl font-semibold"> {block1.label} </div> */}
						{i<images.length? <div className="text-xl"> <ThreejsView label={block1.label} image={images[i]} /> 
						 </div> : <div className="text-xl"> <ThreejsView label={block1.label} /> 
						 </div>}
	
						<div>
							{block1?.items.map((item, q) => {
								if ("value" in item) {
									return (
										<InputValue
											key={`${i};${q}`}
											id={`${i};${q}`}
											onChange={handleChange}
											label={item.label}
											value={data[i].items[[q]].value}
											unit={item.unit}
										/>
									);
								}
							})}
						</div>

						<div className="flex justify-center gap-2">
							{block1?.items.map((block2, j) => {
								return (
									<div className="">
										{block2?.items && (
											<div className="mt-8 bg-gray-100 px-6 py-3  rounded-sm">
												<div>
													<div> {block2.label}</div>
													<div className="flex flex-col justify-center">
														{block2.items.map((block3, k) => {
															return (
																<InputValue
																	id={`${i};${j};${k}`}
																	onChange={handleChange}
																	label={block3.label}
																	value={block3.value}
																	unit={block3.unit}
																/>
															);
														})}
													</div>
												</div>
											</div>
										)}
									</div>
								);
							})}
						</div>
					</div>
					
					{i === 0 && <FileButton title={"Pôdorys základov"} toSend={setZaklady}/>}
					{i === 1 && <FileButton title={"Pôdorys NP"} toSend={setPodorysy}/>}
					{i === 2 && <FileButton title={"Pôdorys strechy"} toSend={setStrecha}/>}

					</div>
				);
			})}
			
			</div>

			{((zakaldyPdf || podorysyPdf.length || strechaPdf) && active) && (
					<button onClick={make_predicions} className={`py-4 px-8 hover:bg-gray-50 border rounded-md  justify-center gap-2 text-start `}> Vyplň údaje </button>
				)}

				<div className="flex justify-center mt-20 gap-2">
                    <button onClick={redirect_to_ponuka}  className={`py-4 px-8 bg-gray-50 hover:bg-transparent	 border rounded-md`}>Vytvoriť cenovú ponuku</button>
                  </div>

		</Layout>
	);
}


function FileButton(props){
	const [fileName, setFileName] = useState(null)
	const inputRef = useRef(null);

	const handleClick = () => {
		inputRef.current.click();
	  }
	  const fileToBase64 = (file, cb) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = function () {
		  cb(null, reader.result)
		}
		reader.onerror = function (error) {
		  cb(error, null)
		}
	  }

	  const handleFileChange = event => {
		const fileObj = event.target.files && event.target.files[0];
		if (!fileObj) return;
		
		if(fileObj.type !== 'application/pdf'){
		  alert('Prosím vložte PDF súbor')
		  return
		}
		
		fileToBase64(fileObj, async (err, result)  => {
		  if (result) {
			setFileName(fileObj)
			if(props.title === "Pôdorys NP") props.toSend([result])
			else props.toSend(result)

		  }
		})
	
		event.target.value = null;
	  }

	  function deletePDF(){
		setFileName(null)
		if(props.title === "Pôdorys NP") props.toSend([])
		else props.toSend('')
	  }

	return(
	<>
		{!fileName && <>
			<input className='hidden' ref={inputRef} type="file" onChange={handleFileChange} />
			<button onClick={handleClick} className={`py-2 px-8 hover:bg-gray-50 border rounded-md`}>{props.title}</button>
		</>	}

		{fileName && <>
			<div className="filename pt-2 text-lg flex justify-center gap-2">
            	{fileName.name} <img src={x.src} onClick={deletePDF} className="w-5 cursor-pointer"/>
         	 </div>
		</>}
			
	</>
	
	)
}



function InputValue({ id, label, value, valueId, onChange, unit }) {
	return (
		<div className="mt-4 flex items-center gap-4">
			<div className="text-sm">{label}</div>
			<div className="bg-gray-300 w-24 px-2">
				<Input
					onChange={onChange}
					value={value}
					name={id}
					style={{ backgroundColor: "#D9D9D9" }}
					disableUnderline
					inputProps={{ min: 0 }}
					type="number"
					endAdornment={unit}
				/>
			</div>
		</div>
	);
}
