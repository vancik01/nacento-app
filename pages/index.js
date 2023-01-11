import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import "react-tooltip/dist/react-tooltip.css";
import Head from 'next/head'
import { useContext, useEffect, useState } from 'react';
import Block from '../components/Block';

import React from "react"
import { AppWrap, useData } from '../context/AppWrap';
import CenovaPonuka from '../components/CenovaPonuka';
import Pdf, { DownloadLink, ResumeContainer } from '../components/Pdf';
import ReactDOM from '@react-pdf/renderer';

export default function Home() {
  
  const theme = createTheme({
    typography: {
      fontFamily: "Poppins",
      fontSize: 10,
    },
    
  });
  function download(){
    ReactDOM.renderToFile(<Pdf />);
  }
  
  

  return (
    
      <ThemeProvider theme={theme}>
        <AppWrap>
          <CenovaPonuka></CenovaPonuka>
        </AppWrap>
      </ThemeProvider>
    
  )
}




