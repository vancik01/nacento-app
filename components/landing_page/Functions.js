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
	const [preds, setPreds] = useState({"data":[], "images":[]});
	const [zakaldyPdf, setZaklady] = useState("");
	const [podorysyPdf, setPodorysy] = useState([]);
	const [strechaPdf, setStrecha] = useState("");
	const [loading, setloading] = useState(false);
	const { user } = useAuth();

	const router = useRouter();

	function redirect_to_ponuka() {
		fetch(`http://165.227.150.191/api/make_from_preds/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(preds.data),
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

		setloading(true);
		fetch(`http://165.227.150.191/api/aspdf/`, {
		// fetch(`http://127.0.0.1:8000/api/aspdf/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		}).then((response) => {
			setloading(false);
			if (response.ok) {
				response.json().then((json) => {
					console.log(json)
					setPreds(json);
				});
			}
		});
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
							onClick={make_predicions}
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

				{preds.data.length > 0 && (
					<>
						<Preds data={preds.data} images={preds.images}/>
						<div className="absolute right-0 hidden mt-2 pt-6 mr-24 navbar-btn sm:inline-block lg:mt-0 lg:static lg:mr-0">
							{/* <Link className="main-btn font-bold" href="/cenova-ponuka" rel="nofollow" onClick={createPonuka}> Potvrdiť údaje </Link> */}
							<button
								className="main-btn font-bold"
								onClick={redirect_to_ponuka}
							>
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
