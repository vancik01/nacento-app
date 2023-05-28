import * as React from "react"

const Elektro = ({color, scale}) => {
  if(!scale) scale = 1
return(
  <svg
    width={22*scale}
    height={22*scale}
    viewBox="8 8 56 56"
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth={3}
    stroke="#000"
    fill="none"
  >
    <path fill={color}
    d="M41.71 10.58H28l-7.4 22.28a.1.1 0 0 0 .09.13h8.49a.1.1 0 0 1 .1.13l-6.57 19.64a.5.5 0 0 0 .88.45L43.41 26a.1.1 0 0 0-.08-.16h-8.91a.11.11 0 0 1-.09-.15l7.47-15a.1.1 0 0 0-.09-.11Z" />
  </svg>
)}

export default Elektro
