import React, { useEffect, useState } from 'react'

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useData } from '../context/AppWrap';
import { Font } from '@react-pdf/renderer';
import { style } from '@mui/system';
import { Input } from '@mui/material';
import { Button } from '@mui/material';
import Logo from '../public/SVG/Logo';
import { Image } from '@react-pdf/renderer';

// Create styles
Font.register({family:"Poppins", fonts:[
  {
    fontStyle:"normal", 
    fontWeight:400, 
    src:"https://fonts.cdnfonts.com/s/16009/Poppins-Regular.woff"
  }
]
})

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    fontFamily:"Poppins",    
    paddingTop:40,
    paddingBottom:40,
  },
  logo:{
    width:50,
  },
  row:{
    flexDirection:"row",
    flexGrow:4,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  heading:{
    fontFamily:"Poppins",
    fontSize:20,
    fontWeight:700,
    marginBottom:10,
  },
  blockSummary:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"flex-start",
    marginBottom:4,
  }, 
  blockHeading:{
    fontFamily:"Poppins",
    fontSize:14,
    fontWeight:700,
    marginBottom:10,
  },

  text:{
    fontFamily:"Poppins",
    fontSize:10,
  },
  textBold:{
    fontFamily:"Poppins",
    fontSize:10,
    fontWeight:600,
  },
  tableRow:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"flex-start",
    marginBottom:10,
    paddingHorizontal:8,
  },

  tableHeading:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"flex-start",
    marginBottom:10,
    borderRadius:7,
    fontWeight:700,

    paddingVertical:10,
    paddingHorizontal:8,
    backgroundColor:"#2B2D42",
    color:"#fff"
  },

  tableText:{
    fontSize:7,
    marginRight:8,
  },
  col_service_type:{
    width:30,
    fontSize:7,
    marginRight:8,

  },
  col_item_id:{
    width:80,
    fontSize:7,
    marginRight:8,

  },
  col_title:{
    width:100,
    fontSize:7,
    marginRight:8,
  },
  col_unit:{
    width:30,
    fontSize:7,
    marginRight:8,
  },
  col_quantity:{
    width:60,
    fontSize:7,
    marginRight:8,
  },
  col_unit_delivery_price:{
    width:50,
    fontSize:7,
    marginRight:8,
  },
  col_unit_construction_price:{
    width:50,
    fontSize:7,
    marginRight:8,
  },
  col_total_delivery_price:{
    width:50,
    fontSize:7,
    marginRight:8,
  },
  col_total_construction_price:{
    width:50,
    fontSize:7,
    marginRight:8,
  },
  tableUnit:{
    marginRight:8,
  },
  footer: {
    position: 'absolute',
    fontSize: 12,
    bottom: 20,
    left: 20,
    right: 20,
    fontFamily:"Poppins",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row"
  },
  footerText:{
    fontSize:7,
  },

  header: {
    position: 'absolute',
    fontSize: 12,
    top: 20,
    left: 20,
    right: 20,
    fontFamily:"Poppins",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row"
  },
  headerText:{
    fontSize:7,
  }


});



