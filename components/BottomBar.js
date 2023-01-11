import React, { useEffect, useState } from 'react'
import { useData } from '../context/AppWrap'
import Layout from './Layout'

export default function BottomBar() {
    const {total,initialTotal} = useData()
    const [changeDodavka, setchangeDodavka] = useState(total.dodavka - initialTotal.dodavka)
    const [changeMontaz, setchangeMontaz] = useState(0)
    const [changeTotal, setchangeTotal] = useState(0)

    function scrollToTop(){
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    useEffect(() => {
        setchangeDodavka((total.dodavka - initialTotal.dodavka).toFixed(2))
        setchangeMontaz((total.montaz - initialTotal.montaz).toFixed(2))
        setchangeTotal((total.total - initialTotal.total).toFixed(2))      
    }, [total])
    

  return (
    
    <div className="bottom-bar bg-white h-24  z-50 p-6">
        <Layout className="flex flex-row h-full">
            <div className='flex flex-row justify-start  w-full gap-10'>
                <div>
                    <div>Cena Montáže: {total.dodavka.toFixed(2)} €</div>
                    <Change val={changeDodavka} />
                </div>
                <div>
                    <div>Cena Dodávky: {total.montaz.toFixed(2)}€</div>
                    <Change val={changeMontaz} />
                </div>

                <div>
                    <div>Cena spolu: {total.total.toFixed(2)}€</div>
                    <Change val={changeTotal} />
                </div>
                <button onClick={scrollToTop} className="h-fit">Top</button>
            </div>

            
        </Layout>
    </div>
  )
}

function Change({val}){
   if(val >= 0){
        return(
            <div className='text-[#2b8f3b]'>
                +{val} €
            </div>
        )
   }else{
        return(
            <div className='text-[#8f2b2b]'>
                {val} €
            </div>
        )
   }
}