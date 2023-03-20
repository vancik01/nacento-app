import React, {useState, useRef, useEffect } from 'react'
import { useStepper } from '../../context/StepperContext'
import { useApi } from '../../context/ApiContext';
import x from "../../public/static/x.svg";


function IntroSection({title, text, type}) {
  const { color } = useStepper() 

  const [passed, setPassed] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [predictionImage, setImage] = useState("")
  const [showImage, setShowImage] = useState(false)
	const inputRef = useRef(null);

  // useEffect(() => {
  //   console.log(showImage)
  // }, [showImage])
  

  const { handleFileChange,
           pdf, setPdf,
           deletePdf,
          PredictParameters  } = useApi()


  const colors={
    "red" : ["hover:border-rose-600 hover:text-rose-600", "bg-rose-600 hover:bg-rose-400", "hover:text-rose-600"],
    "green" : ["hover:border-emerald-600 hover:text-emerald-600", "bg-emerald-600 hover:bg-emerald-400", "hover:text-emerald-600"]
  }

  const handleClick = () => {
    inputRef.current.click();
  };
  

  return (
    <div className='flex flex-col items-center gap-0 justify-between'>
        <div className="text-lg inline-block pb-12 relative">
          Vypíšte prosím údaje manuálne alebo vložte <u>PDF {text}</u> a údaje sa vypočítajú automaticky
          <div className="text-sm absolute bottom-7 text-gray-400 text-left">
              (ak nechcete naceniť {title}, políčka nechajte prázdne)
          </div>
        </div>

        <input className='' type="file" ref={inputRef} onChange={(e) => handleFileChange(e, setFileName, setPdf)}/>
            <div onClick={!passed? handleClick: () => {}} className={"shadow-sm cursor-pointer border border-slate-300 trans font-medium rounded-sm text-gray-500 inline-block px-6 py-3 " + (!passed? colors[color][0] : "")}>
               Vložiť PDF {text}
            </div>

        <div className="pb-4 w-[200%] relative">
        

            {fileName && !passed && <div className='bg-white shadow-lg text-lg absolute bottom-2 px-6 py-4 left-[50%] rounded border' style={{transform: "translateX(-50%)"}}>
              <div> Chcete vložiť súbor <b>{fileName}</b>?</div>

                  <div className='flex justify-center gap-3 pt-3'> 
                    <button onClick={() => {PredictParameters(type, pdf, setImage); setPassed(true)}} className={`border rounded-sm  px-3 py-1 text-white ${colors[color][1]} trans`}>Áno</button>
                    <button onClick={() => {deletePdf(setFileName, setPdf, setPassed)}} className='border rounded-sm  px-3 py-1 bg-gray-300 hover:bg-gray-400 trans'>Nie</button>
                  </div>

                </div> 
              }
              {passed && fileName ? 
              <div className='flex mt-2 items-center justify-center gap-1'>
                <div onClick={() => setShowImage(!showImage)} className={`text-gray-400 ${colors[color][2]} trans cursor-pointer font-medium`}>{fileName}</div>
                <img src={x.src} onClick={() => {deletePdf(setFileName, setPdf, setPassed)}} className="w-4 cursor-pointer"
                    />
              </div>: 
              <div style={{clear: "both"}} className="h-8 w[1]"></div>
              
              }

              {predictionImage && showImage && 
              <>
              <div onClick={() => setShowImage(false)} className='fixed w-full h-full bg-gray-600 top-0 left-0 opacity-25'></div>
              
              <div className='fixed flex w-[70%] z-[50] top-[4%] left-[15%] translate-y-1/6 translate-x-1/6'>
                <img className='relative' src={`data:image/jpeg;base64,${predictionImage}`} />                
                <div onClick={() => setShowImage(false)} className='cursor-pointer text-4xl text-gray-400 mt-[-1%] absolute right-[-2%]'>x</div>
              </div>
              </>
              
              }

              
        </div>

        

        <hr className="w-[94%] bg-slate-800 h-[1px]" ></hr>
    </div>
  )
}

export default IntroSection

