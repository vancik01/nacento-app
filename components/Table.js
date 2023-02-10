
import { Input } from '@mui/material'
import { useDragControls } from 'framer-motion'
import { Reorder } from 'framer-motion'
import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Tooltip } from 'react-tooltip'
import { useData } from '../context/AppWrap'
import { useLayout } from '../context/LayoutContext'
import Cancel from '../public/SVG/Cancel'
import DragableIcon from '../public/SVG/Dragable'
import Dragable from '../public/SVG/Dragable'
import {motion} from "framer-motion"

export default function Table({items, headers, blockId, sectionId}) {
    
    const {deleteRow, reorderRows, getTitle} = useData()
    const {displayColumns, tableRowTemplate, primaryColor} = useLayout()
    const [hovering, sethovering] = useState("")
   
    function removeRow(blockId, polozkaId){
    
        deleteRow({
            blockId, polozkaId, sectionId
        })
    }
    
    return (
        <>
            {items.length > 0 &&
                <div key={blockId}>
                    <div style={{backgroundColor:primaryColor}} className="text-white">
                        <div className='table_row heading' style={{gridTemplateColumns:tableRowTemplate}}>
                            <div className='font-medium py-1 px-2' >N.</div>
                            {headers.map((item, i)=>{
                                var heading = getTitle(item,"sk")
                                if(displayColumns.includes(item)){
                                    return(
                                        <div key={`table-header-${i}`}>
                                            <div className={`font-medium ${heading.short} py-1 px-2`} style={{color:"white"}}>
                                                <span id={`${blockId}-${heading.short}`}>{heading.short}</span>
                                                <Tooltip
                                                    anchorId={`${blockId}-${heading.short}`}
                                                    place="top"
                                                    content={heading.long}
                                                    delayHide={3}
                                                />
                                            </div>
                                        </div>
                                    )
                                }
                                
                            })}

                            <div> </div>
                            
                        </div>
                    </div>

                    <DragDropContext onDragStart={()=>{console.log("start")}} onDragEnd={(e)=>{reorderRows(blockId, sectionId, e)}}>
                        <Droppable droppableId={`table`} >
                            {(provided)=>(
                                <div {...provided.droppableProps} ref={provided.innerRef} className="table_wrap">
                                    {items?.map((polozka,i)=>{
                                        return(
                                            
                                                <Draggable key={`${blockId}${i}`} draggableId={`item-${blockId}-${i}`} index={i}>
                                                    {(provided, snapshot)=>(
                                                        <div {...provided.draggableProps} ref={provided.innerRef} className="relative">
                                                            <div className={`table_row content ${snapshot.isDragging ? "dragging" : ""}${i === items.length -1 ? "last" : ""}`} style={{gridTemplateColumns:tableRowTemplate}}  >
                                                                <div className={`flex justify-center items-center select-none h-full py-1 table_unit`}>
                                                                    {i+1}
                                                                </div>

                                                                {headers.map((item)=>{
                                                                    var label = getTitle(item,"sk")
                                                                    
                                                                    if(displayColumns.includes(item)){
                                                                        return(
                                                                            <div key={`table-${sectionId}-${blockId}-${item}`} className='h-full flex items-center justify-start py-1 px-2 table_unit'>
                                                                                <TableUnit sectionId={sectionId} polozkaId={i} blockId={blockId} item={item} polozka={polozka} label={label}/>
                                                                            </div>
                                                                        )
                                                                    }
                                                                })}

                                                                {<div className='flex justify-end gap-1 select-none absolute -right-12'>
                                                                    <div onClick={()=>{removeRow(blockId, i)}}><Cancel color={primaryColor} /></div>
                                                                    <div
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        <DragableIcon />
                                                                    </div>
                                                                </div>}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            
                                        )
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            }
        </>
    )
}



function TableUnit({item, polozka, blockId, polozkaId, label, sectionId}){
    const {changeValue} = useData()
    function update(e){
        changeValue({
            blockId: blockId, 
            polozkaId: polozkaId,
            sectionId:sectionId,
            valueId: item,
            value: e.target.value,
            sectionId:sectionId,
        })
    }
    
    if(item === "service_type"){
        return(
            <div className={`flex align-middle items-center ${label.short}`}>
                {polozka.service_type}
            </div>
        )
    } 
    else if(item === "item_id"){
        return(
            <div className={`flex align-middle items-center ${label.short}`}>
                {polozka.item_id}
            </div>
        )
    }
    else if(item === "title"){
        return(
            <div className={`flex align-middle items-center  ${label.short}`}>
                {polozka.title}
            </div>
        )
    }
    else if(item === "unit"){
        return(
            <div className={`flex align-middle items-center ${label.short}`}>
                {polozka.unit}
            </div>
        )
    }
    else if(item === "quantity"){
        return(
            <div className={`flex align-middle items-center ${label.short}`}>
                <Input disableUnderline inputProps={{min:0}} type='number' onChange={update} value={polozka.quantity} />
            </div>
        )
    }
    else if(item === "unit_delivery_price"){
        return(
            <div className={`flex align-middle items-center ${label.short}`}>
                <Input  disableUnderline inputProps={{min:0}} type='number' onChange={update} value={polozka.unit_delivery_price} endAdornment="€"/>
            </div>
        )
    }
    else if(item === "unit_construction_price"){
        return(
            <div className={`flex align-middle items-center ${label.short}`}>
                <Input disableUnderline inputProps={{min:0}} type='number' onChange={update} value={polozka.unit_construction_price} endAdornment="€" />
            </div>
        )
    }
    else if(item === "total_delivery_price"){
        return(
            <div className={`flex justify-center items-center ${label.short}`}>
                <Input disableUnderline inputProps={{min:0}}  type='number' onChange={update} value={polozka.total_delivery_price} endAdornment="€"/>
            </div>
        )
    }
    else if(item === "total_construction_price"){
        return(
            <div className={`flex align-middle items-center ${label.short}`}>
                <Input disableUnderline inputProps={{min:0}}  type='number' onChange={update} value={polozka.total_construction_price} endAdornment="€" />
            </div>
        )
    }
    else if(item === "total"){
        return(
            <div className={`flex align-middle items-center ${label.short}`}>
                <Input disableUnderline inputProps={{min:0}} type='number' onChange={update} value={polozka.total} endAdornment="€" />
            </div>
        )
    }
    
    
    
}