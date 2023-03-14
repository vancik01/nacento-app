import React, {useState} from 'react'
import elektroinstalacie from "../../sections/elektroinstalacie.json"
import elektromontaze from "../../sections/elektromontaze.json"
import elektro from "../../sections/elektro.json"
import {test} from "../../data"


import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import "react-tooltip/dist/react-tooltip.css";
import Head from "next/head";
import { AppWrap } from "../../context/AppWrap";
import LayoutContext from "../../context/LayoutContext";
import ScreenLayout from "../../components/ScreenLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function index() {
    const [df, setDf] = useState(elektroinstalacie)

    return (

        <div className=''>
            <div className='w-[50%] h-full fixed overflow-y-scroll left-0 right-0'>

                <AppWrap>
                    <LayoutContext>
                        <ToastContainer
                            position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                        <ScreenLayout />
                    </LayoutContext>
                </AppWrap>
                
            </div>

            <div className='w-[50%] h-full fixed overflow-y-scroll right-0 top-0'>
                
                <div className='flex justify-center gap-5'>
                    <button onClick={e => { setDf(elektroinstalacie) }}><u>Elektroinštalácie</u></button>
                    <button onClick={e => { setDf(elektromontaze) }}><u>Elektromontáže</u></button>
                    <button onClick={e => { setDf(elektro) }}><u>Cenník výrobkov</u></button>
                </div>

                <ul className='p-10'>

                    <Skeleton df={df}></Skeleton>

                </ul>
            </div>  

        </div>
  )
}


function Skeleton({ df }) {
    const e = []
    for(let i=0; i<df.length; i++){
        let l = df[i].itemLevel


        e.push( 

            <li key={df[i].itemIndex} style={{marginLeft : `${l*20}px`}} >{df[i].description}</li>
        
        )
    }

    return(e)
}