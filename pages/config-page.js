
import { Input } from '@mui/material'
import React, { useState } from 'react'
import Layout from '../components/Layout'
import { template_config } from '../data'

export default function Config() {

    const [data, setdata] = useState(template_config)

    function handleChange(e)
    {
        const newData = [...data]
        var identificator=e.target.name
        var value = e.target.value

        var ids = identificator.split(";");
        if(ids.length == 2){
            newData[ids[0]].items[[ids[1]]].value = parseFloat(value)
        }else if(ids.length === 3){
            newData[ids[0]].items[[ids[1]]].items[ids[2]].value = parseFloat(value)
        }
        setdata(newData)

    }

  return (
    <Layout className="my-28">
        <h1 className='text-center'>Dáta, ktoré sme z projektov vyčítali</h1>
        {data.map((block1,i)=>{
            return(
                <div className='mt-16'>
                    <h2>
                        {block1.label}
                    </h2>
                    <div>
                        {block1?.items.map((item,q)=>{
                            if("value" in item){
                                return(
                                    <InputValue 
                                        key={`${i};${q}`} 
                                        id={`${i};${q}`} 
                                        onChange={handleChange} 
                                        label={item.label} 
                                        value={data[i].items[[q]].value} 
                                        unit={item.unit}
                                    />
                                )
                            }
                        })}
                    </div>

                    <div className='flex justify-start gap-8'>
                        {block1?.items.map((block2,j)=>{
                            return(
                                <div className=''>
                                    {block2?.items &&
                                        <div className='mt-8 bg-gray-100 w-64 p-4'>
                                            <div>
                                                <h3>
                                                    {block2.label}
                                                </h3>
                                                <div>
                                                    {block2.items.map((block3,k)=>{
                                                        return(
                                                            <InputValue 
                                                                id={`${i};${j};${k}`}
                                                                onChange={handleChange} 
                                                                label={block3.label} 
                                                                value={block3.value} 
                                                                unit={block3.unit}
                                                            />                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    

                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        })}
    </Layout>
  )
}

function InputValue({id,label, value, valueId, onChange, unit}){
    return(
        
            <div className='mt-4 flex items-center gap-4'>
                <div className='text-sm'>{label}</div>
                <div className='bg-gray-300 w-24 px-2'>
                    <Input onChange={onChange} defaultValue={value} name={id} style={{backgroundColor:"#D9D9D9"}} disableUnderline inputProps={{min:0}} type='number' endAdornment={unit} />
                </div>
            </div>
        
    )
}