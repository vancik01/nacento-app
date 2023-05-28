import * as React from "react"

const EmptyOffer = ({ color }) => {
  if (!color) color = "#FBBB62";

  return(
    <svg
    width={24}
    height={24}
    viewBox="0 0 792 792"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    >
    <path
      d="M792 396c0 218.705-177.295 396-396 396S0 614.705 0 396 177.295 0 396 0s396 177.295 396 396Z"
      fill={color}
    />
    <path
      d="M196 610.006v-428c5.2-56 50.833-69.333 73-69h194.5c.167 9.833.4 39.3 0 78.5s26.5 46.333 40 45H595c-.167 109.167-.4 336.7 0 373.5.4 36.8-33.833 60.333-51 67.5-77.333.5-243.2 1.2-288 0-44.8-1.2-58.667-45.5-60-67.5Z"
      fill="#fff"
    />
    <path
      d="m465 126 117 110"
      stroke="#fff"
      strokeWidth={26}
      strokeLinecap="round"
    />

    </svg>
)}

export default EmptyOffer