// Create Document Component
export const Pdf = ({data, getTitle, title}) => (
  <Document title={title}>
    <Page size="A4" style={styles.page} >
      <View style={styles.header} fixed>
        <Text style={styles.headerText}>{title}</Text>
        
        <Image
          style={styles.logo}
          src="/logo.png"
        />

      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Objednávatel</Text>
        <Text style={styles.text}>{data.customer}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Dodávateľ:</Text>
        <Text style={styles.text}>{data.supplyer.company_name}</Text>
        <Text style={styles.text}>ico: {data.supplyer.ico}</Text>
        <Text style={styles.text}>dic: {data.supplyer.dic}</Text>
        <Text style={styles.text}>Tel.: {data.supplyer.phone}</Text>
        <Text style={styles.text}>Email: {data.supplyer.email}</Text>
        <Text style={styles.text}>{data.supplyer.web}</Text>
      </View>
      
      {data.blocks.map((block, i)=>{
        return(
          <View style={styles.section} wrap={false}>
            <Text style={styles.blockHeading}>{i+1}. {block.info.title}</Text> 
            <View style={styles.blockSummary}>
              <Text style={styles.text}>Cena dodávky celkom: {block.info.total_delivery_price.toFixed(2)} €</Text>
              <Text style={styles.text}>Cena montáže celkom: {block.info.total_construction_price.toFixed(2)} €</Text>
              <Text style={styles.textBold}>Spolu: {(block.info.total_delivery_price + block.info.total_construction_price).toFixed(2)} €</Text>
            </View>
            <View >
              {block.items.length > 0&& <View style={styles.tableHeading}>
                <Text style={styles.tableText}>Č.</Text>
                <Text style={styles.col_service_type}>{(getTitle("service_type","sk")).short}</Text>
                <Text style={styles.col_item_id}>{getTitle("item_id","sk").short}</Text>
                <Text style={styles.col_title}>{getTitle("title","sk").short}</Text>
                <Text style={styles.col_unit}>{getTitle("unit","sk").short}</Text>
                <Text style={styles.col_quantity}>{getTitle("quantity","sk").short}</Text>
                <Text style={styles.col_unit_delivery_price}>{getTitle("unit_delivery_price","sk").short}</Text>
                <Text style={styles.col_unit_construction_price}>{getTitle("unit_construction_price","sk").short}</Text>
                <Text style={styles.col_total_delivery_price}>{getTitle("total_delivery_price","sk").short}</Text>
                <Text style={styles.col_total_construction_price}>{getTitle("total_construction_price","sk").short}</Text>
              </View>}
              {block?.items.map((item,itemId)=>{
                return(
                  <View style={styles.tableRow}>
                    <Text style={styles.tableText}>{itemId}</Text>
                      <Text style={styles.col_service_type}>{item.service_type}</Text>
                      <Text style={styles.col_item_id}>{item.item_id}</Text>
                      <Text style={styles.col_title}>{item.title}</Text>
                      <Text style={styles.col_unit}>{item.unit}</Text>
                      <Text style={styles.col_quantity}>{item.quantity}</Text>
                      <Text style={styles.col_unit_delivery_price}>{item.unit_delivery_price.toFixed(2)} €</Text>
                      <Text style={styles.col_unit_construction_price}>{item.unit_construction_price.toFixed(2)} €</Text>
                      <Text style={styles.col_total_delivery_price}>{item.total_delivery_price.toFixed(2)} €</Text>
                      <Text style={styles.col_total_construction_price}>{item.total_construction_price.toFixed(2)} €</Text>
                  </View>
                )
              })}
            </View>
          </View>
        )
      })}
      <View style={styles.footer} fixed>
        <Text style={styles.footerText}>{data.supplyer.company_name}</Text>
        
        <Text style={styles.footerText} render={({ pageNumber, totalPages}) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
        
        <Text style={styles.footerText}>{new Date().toLocaleDateString()}</Text>

      </View>

      
    </Page>
  </Document>
);

export const DownloadLink = ({close}) => {
    const {data, getTitle,name} = useData();
    const [displayLink, setdisplayLink] = useState(false)
    const [title, settitle] = useState(name.toLowerCase())
  
    return (
      <>
        <div>
          <Input type='text' className='w-full my-6'  value={title} endAdornment=".pdf" onChange={(e)=>{settitle(e.target.value)}} />
          {!displayLink && <Button onClick={()=>{setdisplayLink(true)}} fullWidth={true} >Generovať cenovú ponuku</Button>}
        </div>
        {displayLink && (
          <PDFDownloadLink document={
            <Pdf data={data} title={name} getTitle={getTitle}/>
          } fileName={`${title}.pdf`}
            onClick={close}
          >
            {({ blob, url, loading, error }) => (
                <Button disabled={loading} >{loading? "Načítavam..." : "Stiahnuť ponuku"}</Button>
            )}
          </PDFDownloadLink> 
        )}
      </>
    );
  }

  
