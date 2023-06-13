import React from 'react'
import AddOffer from '../../public/assets/dashboard/AddOffer'
import Plus from '../../public/assets/dashboard/Plus'

function DashboardAdd({ text, subtext, color, onClick }) {
  return (
    <button
        onClick={onClick}
        className='w-full py-3 px-3 cursor-default border rounded-md flex items-center justify-between sm:justify-center gap-2 text-start trans hover:bg-gray-100 transition-all'>
        
        <AddOffer color={color}></AddOffer>

        <div>
            <div className='text-xs md:text-sm font-regular'>{text}</div>
            <div className='text-xs font-light text-gray-400'>{subtext}</div>
        </div>

        <div className='ml-8'>
            <Plus></Plus>
        </div>
        
    </button>
  )
}

export default DashboardAdd
