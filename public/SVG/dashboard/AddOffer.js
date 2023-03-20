import * as React from "react"

const AddOffer = ({color}) => {
  if (!color) color = "#1400FF";

  return (
    <svg
    width={30}
    height={30}
    viewBox="0 0 434 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.073 99.185c0-69.6 51.334-83 77-81h188l132.5 123.5v365c0 54-39.333 72.833-59 75.5-65.333-.167-210.599-.4-269 0-58.4.4-70.666-46.5-69.5-70v-413Z"
      fill="#fff"
      stroke={color}
      strokeWidth={35}
      strokeLinecap="round"
    />
    <path
      d="M271.5 18.5v95c.167 12.5 8.4 37.7 40 38.5 31.6.8 82.5.333 104 0"
      stroke={color}
      strokeWidth={35}
      strokeLinecap="round"
    />
     <path
      d="M108 343.5h217M216.5 235v217"
      stroke={color}
      strokeWidth={43}
      strokeLinecap="round"
    />
  </svg>
)}
export default AddOffer
