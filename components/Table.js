
import { Input } from '@mui/material'
import { useDragControls } from 'framer-motion'
import { Reorder } from 'framer-motion'
import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Tooltip } from 'react-tooltip'
import { useData } from '../context/AppWrap'
import Cancel from '../public/SVG/Cancel'
import DragableIcon from '../public/SVG/Dragable'
import Dragable from '../public/SVG/Dragable'

export default function Table({items, headers, blockId}) {

    const {deleteRow, reorderRows, getTitle} = useData()
   
    function removeRow(blockId, polozkaId){
    
        deleteRow({
            blockId, polozkaId
        })
    }
    
    return (
        <>
            {items.length > 0 &&
                <div key={blockId}>
                    <div className='text-[#63A695]'>
                        <div className='table_row heading'>
                            <div className='font-extralight' >N.</div>
                            {headers.map((item, i)=>{
                                var heading = getTitle(item,"sk")
                                return(
                                    <>
                                        <div key={i} className={`font-extralight text-[#006f85] ${heading.short}`} >
                                            <span id={`${blockId}-${heading.short}`}>{heading.short}</span>
                                            <Tooltip
                                                anchorId={`${blockId}-${heading.short}`}
                                                place="top"
                                                content={heading.long}
                                                delayHide={3}
                                            />
                                        </div>
                                    </>
                                )
                            })}

                            <div> </div>
                            
                        </div>
                    </div>

                    <DragDropContext onDragEnd={(e)=>{reorderRows(blockId, e)}}>
                        <Droppable droppableId={`table`}>
                            {(provided)=>(
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {items?.map((polozka,i)=>{
                                        return(
                                            <Draggable key={`${blockId}${i}`} draggableId={`item-${blockId}-${i}`} index={i}>
                                                {(provided, snapshot)=>(
                                                    <li className={`table_row content ${snapshot.isDragging ? "dragging" : ""}`} {...provided.draggableProps} ref={provided.innerRef} >
                                                        <div className='flex justify-between select-none'>
                                                            {i+1}
                                                        </div>

                                                        {headers.map((item)=>{
                                                            var label = getTitle(item,"sk")
                                                            return(
                                                                <TableUnit polozkaId={i} blockId={blockId} item={item} polozka={polozka} label={label}/>
                                                            )
                                                        })}

                                                        <div className='flex justify-end gap-1 select-none'>
                                                            <div onClick={()=>{removeRow(blockId, i)}}><Cancel /></div>
                                                            <div
                                                                 {...provided.dragHandleProps}
                                                            >
                                                                <DragableIcon />
                                                            </div>
                                                        </div>
                                                    </li>
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



function TableUnit({item, polozka, blockId, polozkaId, label}){
    const {changeValue} = useData()
    function update(e){
        changeValue({
            blockId: blockId, 
            polozkaId: polozkaId,
            valueId: item,
            value: e.target.value,
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
            <div className={`flex align-middle items-center ${label.short}`}>
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
                <Input disableUnderline inputProps={{min:0}} type='number' onChange={update} value={polozka.unit_construction_price} endAdornment="€"/>
            </div>
        )
    }
    else if(item === "total_delivery_price"){
        return(
            <div className={`flex align-middle items-center ${label.short}`}>
                <Input disableUnderline inputProps={{min:0}} type='number' onChange={update} value={polozka.total_delivery_price} endAdornment="€"/>
            </div>
        )
    }
    else if(item === "total_construction_price"){
        return(
            <div className={`flex align-middle items-center ${label.short}`}>
                <Input disableUnderline inputProps={{min:0}} type='number' onChange={update} value={polozka.total_construction_price} endAdornment="€" />
            </div>
        )
    }
    
    
    
}