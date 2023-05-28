import * as React from "react"

const OfferIcon = ({color}) => (
  <svg
    width={18}
    viewBox="0 0 804 804"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      background: "#191711;",
      opacity: "0.6;"
    }}
  >
    <path
      d="M238 767V362M238 118V36"
      stroke={color? {color} : "#000"}
      strokeWidth={65}
      strokeLinecap="round"
    />
    <circle cx={237.5} cy={233.5} r={96} stroke="#000" strokeWidth={65} />
    <path
      d="M566 36v405M566 685v82"
      stroke={color? {color} : "#000"}
      strokeWidth={65}
      strokeLinecap="round"
    />
    <circle
      cx={566.5}
      cy={569.5}
      r={96}
      transform="rotate(-180 566.5 569.5)"
      stroke={color? {color} : "#000"}
      strokeWidth={65}
    />
  </svg>
)

export default OfferIcon
