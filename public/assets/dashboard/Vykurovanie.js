import * as React from "react"

const Vykurovanie = ({color}) => (
    <svg
    width={22}
    height={22}
    fill="none"
    viewBox="0 0 316 400"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M128.638 0C128.638 185.742-2.81 154.311.046 280.045 1.658 350.997 61.35 391.634 128.37 399.559c.036.003.061-.032.037-.061-16.193-18.743-86.765-111.09 23.089-185.176 3.532 71.5 62.868 82.87 62.868 134.308 0 21.661-4.563 36.206-9.846 45.812 55.341-14.467 102.243-53.039 109.861-117.253C334.385 108.589 128.638 0 128.638 0Z"
      fill={color}
    />
  </svg>
)

export default Vykurovanie
