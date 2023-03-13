import React, {useState} from 'react'

import { useData } from "../context/AppWrap";

import ArrowDown from "../public/SVG/ArrowDown";
import { AccordionDetails } from "@mui/material";
import { Accordion } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import PageIcon from "../public/SVG/PageIcon";
import Plus from "../public/SVG/buttons/Plus"


import elektroinstalacie from "../public/subory-prac/elektroinstalacie.json"
import vykurovanie from "../public/subory-prac/vykurovane.json"

function BlockSelector() {
  const subory_prac = [elektroinstalacie, vykurovanie]

  const {
        addBlockFull,
        addBlock,
        addSection,
  } = useData();

  function handleAddBlock(section, block){

    let new_section = {...section}
    new_section.blocks = [block]
    addBlockFull(new_section, block)
  }

  return (
    <div className='pt-5'>
      <div className='pb-3'> Pridať do ponuky: </div>

    {subory_prac.map(subor => {

        return(
            <>
            <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDown />}
                        onClick={() => {
                            console.log('click')
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-4">
                                <PageIcon color={"blue"}></PageIcon>
                            </div>
                            <div>{subor.title}</div>
                        </div>
                    </AccordionSummary>

                    <AccordionDetails>
                        <div className='flex-row'>
                        {subor["sections"].map(section => {

                            return(
                            
                            <Accordion>
                                <AccordionSummary expandIcon={<ArrowDown />}>
                                    <div className='flex justify-center gap-5'> 
                                        {section.info.title} 
                                    </div>
                                </AccordionSummary>

                                    <AccordionDetails>
										<div className='flex flex-col gap-3 pr-2'>
            
                                        {section["blocks"].map(block => {

                                            return(
                                                <div className='flex items-center gap-3'> 
                                                    <div>{block.info.title}</div>
                                                    <button onClick={() => handleAddBlock(section, block)}>+</button>
                                                </div>
                                            )

                                        })}
                                        </div>
									</AccordionDetails>

                            </Accordion>

                            
 
                            )})}
                                       
                            
                        </div>
                    </AccordionDetails>
            </Accordion>


            {/* <div className='text-base flex items-center gap-2'> 
                <button> {subor.title} </button>
                <ArrowDown/>
             </div> */}
            </>

        )
    })}
     

    </div>
  )
}

export default BlockSelector
