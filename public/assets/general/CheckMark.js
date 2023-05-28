import * as React from "react"
const CheckMark = ({color, scale}) => {
  
  let Scale = 1
  if(scale) Scale = scale

  return(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={Scale * 14}
    viewBox="0 0 32 32"
  >
    <path fill={color} d="m28.998 8.531-2.134-2.134a1.006 1.006 0 0 0-1.423 0L12.646 19.192l-6.086-6.13a1.006 1.006 0 0 0-1.423 0l-2.134 2.134a1.006 1.006 0 0 0 0 1.423l8.924 8.984c.393.393 1.03.393 1.423 0L28.998 9.954a1.006 1.006 0 0 0 0-1.423z" />
  </svg>
)}
export default CheckMark
