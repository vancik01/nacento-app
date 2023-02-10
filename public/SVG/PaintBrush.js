import React from 'react'

export default function PaintBrush({color}) {
  return (
    <svg width="100%" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 2V1C14 0.45 13.55 0 13 0H1C0.45 0 0 0.45 0 1V5C0 5.55 0.45 6 1 6H13C13.55 6 14 5.55 14 5V4H15V8H6C5.45 8 5 8.45 5 9V19C5 19.55 5.45 20 6 20H8C8.55 20 9 19.55 9 19V10H16C16.55 10 17 9.55 17 9V3C17 2.45 16.55 2 16 2H14Z" fill={color}/>
    </svg>

  )
}
