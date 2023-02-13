import React, { useState, useRef } from 'react'

import x from "../../public/static/x.svg"
import plus from "../../public/static/plus.png"
import minus from "../../public/static/minus.png"


function FunctionDiv_p(props) {
  const [isActive, setActive] = useState(false);
  const [rowCount, setRowCount] = useState(1);
  
  const pRefs = { p1 : useRef(null), p2 : useRef(null), p3 : useRef(null), p4 : useRef(null), p5 : useRef(null), }
    
  const [fileNameP1, setFileNameP1] = useState(null)
  const [fileNameP2, setFileNameP2] = useState(null)
  const [fileNameP3, setFileNameP3] = useState(null)
  const [fileNameP4, setFileNameP4] = useState(null)
  const [fileNameP5, setFileNameP5] = useState(null)


  const handleClick = (i) => {
    if(i === 1 ) pRefs.p1.current.click();
    if(i === 2 ) pRefs.p2.current.click();
    if(i === 3 ) pRefs.p3.current.click();
    if(i === 4 ) pRefs.p4.current.click();
    if(i === 5 ) pRefs.p5.current.click();
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
    let i = event.target.id

    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) return;
    
    if(fileObj.type !== 'application/pdf'){
      alert('Prosím vložte PDF súbor')
      return
    }
    
    fileToBase64(fileObj, async (err, result)  => {
      if (result) {
        if( i === "1" ){ setFileNameP1(fileObj); props.toSend(pdfs => {return [...pdfs, result]}) }
        if( i === "2" ){ setFileNameP2(fileObj); props.toSend(pdfs => {return [...pdfs, result]}) }
        if( i === "3" ){ setFileNameP3(fileObj); props.toSend(pdfs => {return [...pdfs, result]}) }
        if( i === "4" ){ setFileNameP4(fileObj); props.toSend(pdfs => {return [...pdfs, result]}) }
        if( i === "5" ){ setFileNameP5(fileObj); props.toSend(pdfs => {return [...pdfs, result]}) }
       }
    })


    event.target.value = null;
  }

  function deletePDF(event){
    let i = event.target.id
    if( i === "1" ) {setFileNameP1(null) }
    if( i === "2" ) {setFileNameP2(null) }
    if( i === "3" ) {setFileNameP3(null) }
    if( i === "4" ) {setFileNameP4(null) }
    if( i === "5" ) {setFileNameP5(null) }
  }

  function increaseRow(){
    setRowCount(rowCount+1)
  }

  function decreaseRow(){
    if(rowCount === 2) { setFileNameP2(null);  }
    if(rowCount === 3) { setFileNameP3(null);  }
    if(rowCount === 4) { setFileNameP4(null);  }
    if(rowCount === 5) { setFileNameP5(null);  }
    setRowCount(rowCount-1)
  }

  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <div className={"w-full sm:w-2/3 lg:w-1/3  text-center"} > 
        <div className={(isActive ? 'single-services-clicked': 'single-services') + " no_select mt-8 wow fadeIn"} onClick={toggleClass} data-wow-duration="1s" data-wow-delay="0.8s">
            
            <h4 className="mb-8 text-xl font-bold text-gray-900">{props.title}</h4>
            <div className="services-icon">
                <img className="shape" src={props.image} alt="shape"/>
                <i className="lni lni-bolt-alt"></i>
            </div>
            <div className="mt-8 services-content">
                <p className="mb-8 text-lg">Pre nacenenie {props.co} vložte prosím <b> {props.project} </b> </p> 
                <a className="duration-300 hover:text-theme-color" href="http://localhost:3000/">Ako má projekt vyzerať<i className="ml-2 lni lni-chevron-right"></i></a>
            </div>
        </div> 


        { isActive &&    
            <div className="absolute right-0 hidden mt-2 pt-2 mr-24 navbar-btn sm:inline-block lg:mt-0 lg:static lg:mr-0">
                <div className='flex gap-2'>
                    <div className='flex flex-col gap-1'>

                        <input className='hidden' id="1" ref={pRefs.p1} type="file" onChange={handleFileChange} />
                        { !fileNameP1 && <a className="main-btn gradient-btn cursor-pointer font-semibold" onClick={() => handleClick(1)} >Vložiť pôdorys 1. </a> }
                        { fileNameP1  && <div className="px-6 py-3 font-bold text-lg flex justify-center items-center gap-2 h-12"> {fileNameP1.name} <img id="1" src={x.src} onClick={deletePDF} className="w-5 cursor-pointer"/> </div> }

                        <input className='hidden' id="2" ref={pRefs.p2} type="file" onChange={handleFileChange}  />
                        { !fileNameP2 && rowCount > 1 && <a className="main-btn gradient-btn cursor-pointer font-semibold" onClick={() => handleClick(2)} >Vložiť pôdorys 2. </a> }     
                        { fileNameP2  && <div className="px-6 py-3 font-bold text-lg flex justify-center items-center gap-2 h-12"> {fileNameP2.name} <img id="2" src={x.src} onClick={deletePDF} className="w-5 cursor-pointer"/> </div> }
                        
                        <input className='hidden' id="3" ref={pRefs.p3} type="file" onChange={handleFileChange}  />
                        { !fileNameP3 && rowCount > 2 && <a className="main-btn gradient-btn cursor-pointer font-semibold" onClick={() => handleClick(3)} >Vložiť pôdorys 3. </a> }     
                        { fileNameP3  && <div className="px-6 py-3 font-bold text-lg flex justify-center items-center gap-2 h-12"> {fileNameP3.name} <img id="3" src={x.src} onClick={deletePDF} className="w-5 cursor-pointer"/> </div> }
                        
                        <input className='hidden' id="4" ref={pRefs.p4} type="file" onChange={handleFileChange}  />
                        { !fileNameP4 && rowCount > 3 && <a className="main-btn gradient-btn cursor-pointer font-semibold" onClick={() => handleClick(4)} >Vložiť pôdorys 4. </a> }     
                        { fileNameP4  && <div className="px-6 py-3 font-bold text-lg flex justify-center items-center gap-2 h-12"> {fileNameP4.name} <img id="4" src={x.src} onClick={deletePDF} className="w-5 cursor-pointer"/> </div> }
                        
                        <input className='hidden' id="5" ref={pRefs.p5} type="file" onChange={handleFileChange}  />
                        { !fileNameP5 && rowCount > 4 && <a className="main-btn gradient-btn cursor-pointer font-semibold" onClick={() => handleClick(5)} >Vložiť pôdorys 5. </a> }     
                        { fileNameP5  && <div className="px-6 py-3 font-bold text-lg flex justify-center items-center gap-2 h-12"> {fileNameP5.name} <img id="5" src={x.src} onClick={deletePDF} className="w-5 cursor-pointer"/> </div> }
                        
                    </div>

                    <div className='flex flex-col gap-1'>
                        <a className="main-btn gradient-btn cursor-pointer font-semibold" onClick={increaseRow}> <img src={plus.src} className="w-6"/> </a>
                        { rowCount > 1 && <a className="main-btn gradient-btn cursor-pointer font-semibold" onClick={decreaseRow}> <img src={minus.src} className="w-6"/> </a> }
                        { rowCount > 2 && <a className="main-btn gradient-btn cursor-pointer font-semibold" onClick={decreaseRow}> <img src={minus.src} className="w-6"/> </a> }
                        { rowCount > 3 && <a className="main-btn gradient-btn cursor-pointer font-semibold" onClick={decreaseRow}> <img src={minus.src} className="w-6"/> </a> }
                        { rowCount > 4 && <a className="main-btn gradient-btn cursor-pointer font-semibold" onClick={decreaseRow}> <img src={minus.src} className="w-6"/> </a> }
                    </div>
                    
                </div>
            </div>
        }




    </div>

  
  )
}

export default FunctionDiv_p
