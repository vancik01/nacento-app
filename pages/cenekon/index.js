import React, {useState} from 'react'
import df from "../../sections/elektroinstalacie.json"
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

function addSekcia(e){
    //let d = [...data]

    for(let i=0; i<df.length; i++){

        if(`${df[i].itemIndex}` == e.target.id){
            console.log(df[i].description)

            break
        }
    }
    //d.sections.push(e.target)

    console.log(e.target.id)
}

function addBlock(e){
    console.log(e)
}

function addPolozka(e){
    console.log(e)
}

export const UserContext = React.createContext(null);

export default function index() {
    const [data, setData] = useState(test);
    

    console.log(df.length)

    const e = []
    for(let i=0; i<df.length; i++){
        let l = df[i].itemLevel


        e.push( 

            <li key={df[i].itemIndex} style={{marginLeft : `${l*20}px`}} >{df[i].description}  </li>
        
        )
    }

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
                <hr style={{width:"100%"}}/>
                <ul className='p-10'>

                    { e }

                </ul>
            </div>  

        </div>
  )
}


