import { useRouter } from "next/router";
import React, { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../../lib/firebase";

import moment from 'moment/moment';

import ButtonSecondary from "../buttons/ButtonSecondary";

import PopUp from "../general/PopUp";
import { TextField } from "@mui/material";
import MapComponent from "./MapComponent";

import { DateRangePicker } from "@mui/x-date-pickers-pro";

import DashboardAdd from "../buttons/DashboardAdd";
import { toast } from "react-toastify";
import PopupLoading from "../loading/PopupLoading";


export default function SitesToolbar() {
	const [openPopup, setopenPopup] = useState(false);

	return (
		<>
			<div className='flex flex-col w-fit sm:flex-row gap-2 sm:gap-8 overflow-y-auto'>

				<DashboardAdd
					text='Nová stavba'
					subtext='Vytvorte novú stavbu'
					color='#73A496'
					onClick={() => setopenPopup(true)}
				/>

			</div>

			<AddSite openPopup={openPopup} setopenPopup={setopenPopup} />
		</>
	);
}

function AddSite({ openPopup, setopenPopup }) {
	const { user, load_collection_data, setSites, uploadImage, uploadSiteCaption } = useAuth();
	const [description, setDescription] = useState("");
	const [location, setLocation] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [dates, setDates] = useState([null, null]);
	const [center, setCenter] = useState({ lat: 48.669026, lng: 19.699024 })

	const emojis = ["🔨", "🏗️", "🚧", "🏢", "🛠️"]
	const randomIndex = Math.floor(Math.random() * emojis.length);
	const emoji = emojis[randomIndex];


	function delay(seconds) {
		return new Promise(resolve => setTimeout(resolve, seconds * 1000));
	}

	async function disableWatermark() {
		await delay(0.05);
		const divElements = document.querySelectorAll('div');
		divElements.forEach((div) => {
			const computedStyle = window.getComputedStyle(div);
			if (computedStyle.getPropertyValue('z-index') === '100000')
				div.style.display = 'none';
		})
	}


	async function fetchMapImage(newSite) {
		const apiKey = 'AIzaSyD06BvNjUFJ94-GC8ItmyBXaBJhxJyMR7Q';
		const centerLocation = `${center.lat} ${center.lng}`; // The coordinates of the location you want (e.g., Empire State Building)
		const zoomLevel = '14'; // The zoom level you want for the image
		const size = '800x500'; // The size of the image you want
		const markerLocation = centerLocation; // The coordinates of the location you want the marker on
		
		// with marker
		// const response = await fetch(`https://maps.googleapis.com/maps/api/staticmap?center=${centerLocation}&zoom=${zoomLevel}&size=${size}&markers=${markerLocation}&key=${apiKey}`);

		// whitout marker
		const response = await fetch(`https://maps.googleapis.com/maps/api/staticmap?center=${centerLocation}&zoom=${zoomLevel}&size=${size}&key=${apiKey}`);

		if (!response.ok) throw new Error('Network response was not ok.');
		
		const blob = await response.blob();
		const file = new File([blob], `map_image.png`, { type: 'image/png' });

		// let url = await uploadImage(file, "maps")
		let url = await uploadSiteCaption(file, newSite)
		return url
	}


	async function createSite(event) {
		event.preventDefault();

		let newDates = { ...dates } 
		if (newDates[0]) newDates[0] = newDates[0].valueOf()
		if (newDates[1]) newDates[1] = newDates[1].valueOf()

		setLoading(true);

		const collectionRef = doc(collection(firestore, "/sites"));
		let newSite = {
			id: collectionRef.id,
			diary: [],
			location: location,
			permissions: [],
			dates: newDates,
			name: description,
			images: [],
			icon: emoji,
			captionImage: '',
			created: moment().valueOf(),
			userId: user != null ? user.uid : "none",
			lastModified: moment().valueOf(),
		}

		newSite.captionImage = await fetchMapImage(newSite);

		setDoc(collectionRef, newSite)
		.then((response) => {
			// router.push(`/stavba/${collectionRef.id}`);
			toast("Stavba pridaná", { type: "success" })
			setopenPopup(false);
			setLoading(false);
			load_collection_data("sites", setSites);
		})
		.catch((err) => {
			console.log(err);
			setLoading(false);
		});
	}


	return (
		<PopUp title={"Pridať stavbu"} open={openPopup} setOpen={setopenPopup}>

			<PopupLoading loading={loading}></PopupLoading>
			<form onSubmit={createSite} className='ml-1'>
				<div className='flex flex-col gap-3 my-5'>

					<TextField
						label='🖊️ Názov stavby'
						type='text'
						value={description}
						onChange={e => setDescription(e.target.value)}
						required
					/>

					<MapComponent value={location} setValue={setLocation} center={center} setCenter={setCenter} />

						<DateRangePicker onOpen={disableWatermark}
							localeText={{ start: '🏗️ Predpokladadný začiatok výstavby', end: '🏁 Predpokladadný koniec výstavby' }}
							value={dates}
							onChange={(newDates) => setDates(newDates)} />

				</div>

				<button>
					<ButtonSecondary type={"submit"}>
						Pridať stavbu
					</ButtonSecondary>
				</button>

			</form>

		</PopUp>
	)
}
