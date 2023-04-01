import React from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

export default function GeneratePDF() {
	return (
		<motion.div
			key='generate-pdf'
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
			className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 z-[300] flex justify-center items-center'
		>
			<div className=' bg-white rounded-md py-6 px-8 flex flex-col justify-center items-center'>
				<div className='mb-10'>
					<div className='h-[200px] min-w-[400px] bg-gray-100 rounded-md mb-4'></div>
					<h1 className='text-center text-primary'>Vyskúšajte to online!</h1>
					<p className='text-center'>Zdielajte vašu ponuku online...</p>
				</div>

				<div className='h-full w-full flex justify-center items-center gap-3'>
					<h3 className='font-light'>Vaša ponuka sa generuje</h3>
					<svg
						height={10}
						width={10}
						className='spinner  !h-4'
						viewBox='0 0 50 50'
					>
						<circle
							className='path'
							cx='25'
							cy='25'
							r='20'
							fill='none'
							strokeWidth='3'
						></circle>
					</svg>
				</div>
			</div>
		</motion.div>
	);
}
