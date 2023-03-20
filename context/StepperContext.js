import { createContext, useContext, useState, useEffect } from "react";

const StepperContext = createContext();

export function UseStepperContext({ children }) {
  const [color, setColor] = useState("red");

  let empty = []; for(let i=0; i<15; i++) empty.push("")
  const [hsdata, sethsdata] = useState(empty);

  const ChangeHsValue = (e) => {
		let newData = [...hsdata]

    newData[parseInt(e.target.id)] = e.target.value
    
		sethsdata(newData);
  }

  // useEffect(() => {
  //   console.log("AAA", color)
  // }, [color])
  


  const value = {
    color,
    setColor,

    hsdata,
    sethsdata,

    ChangeHsValue
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
