import React from 'react'
import imagesPng from "../../public/assets/general/images.png";


function ImagesComponent({ images }) {
  return (
    <>
		<div className="mt-20 text-2xl font-medium">
			📷 Fotodokumentácia
		</div>

		<div className="mt-6 inline-block">
			{!images.length ? 
			<div className="h-[250px] w-[400px] rounded-sm outline outline-2 gap-1 outline-gray-200 flex flex-col justify-center items-center">

				<img src={imagesPng.src} alt="images" width={38}/>
				<span className="text-lg opacity-70">Zatiaľ žiadne fotky</span>
				<span className="text-xs w-3/4 opacity-70 text-center">Vaši zamestantci môžu pridávať fotky z aplikácie BuildNet</span>

			</div>
			:
			<>
				Su
			</>

			}
		</div>
		</>
  )
}

export default ImagesComponent
