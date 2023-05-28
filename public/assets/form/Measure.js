import * as React from "react"
const Measure = ({color}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 20 20"
    
  >
    <path
    className="trans"
      d="M0 0v20h20L0 0zm1 2.416L17.584 19H15v-1h-1v1h-1.002v-1H12v1h-1v-1h-1v1H9v-1H8v1H7v-1H6v1H5v-1H4v1H3v-1H2v1H1V2.416zm3 7.242V16h6.344L4 9.658zm1 2.414L7.928 15H5v-2.928z"
      style={{
        fill: `${color}`,
        fillOpacity: 1,
        stroke: "none",
        strokeWidth: 0,
      }}
    />
  </svg>
)
export default Measure
