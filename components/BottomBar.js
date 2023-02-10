import React, { useEffect, useState } from 'react'
import { useData } from '../context/AppWrap'
import { numberWithCommas } from '../lib/helpers'
import EditPen from '../public/SVG/EditPen'
import Layout from './Layout'
import PriceChangeIndicator from './PriceChangeIndicator'

export default function BottomBar() {
    const {total,initialTotal, openBulkEdit, bulkEdit, toggleTotals} = useData()
    const [changeDodavka, setchangeDodavka] = useState(total.total_delivery_price - initialTotal.dodavka)
    const [changeMontaz, setchangeMontaz] = useState(0)
    const [changeTotal, setchangeTotal] = useState(0)
    

    function scrollToTop(){
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    useEffect(() => {
        setchangeDodavka((total.total_delivery_price - initialTotal.total_delivery_price).toFixed(2))
        setchangeMontaz((total.total_construction_price - initialTotal.total_construction_price).toFixed(2))
        setchangeTotal((total.total - initialTotal.total).toFixed(2))      
    }, [total])
    

  return (
    
    <div className="bottom-bar bg-white h-16 z-30 p-6">
        <Layout className="flex flex-row h-full relative">
            <div className='flex flex-row justify-start items-center w-full gap-10'>

                <div className='relative w-fit'>
                    <PriceChangeIndicator val={changeMontaz} />
                    <div>Cena Montáže: {numberWithCommas(total.total_construction_price.toFixed(2))} €</div>
                    {!bulkEdit&&<button 
                        onClick={()=>{ openBulkEdit(
                            {blockId:-1, value: total.total_construction_price, valueId:"total_construction_price", mode:"whole"})}}
                        className='absolute top-0 -right-3 w-2'>
                        <EditPen></EditPen>
                    </button>}
                </div>

                <div className='relative w-fit'>
                    <PriceChangeIndicator val={changeDodavka} />
                    <div>Cena Dodávky: {numberWithCommas(total.total_delivery_price.toFixed(2))} €</div>
                    {!bulkEdit&&<button 
                        onClick={()=>{ openBulkEdit(
                            {blockId:-1, value: total.total_delivery_price, valueId:"total_delivery_price", mode:"whole"})}}
                        className='absolute top-0 -right-3 w-2'>
                        <EditPen></EditPen>
                    </button>}
                    
                </div>            
                
                <div className='relative w-fit'>
                    <PriceChangeIndicator val={changeTotal} />
                    <div>Spolu: {numberWithCommas(total.total.toFixed(2))} € <span className='text-[10px]'>bez DPH</span></div>
                    {!bulkEdit&&<button 
                        onClick={()=>{ openBulkEdit(
                            {blockId:-1, value: total.total, valueId:"total", mode:"whole"})}}
                        className='absolute top-0 -right-3 w-2'>
                        <EditPen></EditPen>
                    </button>}
                </div>
                
                
            </div>

            
        </Layout>
    </div>
  )
}

