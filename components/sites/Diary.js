import React from 'react'
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DatePicker } from "@mui/x-date-pickers-pro";
import moment from 'moment';
import { TextareaAutosize } from '@mui/material';
import { styled } from '@mui/system';
import CheckMark from '../../public/assets/general/CheckMark';
import ArrowBack from '../../public/assets/buttons/ArrowBack';
import ButtonSecondary from '../buttons/ButtonSecondary';
import DiaryRecord from './DiaryRecord';
import ShorterParagraph from '../../public/assets/sites/ShorterParagraph';
import LongerParagraph from '../../public/assets/sites/LongerParagraph';


function Diary({ site }){
	const [date, setDate] = useState(moment());
	const [description, setDescription] = useState('');
	const [selected, setSelected] = useState(0);
	const [message, setMessage] = useState("");
	const [showEdit, setShowEdit] = useState(false);
	const { updateDocument } = useAuth();
	const [ currSite, setCurrSite ] = useState(site);
	

	var messageLength = 100
	
	const [record, setRecord] = useState({
		date: "",
		weather: "",
		description: "",
		employees: [],
		investors: [],
	});

	const luck_items = [
		"Podľa plánu",
		"Nad očakávania",
		"S problémami",
	]

	async function askAI(){
		setShowEdit(false)

		let messages = [
			{role: "system", content: `Napíš záznam do stavebného denníka, dátum nespomínaj. Parafrázuj nasledujúci text do ${messageLength} slov`},
			{role: "user", content: `${description}. ${luck_items[selected]}`},
		]

		try {

			// const response = await fetch("http://127.0.0.1:8000/api/chat/", {
			const response = await fetch("https://api.nacento.online/api/chat/", {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json'
				},
				body: JSON.stringify(messages)
			});
			
			if (!response.body) {
				throw new Error("ReadableStream not yet supported in this browser.");
			}
			
			const reader = response.body.getReader();
			let chunks = '';
			
			while (true) {
				const { done, value } = await reader.read();
			
				if (done) {
				setTimeout(function() {
					setShowEdit(true);
				}, 1000);
				break;
				}
			
				chunks += new TextDecoder("utf-8").decode(value);
				setMessage(chunks);
			}
  
		} catch (err) {
		console.error(err);
		}
	}


	const handleClick = async (e) => {
		e.preventDefault();

		if(!description){
			return
		}

		let newRecord = {... record}
		newRecord.date = moment(date).locale('sk').format('DD MMM YYYY')
		newRecord.weather = "miestami slnečno, teplota 20°C"
		setRecord(newRecord)

		askAI()
	}

	async function edit_message(code){

		if(code === "k"){
			messageLength = 50
		}	
		
		else if(code === "d"){
			messageLength = 150	
		}
		
		askAI()
	}


	function saveRecord(){
		setShowEdit(false)

		let newRecord = {... record}
		newRecord.description = message
		setRecord(newRecord)

		let newSite = {... currSite}
		newSite.diary.push(newRecord)

		setCurrSite(newSite)
		updateDocument("sites", site.id, newSite)
		
		newRecord = {... record}
		newRecord.date =''
		newRecord.weather =''
		newRecord.description =''
		setRecord(newRecord)
		
		

		setMessage("")
	}


	return(
		<div className="pb-[800px]">


		<div className="mt-20 text-2xl font-medium">
			📋 Stavebný denník
		</div>

		<div className="text-lg mt-6">
			{currSite.diary.map((record, ix) => <div key={`siteItem${ix}`}><DiaryRecord record={record} ix={ix}/></div>)}
		</div>

		<form onSubmit={handleClick}>
		<div className="text-lg mt-6">

			{record.date && <div>
				<span className="opacity-50">Dátum: </span>
				{record.date}
			</div>}

			{record.weather && <div>
				<span className="opacity-50">Počasie: </span>
				{record.weather}
			</div>}


			<div className="mt-5">

				{message && !showEdit && <div className="" style={{ whiteSpace: 'pre-line' }}> {message} </div>}

				{showEdit && <div className="">

					<TextareaAutosize className="w-full" style={{outline: 'none'}} spellCheck={false}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>

					<div className="flex gap-4 mt-5">


						<ButtonSecondary
							iconBefore
							onClick={saveRecord}
							icon={<div className="opacity-50"><CheckMark/></div>}>
							Prijať záznam		
						</ButtonSecondary>

						<ButtonSecondary
							iconBefore
							onClick={() => edit_message("k")}
							icon={<div className="opacity-50"><ShorterParagraph/></div>}>
							Skrátiť		
						</ButtonSecondary>

						<ButtonSecondary
							iconBefore
							onClick={() => edit_message("d")}
							icon={<div className="opacity-50"><LongerParagraph/></div>}>
							Predĺžiť		
						</ButtonSecondary>

					</div>

				</div>}
			
			</div>
			
			<div className="w-[160px] mt-10">

				<DatePicker 
					label="Zvoľte dátum"
					value={date}
					className="mt-4"
					onChange={(newValue) => setDate(newValue)}
					slotProps={{ textField: { variant: 'standard', required: true, sx: { 
						'& label': { 
							fontSize: 16,
						},
						'& input': { 
						fontSize: 16,
						},
					} 
					} }}
				/>
			</div>

			<CustomTextarea
				placeholder="V skratke opíšte čo ste robili 🖋️"
				rows={1}
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				className="mt-5 w-[400px]"
				style={{
					fontSize: 16,
					outline: 'none',
					borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
				}}
				spellCheck={false}
				required
			/>


			<div className="mt-5 text-base">
				<span className="opacity-60">Ako to šlo? </span>

				{luck_items.map((item, ix) =>
					<TypeWrapper active={selected===ix} set={() => setSelected(ix)} key={`luck${ix}`}>
						<span> {item} </span>
				</TypeWrapper>
				)}

			</div>


			<ButtonSecondary
				iconBefore
				type={"submit"}
				onClick={handleClick}
				className={"mt-7"}
				icon={<div style={{transform: "scaleX(-1)"}}><ArrowBack color={"black"}></ArrowBack></div>}>
				Vytvoriť záznam			
             </ButtonSecondary>


		</div>
		</form>


		</div>
	)
}


const CustomTextarea = styled(TextareaAutosize)`
  ::placeholder {
    color: #6b6b6b; // Set the desired placeholder color
  }
`;


function TypeWrapper({active, set, ix, children}){
	let c = "text-gray-500 outline-gray-500"
	if(active) c = ""

	return(
		<div onClick={set} className={"rounded mx-1 inline-block px-2 outline outline-1 cursor-pointer " + c}>
			{children}
		</div>
	)
}


export default Diary
