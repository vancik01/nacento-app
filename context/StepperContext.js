import { width } from "@mui/system";
import { createContext, useContext, useState, useEffect } from "react";

const StepperContext = createContext();

const HSDATA = {
  "doska" : {
    "objem" : "",
    "rady" : ["0"],
    "plocha" : "",
    "obvod" : "",
    "dt20" : "",
    "dt30" : "",
    "dt40" : "",
  },

  "murivo" : {
    "material" : ["0"],
    "poschodia" : ["0"],
    "t10": "",
    "t15": "",
    "t25": "",
    "t30": "",
    "t45": "",
  },

  "strecha" : {
    "plocha" : "",
  }
}

const EDATA = {
  "pripojka" : {
      "poloha" : ["0"],
      "vedenie" : ["0"],
      "hds-re" : "",
      "k-hds-re" : ["0", ""],
      "re-rd" : "",
      "k-re-rd" : ["0"],
      "eskrinka" : ["0"],
      "tarif" : ["0"],
      "istic" : ["0"],
  },

  "instalacie" : {
    "plocha" : "",
    "miestnosti" : "",
    "dialkavyvod" : "",
    "zasuvka" : ["0"],
  },

  "pripravy" : {
      "kamery" : ["0", ""],
      "koaxial" : ["0", ""],
      "fotovoltika" : ["0"],
      "brana" : ["0", ""],
      "budova" : ["0", ""],
      "ekvimetrika" : ["0"],
      "osvetlenie" : ["0", ""],
      "datovky" : ["0", ""],
      "zaluzie" : ["0", ""],
      "ozvucenie" : ["0", ""],
      "tc" : ["0", "", ""],
      "klimatizacia" : ["0"],
  },
  "bleskozvod" : {
    "strecha" : ["0"],
    "zvody" : "",
    "vedenie" : ["0"],
    "uzemnenie" : ["0"],
    "tyce" : ""

  },
  "admin" : {
    "pripojka" : ["0"],
    "elektroinstalacia" : ["0"],
    "bleskozvod" : ["0"],
    "projekty" : ["0"],
    "schema" : ["0"],
    "skutok" : ["0"],

  }
}


export function UseStepperContext({ children }) {
  const [color, setColor] = useState("red");

  var hrubedata 
  var elektrodata

  if (sessionStorage.getItem("HRUBE_DATA") !== null)
    hrubedata = JSON.parse(window.sessionStorage.getItem("HRUBE_DATA"))
  
  else hrubedata = HSDATA


  if (sessionStorage.getItem("ELEKTRO_DATA") !== null)
    elektrodata = JSON.parse(window.sessionStorage.getItem("ELEKTRO_DATA"))
  
  elektrodata = EDATA


  const [edata, setedata] = useState(elektrodata);
  const [hsdata, sethsdata] = useState(hrubedata);

  useEffect(() => {
    window.sessionStorage.setItem("ELEKTRO_DATA", JSON.stringify(edata))
  }, [edata])

  useEffect(() => {
    window.sessionStorage.setItem("HRUBE_DATA", JSON.stringify(hsdata))
  }, [hsdata])
  

  const ChangeValue = (e, path) => {
    var data = {}
    if(path[0] == "e") data = edata
    if(path[0] == "h") data = hsdata

		let newData = {...data}

    if(path.length == 4) newData[path[1]][path[2]][path[3]] = e.target.value
    else newData[path[1]][path[2]] = e.target.value
    
    if(path[0] == "e") setedata(newData);
    if(path[0] == "h") sethsdata(newData);
  }


  
  const value = {
    color,
    setColor,

    hsdata, sethsdata,
    edata, setedata,

    ChangeValue,
  }

  return (
      <StepperContext.Provider value={value}>
        {children}
      </StepperContext.Provider>
  )
}

export function useStepper() {
  return useContext(StepperContext);
}
