import React, {useState, useRef, useEffect } from 'react'
import { useStepper } from '../../context/StepperContext'
import { useApi } from '../../context/ApiContext';
import x from "../../public/assets/form/x.svg";

function IntroSection({title, text, ix, type}) {
  const { color } = useStepper() 

  var img, file_name, pass

  if (sessionStorage.getItem("IMGS") !== null)
    img = JSON.parse(window.sessionStorage.getItem("IMGS"))[ix]
  else{
    window.sessionStorage.setItem("IMGS", JSON.stringify(["", "", ""]))
    img = ""
  } 

  if (sessionStorage.getItem("FILE_NAMES") !== null)
    file_name = JSON.parse(window.sessionStorage.getItem("FILE_NAMES"))[ix]
  else{
    window.sessionStorage.setItem("FILE_NAMES", JSON.stringify([null, null, null]))
    file_name = null
  }

  if (sessionStorage.getItem("PASSED") !== null)
    pass = JSON.parse(window.sessionStorage.getItem("FILE_NAMES"))[ix]
  else{
    window.sessionStorage.setItem("PASSED", JSON.stringify([false, false, false]))
    pass = false
  }

  const [passed, setPassed] = useState(pass);
  const [fileName, setFileName] = useState(file_name);
  const [showImage, setShowImage] = useState(false)
	const inputRef = useRef(null);
  const [predictionImage, setImage] = useState(img)


  // useEffect(() => {
  //   var imgs = JSON.parse(window.sessionStorage.getItem("IMGS"))
  //   imgs[ix] = predictionImage
  //   window.sessionStorage.setItem("IMGS", JSON.stringify(imgs))
    
  // }, [predictionImage])

  // useEffect(() => {
  //   let file_names = JSON.parse(window.sessionStorage.getItem("FILE_NAMES"))
  //   file_names[ix] = fileName
  //   window.sessionStorage.setItem("FILE_NAMES", JSON.stringify(file_names))

  // }, [fileName])

  // useEffect(() => {
  //   let file_names = JSON.parse(window.sessionStorage.getItem("PASSED"))
  //   file_names[ix] = passed
  //   window.sessionStorage.setItem("PASSED", JSON.stringify(file_names))

  // }, [passed])
  

  const { handleFileChange,
           pdf, setPdf,
           deletePdf,
          PredictParameters  } = useApi()


  const colors={
    "red" : ["hover:border-rose-600 hover:text-rose-600", "bg-rose-600 hover:bg-rose-400", "hover:text-rose-600"],
    "green" : ["hover:border-emerald-600 hover:text-emerald-600", "bg-emerald-600 hover:bg-emerald-400", "hover:text-emerald-600"],
    "blue" : ["hover:border-blue-700 hover:text-blue-700", "bg-blue-700 hover:bg-blue-400", "hover:text-blue-700"]
  }

  const handleClick = () => {
    inputRef.current.click();
  };
  

  return (
    <div className='flex flex-col items-center gap-0 justify-between pt-6'>
        <div className="text-base inline-block pb-4 px-3 text-center relative">
          
        Pre automatické vyplnenie parametrov môžete nahrať výkres <span className='font-semibold'> {text} </span> v PDF formáte:
          {/* <div className="text-sm absolute bottom-7 text-gray-400 text-left">
              (ak nechcete naceniť {title}, políčka nechajte prázdne)
          </div> */}
        </div>

        <input id="file-hidden" className='' type="file" ref={inputRef} onChange={(e) => handleFileChange(e, setFileName, setPdf)}/>
            <div onClick={!passed? handleClick: () => {}} className={"shadow-sm cursor-pointer border border-slate-300 trans font-medium rounded-sm text-gray-500 inline-block px-4 py-2 " + (!passed? colors[color][0] : "")}>
               Nahrať PDF {text}
            </div>

        <div className="pb-1 w-[100%] relative">
        

            {fileName && !passed && <div className='bg-white shadow-lg text-lg absolute bottom-2 px-6 py-4 left-[50%] rounded border' style={{transform: "translateX(-50%)"}}>
              <div> Chcete vložiť súbor <b>{fileName}</b>?</div>

                  <div className='flex justify-center gap-3 pt-3'> 
                    <button onClick={() => {PredictParameters(type, pdf, setImage); setPassed(true)}} className={`border rounded-sm  px-3 py-1 text-white ${colors[color][1]} trans`}>Áno</button>
                    <button onClick={() => {deletePdf(setFileName, setPdf, setPassed)}} className='border rounded-sm  px-3 py-1 bg-gray-300 hover:bg-gray-400 trans'>Nie</button>
                  </div>

                </div>}

              {passed && fileName ? 
              <div className='flex mt-2 items-center justify-center gap-1'>
                <div onClick={() => setShowImage(!showImage)} className={`text-gray-400 ${colors[color][2]} trans cursor-pointer font-medium`}>{fileName}</div>
                <img src={x.src} onClick={() => {deletePdf(setFileName, setPdf, setPassed)}} className="w-4 cursor-pointer"
                    />
              </div>: 
              <div style={{clear: "both"}} className="h-8 w-1"></div>}
      
        </div>
        

        {predictionImage && showImage && <>
              <div onClick={() => setShowImage(false)} className='fixed w-full h-full bg-gray-600 top-0 left-0 opacity-25'></div>
              
              {/* <div className='fixed h-[75%] w-auto border border-b-gray-500'>
                  <div className='w-[1000px] h-[1000px]'>AHOJ</div>
              </div> */}

                <div className='absolute flex justify-center w-[90vw] left-[50%] top-12 z-[50]' style={{transform: "translate(-50%, 0)"}}>
                  <img className='relative' src={`data:image/jpeg;base64,${predictionImage}`} />                
                  <div onClick={() => setShowImage(false)} className='cursor-pointer text-4xl text-gray-400 mt-[-1%] absolute right-[-2%]'>x</div>
                </div>
              </>}
        
  
              <hr className="w-[94%] h-[1px]" />
    </div>
  )
}

export default IntroSection

