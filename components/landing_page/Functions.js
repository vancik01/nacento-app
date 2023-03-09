import React, { useState } from "react";
import Link from "next/link";
import FunctionsDiv from "./FunctionDiv";
import FunctionDiv_p from "./FunctionDiv_p";
import test from "../../lib/test.json";

import Preds from "../config-page";

import Zaklady from "../../public/static/Zaklady.png";
import Murivo from "../../public/static/Murivo.png";
import Strecha from "../../public/static/Strecha.png";

import CP from "../../public/static/templates_CP.json";
import FullPageLoading from "../loading/FullPageLoading";
import {
	addDoc,
	collection,
	doc,
	documentId,
	setDoc,
} from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import { customBuild, newd } from "../../data";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import moment from "moment";

function Functions() {
	const [preds, setPreds] = useState([]);
	const [zakaldyPdf, setZaklady] = useState("");
	const [podorysyPdf, setPodorysy] = useState([]);
	const [strechaPdf, setStrecha] = useState("");
	const [loading, setloading] = useState(false);
	const { user } = useAuth();

	const router = useRouter();

	function sum_total_prices(){
		for(let s=0; s<CP.sections.length; s++){
	
		  for(let b=0; b<CP.sections[s].blocks.length; b++){
			let block_delivery_total = 0
			let block_construction_total = 0
	
			for(let i=0; i<CP.sections[s].blocks[b].items.length; i++){
			  let quantity = CP.sections[s].blocks[b].items[i].quantity
			  let unit_delivery_price = CP.sections[s].blocks[b].items[i].unit_delivery_price
			  let unit_construcion_price = CP.sections[s].blocks[b].items[i].unit_construction_price
	
			  CP.sections[s].blocks[b].items[i].total_delivery_price = round(quantity * unit_delivery_price)
			  CP.sections[s].blocks[b].items[i].total_construction_price = round(quantity * unit_construcion_price)
	
			  block_delivery_total += CP.sections[s].blocks[b].items[i].total_delivery_price
			  block_construction_total += CP.sections[s].blocks[b].items[i].total_construction_price
	
			}
			CP.sections[s].blocks[b].info.total_construction_price = block_construction_total
			CP.sections[s].blocks[b].info.total_delivery_price = block_delivery_total
	
		  }
		}
	
	
	  }
	
	  function create_zakladova_doska(plocha, obvod, ryhy, dt){
		//// Zemne prace
		let odstranenie_ornice = round((plocha*0,24))
		let objem_ryhy = round(((ryhy[0]*ryhy[1]*ryhy[2])))
		let sypanina = odstranenie_ornice + objem_ryhy + 6.74
		CP.sections[0].blocks[0].items[1].quantity = odstranenie_ornice //Odstranenie ornice
		CP.sections[0].blocks[0].items[2].quantity = objem_ryhy //Vykop ryhy
		CP.sections[0].blocks[0].items[3].quantity = round(6.74) //Odkopavka
		CP.sections[0].blocks[0].items[4].quantity = objem_ryhy //Premiestnenie vykopu
		CP.sections[0].blocks[0].items[5].quantity = sypanina //Nakladanie
		CP.sections[0].blocks[0].items[6].quantity = sypanina //Ulozenie
	
		//// Zakladanie
		let nasyp = round(((plocha-(ryhy[0]*0.3))*0.5))
		console.log('-???', round(((plocha-(ryhy[0]*0.3))*0.5)))
		let beton = round((plocha * 0.15))
		let vystuz = round((plocha * 1.25))
		let dt40 = round((dt[2] * 0.05))
		let dt30 = round((dt[1] * 0.0375))
		let dt25 = round((0 * 0.03125))
		let dt20 = round((dt[0] * 0.025))
		let beton_pasov = round((ryhy[0]*ryhy[1]*ryhy[2]))
		let vystuz_murivo = round((plocha*0.0025))
		CP.sections[0].blocks[1].items[0].quantity = nasyp //Nasyp
		CP.sections[0].blocks[1].items[1].quantity = beton //Beton
		CP.sections[0].blocks[1].items[2].quantity = vystuz //Vystuz
		CP.sections[0].blocks[1].items[3].quantity = dt40 //dt40
		CP.sections[0].blocks[1].items[4].quantity = dt30 //dt30
		CP.sections[0].blocks[1].items[5].quantity = dt25 //dt25
		CP.sections[0].blocks[1].items[6].quantity = dt20 //dt20
		CP.sections[0].blocks[1].items[7].quantity = beton_pasov //beton_pasov
		CP.sections[0].blocks[1].items[8].quantity = vystuz_murivo //vystuz pre murivo
	
	
		//// Zvisle konstruckie
		let doska_xps = round((obvod*0.8*0.75))
		CP.sections[0].blocks[2].items[0].quantity = 4 //lozko
		CP.sections[0].blocks[2].items[1].quantity = 2.5 //lozko
		CP.sections[0].blocks[2].items[2].quantity = doska_xps //doska xps
		CP.sections[0].blocks[2].items[3].quantity = doska_xps //profilova folia
	
		//// presun hmot
		let presun_hmot = round((plocha*0.13))
		CP.sections[0].blocks[3].items[0].quantity = presun_hmot //prpesun hmot
	
		//// zdravotenichnika - vnutorna kanalizacia
		let potrubie_z_rur = round((plocha/5))
		let koleno = Math.round((plocha/4))
		let rura = Math.round((plocha*0.3))
		CP.sections[0].blocks[4].items[0].quantity = potrubie_z_rur //potruebie z rur
		CP.sections[0].blocks[4].items[1].quantity = koleno //koleno
		CP.sections[0].blocks[4].items[2].quantity = rura //rura
	
		//// zdravotenichnika - vnutorna kanalizacia
		let uzemnovacie_vedenie = round((obvod*1,1))
		CP.sections[0].blocks[5].items[0].quantity = 40 //rura ohubna vlnita pancierova
		CP.sections[0].blocks[5].items[1].quantity = uzemnovacie_vedenie //uzmenovancie vedenie
		CP.sections[0].blocks[5].items[2].quantity = uzemnovacie_vedenie //uzemnovacia pasovina
		CP.sections[0].blocks[5].items[3].quantity = 48 //drot bleskozvodovy
	  }
	  
	  function create_murivo(m10, m15, m25, m30, m45){
		CP.sections[1].blocks[0].items[0].quantity = round(m45*0.05591295)
		CP.sections[1].blocks[0].items[1].quantity = round(m30*0.0372753)
		CP.sections[1].blocks[0].items[2].quantity = round(m25*0.03106275)
		CP.sections[1].blocks[0].items[3].quantity = round(m15*0.01863765)
		CP.sections[1].blocks[0].items[4].quantity = round(m10*0.0124251)
		CP.sections[1].blocks[0].items[5].quantity = 65
		CP.sections[1].blocks[0].items[6].quantity = 6.2
		CP.sections[1].blocks[0].items[7].quantity = 1
		CP.sections[1].blocks[0].items[8].quantity = 1
		CP.sections[1].blocks[0].items[9].quantity = 164.03
		CP.sections[1].blocks[0].items[10].quantity = 164.03
		CP.sections[1].blocks[0].items[11].quantity = 1
		CP.sections[1].blocks[0].items[12].quantity = 0.8
		CP.sections[1].blocks[0].items[13].quantity = 31
		CP.sections[1].blocks[0].items[14].quantity = 31
	
		CP.sections[1].blocks[1].items[0].quantity = 0
		CP.sections[1].blocks[1].items[1].quantity = 0
		CP.sections[1].blocks[1].items[2].quantity = 11.25
		CP.sections[1].blocks[1].items[3].quantity = 34
		CP.sections[1].blocks[1].items[4].quantity = 1.85
		CP.sections[1].blocks[1].items[5].quantity = 220
		CP.sections[1].blocks[1].items[6].quantity = 220
		CP.sections[1].blocks[1].items[7].quantity = 35
		CP.sections[1].blocks[1].items[8].quantity = 35
		CP.sections[1].blocks[1].items[9].quantity = 0.7
		CP.sections[1].blocks[1].items[10].quantity = 15.5
		CP.sections[1].blocks[1].items[11].quantity = 15.5
	
		CP.sections[1].blocks[2].items[0].quantity = 28
	
		CP.sections[1].blocks[3].items[0].quantity = 60
		CP.sections[1].blocks[3].items[1].quantity = 0.08
		CP.sections[1].blocks[3].items[2].quantity = 60
		CP.sections[1].blocks[3].items[3].quantity = 69
		CP.sections[1].blocks[3].items[4].quantity = 120
		CP.sections[1].blocks[3].items[5].quantity = 0.53
	  }

	function round(num) {
		return Math.round(num * 100) / 100;
	}

	function createPonuka() {
		let r = preds[0].items[0];
		let ryhy = [r.items[0].value, r.items[1].value, r.items[2].value];

		let d = preds[0].items[1];
		let dt = [d.items[0].value, d.items[1].value, d.items[2].value];

		let rozmery = preds[0].items[2];
		let obvod = rozmery.items[0].value;
		let plocha = rozmery.items[1].value;

		create_zakladova_doska(plocha, obvod, ryhy, dt);
		setloading(true);
		const collectionRef = doc(collection(firestore, "/offers"));
		//customBuild variable empty template
		setDoc(collectionRef, {
			id: collectionRef.id,
			data: test,
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
	}

	function handleClick() {
		let name = "z";
		if (zakaldyPdf) name += "z";
		if (podorysyPdf.length) name += "m";
		if (strechaPdf) name += "s";
		var data = {
			title: name,
			pdfs: {
				zaklady: zakaldyPdf,
				podorysy: podorysyPdf,
				strecha: strechaPdf,
			},
		};

		var predikcie = [
			{
				id: "zaklady",
				label: "Základová doska",
				items: [
					{
						id: "ryhy",
						label: "Výkopové pásy",
						items: [
							{
								id: "dlzka",
								label: "Dĺžka",
								value: 30,
								unit: "m",
							},
							{
								id: "sirka",
								label: "Šírka",
								value: 0.6,
								unit: "m",
							},
							{
								id: "hlbka",
								label: "Hĺbka",
								value: 0.8,
								unit: "m",
							},
						],
					},
					{
						id: "dt",
						label: "Debniace tvárnice",
						items: [
							{
								id: "50x20x25",
								label: "20",
								value: 10,
								unit: "ks",
							},
							{
								id: "50x30x25",
								label: "30",
								value: 125,
								unit: "ks",
							},
							{
								id: "50x40x25",
								label: "40",
								value: 100,
								unit: "ks",
							},
						],
					},
					{
						id: "rozmery_stvby",
						label: "Rozmery stavby",
						items: [
							{
								id: "obsah",
								label: "Obsah",
								value: 120,
								unit: "m2",
							},
							{
								id: "obvod",
								label: "Obvod",
								value: 80,
								unit: "m2",
							},
						],
					},
				],
			},
		];

		setPreds(predikcie);
		create_zakladova_doska(120, 80, [80, 0.6, 0.8], [10, 125, 100]);
		create_murivo(50, 120, 96, 112, 485);
		sum_total_prices();
		console.log(JSON.stringify(CP));

		// fetch(`/api/aspdf/`, {
		//     method:'POST',
		//     headers: {'Content-Type': 'application/json'},
		//     body: JSON.stringify(data)
		//     }).then(response => {
		//       if(response.ok){

		//         response.json().then(json => {
		//             if(Object.keys(json[0]).length > 0){
		//                 let r = json[0].items[0]
		//                 let ryhy = [r.items[0].value, r.items[1].value, r.items[2].value]
		//                 let obvod = json[0].items[1].value
		//                 let plocha = json[0].items[2].value
		//                 let d = json[0].items[3]
		//                 let dt = [d.items[0].value, d.items[1].value, d.items[2].value]

		//                 create_zakladova_doska(plocha, obvod, ryhy, dt)
		//                 console.log(CP)
		//             }

		//             if(Object.keys(json[1]).length > 0){
		//                 console.log(json[1])
		//                 // let r = json[0].items[0]
		//                 // let ryhy = [r.items[0].value, r.items[1].value, r.items[2].value]
		//                 // let obvod = json[0].items[1].value
		//                 // let plocha = json[0].items[2].value
		//                 // let d = json[0].items[3]
		//                 // let dt = [d.items[0].value, d.items[1].value, d.items[2].value]

		//                 // create_zakladova_doska(plocha, obvod, ryhy, dt)
		//                 // console.log(CP)
		//             }
		//             console.log(json)

		//         // console.log(json)

		//         // let ok = false
		//         // for (const [key, value] of Object.entries(json)) {if(value){ ok=true; break;}}

		//         // if(ok){
		//         //     let cenova_ponuka = init_cenova_ponuka()

		//         //     for (const [key, value] of Object.entries(json)){
		//         //         if(value){
		//         //             ok=true; break;
		//         //             cenova_ponuka = init_cenova_ponuka()

		//         //         }
		//         //     }
		//         // }

		//       })
		//     }
		// })
	}

	return (
		<section id="features" className="services-area pt-120">
			<FullPageLoading loading={loading}></FullPageLoading>
			<div className="container text-center">
				<div className="justify-center row">
					<div className="w-full lg:w-2/3">
						<div className="pb-10 text-center section-title">
							<div className="m-auto line"></div>
							<h3 className="title">
								Vyberte, čo chcete naceniť.
								<span>
									{" "}
									Informácie, ktoré sa nám z projektov nepodaria vyčítať,
									doplníte vy
								</span>
							</h3>
						</div>
					</div>
				</div>
				<div className="justify-center row">
					<FunctionsDiv
						title={"Základová doska"}
						image={Zaklady.src}
						co={"základovej dosky"}
						project={"pôdorys základov"}
						toSend={setZaklady}
					/>
					<FunctionDiv_p
						title={"Murivo"}
						image={Murivo.src}
						co={"muriva"}
						project={"všetky pôdorysy NP"}
						toSend={setPodorysy}
					/>
					<FunctionsDiv
						title={"Strecha"}
						image={Strecha.src}
						co={"strechy"}
						project={"pôdorys strechy"}
						toSend={setStrecha}
					/>
				</div>

				{(zakaldyPdf || podorysyPdf.length || strechaPdf) && (
					<div className="absolute right-0 hidden mt-2 pt-6 mr-24 navbar-btn sm:inline-block lg:mt-0 lg:static lg:mr-0">
						<button
							className="main-btn font-bold"
							rel="nofollow"
							onClick={handleClick}
						>
							Vytvoriť cenovú ponuku
						</button>
					</div>
				)}

				{!(zakaldyPdf || podorysyPdf.length || strechaPdf) && (
					<div className="absolute right-0 hidden mt-2 pt-6 mr-24 navbar-btn sm:inline-block lg:mt-0 lg:static lg:mr-0">
						<button
							className="main-btn font-bold opacity-50 cursor-auto"
							rel="nofollow"
						>
							Vytvoriť cenovú ponuku
						</button>
					</div>
				)}

				{preds.length > 0 && (
					<>
						<Preds preds={preds} />
						<div className="absolute right-0 hidden mt-2 pt-6 mr-24 navbar-btn sm:inline-block lg:mt-0 lg:static lg:mr-0">
							{/* <Link className="main-btn font-bold" href="/cenova-ponuka" rel="nofollow" onClick={createPonuka}> Potvrdiť údaje </Link> */}
							<button className="main-btn font-bold" onClick={createPonuka}>
								Potvrdiť údaje
							</button>
						</div>
					</>
				)}
			</div>
		</section>
	);
}

export default Functions;
