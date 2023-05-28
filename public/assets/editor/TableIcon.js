import React from 'react'

export default function TableIcon({color}) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0H2C0.9 0 0 0.9 0 2ZM8 16H3C2.45 16 2 15.55 2 15V10H7C7.55 10 8 10.45 8 11V16ZM7 8H2V3C2 2.45 2.45 2 3 2H8V7C8 7.55 7.55 8 7 8ZM15 16H10V11C10 10.45 10.45 10 11 10H16V15C16 15.55 15.55 16 15 16ZM16 8H11C10.45 8 10 7.55 10 7V2H15C15.55 2 16 2.45 16 3V8Z" fill={color}/>
    </svg>
  )
}
