import React, { useState, useRef } from 'react'
import x from "../../public/static/x.svg"


function FunctionDiv(props) {
  const [isActive, setActive] = useState(false);
  const [fileName, setFileName] = useState(null)
  
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
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
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) return;
    
    if(fileObj.type !== 'application/pdf'){
      alert('Prosím vložte PDF súbor')
      return
    }
    
    fileToBase64(fileObj, async (err, result)  => {
      if (result) {
        setFileName(fileObj)
        props.toSend(result)
      }
    })

    event.target.value = null;
  }

  function deletePDF(){
    setFileName(null)
    props.toSend('')
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

        <input className='hidden' ref={inputRef} type="file" onChange={handleFileChange} />

        { !fileName && isActive && <div className="absolute right-0 hidden mt-2 pt-2 mr-24 navbar-btn sm:inline-block lg:mt-0 lg:static lg:mr-0">
            <a className="main-btn gradient-btn cursor-pointer font-semibold" onClick={handleClick} rel="nofollow">Vložiť {props.project} </a>
          </div>
        }

        { fileName && isActive && <div className="filename pt-2 font-bold text-lg flex justify-center gap-2">
            {fileName.name} <img src={x.src} onClick={deletePDF} className="w-5 cursor-pointer"/>
          </div>
        }

        { !isActive && <div className='h-16'></div> }


    </div>
  )
}

export default FunctionDiv
