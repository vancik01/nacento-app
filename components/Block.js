import { Input } from '@mui/material'
import React, { useState } from 'react'
import { useData } from '../context/AppWrap'
import DragableIcon from '../public/SVG/Dragable'
import EditPen from '../public/SVG/EditPen'
import Table from './Table'

export default function Block({headers, block, number, collapsed, dragHandleProps}) {
    const {editBlockTitle} = useData();
    const [editingTitle, seteditingTitle] = useState(false)
    const [blockTitle, setblockTitle] = useState(block.info.title);
    function handleEditTitle(){
        editBlockTitle(blockTitle, number);
        seteditingTitle(false)
    }
    return (
        <div className='py-10' key={number}>
            <div className='flex justify-between items-center'>           
                {!editingTitle && <div className='relative w-fit'>
                    <h3>{number +1}. {block.info.title}</h3>
                    <button onClick={()=>{seteditingTitle(true)}} className='absolute top-0 -right-5 w-3'>
                        <EditPen></EditPen>
                    </button>
                </div>}

                {editingTitle &&
                    <div className='flex justify-center items-center'>
                        <div className='text-2xl mr-1'>{number +1}. </div>
                        <Input type='text' value={blockTitle} onChange={(e)=>{setblockTitle(e.target.value)}} fullWidth className='text-2xl' />
                        <button onClick={handleEditTitle}>Uložiť</button>
                    </div>
                }



                {!collapsed && <div className='flex flex-row gap-10'>
                    <div>Cena dodávky celkom: {parseFloat(block.info["total_delivery_price"]).toFixed(2)} €</div>
                    <div>Cena montáže celkom: {parseFloat(block.info["total_construction_price"]).toFixed(2)} €</div>
                    <div>Cena spolu: {parseFloat(block.info["total_delivery_price"] + block.info["total_construction_price"]).toFixed(2)} €</div>
                </div>}
                {collapsed&& <div {...dragHandleProps}><DragableIcon></DragableIcon></div>}
            </div>
            
            {!collapsed && <Table blockId = {number} items={block.items} headers={headers} />}
        </div>
    )
}
