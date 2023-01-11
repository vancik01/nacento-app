import { TextField } from '@mui/material';
import { Input } from '@mui/material';
import React, { useState } from 'react'
import { useData } from '../context/AppWrap'
import EditPen from '../public/SVG/EditPen';

export default function SupplyerInfo() {
    const {data, changeSupplyerData} = useData();
    const [editing, setediting] = useState(false);    
    const [supplyer, setsupplyer] = useState(data.supplyer);
    
    function handleChange(e){
        console.log(e.target.value)
        var newData = {...supplyer}
        newData[e.target.name] = e.target.value;
        setsupplyer(newData);
    }

    function handleSave(){
        changeSupplyerData(supplyer)
        setediting(false)
    }

    if(!editing){
        return (
            <>
                <div className='relative w-fit'>
                    <h3>Dodávateľ:</h3>
                    <button onClick={()=>{setediting(true)}} className='absolute top-0 -right-5 w-3'>
                        <EditPen></EditPen>
                    </button>
                </div>
                
                <div className=''>
                    <div>{supplyer.company_name}</div>
                    <div>ico: {data.supplyer.ico}</div>
                    <div>dic: {data.supplyer.dic}</div>
                    <div>Tel.: {data.supplyer.phone}</div>
                    <div>Email: {data.supplyer.email}</div>
                    <div>{data.supplyer.web}</div>
                </div>
            </>
        )
    }else{
        return(
            <>
                <h3>Dodávateľ:</h3>
                <div className='flex flex-col gap-6'>
                    <TextField onChange={handleChange} name="company_name" variant='standard' fullWidth label="Názov Spoločnosti" value={supplyer.company_name}></TextField>
                    <TextField onChange={handleChange} name="ico" variant='standard' fullWidth label="IČO" value={supplyer.ico}></TextField>
                    <TextField onChange={handleChange} name="dic" variant='standard' fullWidth label="DIČ" value={supplyer.dic}></TextField>
                    <TextField onChange={handleChange} name="phone" variant='standard' fullWidth label="Tel" value={supplyer.phone}></TextField>
                    <TextField onChange={handleChange} name="email" variant='standard' fullWidth label="Email" value={supplyer.email}></TextField>
                    <TextField onChange={handleChange} name="web" variant='standard' fullWidth label="Web" value={supplyer.web}></TextField>
                </div>
                <button className='mt-4' onClick={handleSave}>Uložiť</button>
            </>
        )
    }
}
