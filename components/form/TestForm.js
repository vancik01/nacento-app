import React, {useEffect} from 'react'

import ArrowDown from '../../public/assets/general/ArrowDown';
import FullPageLoading from '../loading/FullPageLoading';

import Zakladovka from "./steps/Zakladovka";
import Murivo from "./steps/Murivo";
import Strecha from "./steps/Strecha";

import { useStepper } from "../../context/StepperContext";
import { useApi } from "../../context/ApiContext";


function TestForm({theme_color}) {

  const { color, setColor } = useStepper()
  const { DataToPriceOffer, dataloading } = useApi()


  useEffect(() => {
    setColor(theme_color)
  }, []);

  const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

  return (
    <>

    <div className='bg-gray-100 pb-1 px-5'>
        
        <FullPageLoading loading={dataloading}></FullPageLoading>


        <div className=''>

            <div className='text-2xl font-semibold pt-6 pb-5'> 1. Základová doska </div>
            <hr className="h-[1px] bg-black border-0" />

            <Zakladovka/>

        
            <div className='text-2xl font-semibold pt-10 pb-5'> 2. Murovacie práce </div>
            <hr className="h-[1px] bg-black border-0" />

            <Murivo />


            <div className='text-2xl font-semibold pt-10 pb-5'> 3. Strecha </div>
            <hr className="h-[1px] bg-black border-0" />
            <Strecha />

        </div>

        <div className='flex justify-between px-6 items-center pt-2'>

            <div onClick={goToTop}
              className="flex gap-3 items-center cursor-pointer h-fit bg-gray-300 py-3 px-4 hover:bg-gray-400 trans">
        
                <button className="font-medium text-black">
                    Spať hore
                </button>

                <div style={{transform: "rotate(180deg)"}}><ArrowDown color={"black"}></ArrowDown></div>

            </div>

            <div onClick={() => DataToPriceOffer("HS")}
                className={`flex gap-3 w-fit items-center cursor-pointer bg-rose-600 my-6 py-3 px-4 hover:opacity-80 trans`}>
                <button className="font-medium text-white">
                    Vytvoriť cenovú ponuku
                </button>

                <div style={{transform: "rotate(270deg)"}}><ArrowDown color={"white"}></ArrowDown></div>
            </div>
            

            

        </div>

    </div>


    </>
  )
}

export default TestForm
