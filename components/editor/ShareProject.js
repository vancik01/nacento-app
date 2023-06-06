import React, { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import Copy from "./Copy";
import { useActions } from "../../context/ActionsContext";
import ButtonPrimary from "../buttons/ButtonPrimary";
import ButtonSecondary from "../buttons/ButtonSecondary";
import { useData } from "../../context/AppWrap";


export default function ShareProject({ close }) {
	const { closeShare, generateLink } = useActions();
	const { awaitHandleSave } = useData();

	async function handleGenerate() {
		awaitHandleSave().then(async () => {
			const l = await generateLink();
			console.log(l);
			setlink(l);
		});
	}

	function copy() {
		navigator.clipboard.writeText(link);
	}

	const [link, setlink] = useState("");


	return (
		<motion.div
			key='generate-pdf'
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
			className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 z-[300] flex justify-center items-center'
		>
			<div className=' min-w-[500px] min-h-[200px] bg-white rounded-md py-6 px-8 flex flex-col justify-center relative items-center'>
				
				<ButtonSecondary className={"absolute top-2 right-2"} onClick={close}>
						Zrušiť
				</ButtonSecondary>
				
				<div className='mb-8'>
					<h1 className='text-center text-primary'>Zdielať projekt</h1>
					<p className='text-center'>Zdielajte Vašu ponuku online!</p>
				</div>
				{!link && (
					<div>
						<ButtonPrimary onClick={handleGenerate}>
							Generovať odkaz
						</ButtonPrimary>
					</div>
				)}
				{link != "" && (
					<div className=''>
						<div className='text-base  text-center mb-2'>Váš odkaz:</div>
						<div className='flex justify-center text-sm rounded-md shadow-hardShadow'>
							<div className='p-2 max-w-[280px] text-ellipsis overflow-hidden text-xs'>
								{link}
							</div>
							<button
								onClick={copy}
								className='py-2 px-3 border-l-[1px] border-l-gray-300'
							>
								<Copy />
							</button>
						</div>

						<div className='flex justify-center items-center'>
							<a
								target='_blank'
								className='text-xs text-center py-2 mx-auto w-full text-blue-500'
								href={link} rel="noreferrer"
							>
								Zobraziť na webe
							</a>
						</div>

						<div className='text-xs text-gray-400 text-center mt-3'>
							Odkaz platný len do...
						</div>
					</div>
				)}
			</div>
		</motion.div>
	);
}
