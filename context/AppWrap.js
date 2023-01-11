import React, { useContext, useEffect, useState } from 'react'
import { lang } from '../../languages';
import FullPageLoading from '../components/loading/FullPageLoading';
import { d } from '../data';

const DataContext = React.createContext();


export function AppWrap({children}){
    const [data, setdata] = useState(d)
    const [headers, setheaders] = useState(d.headers)
    const [loading, setloading] = useState(true)
    const [name, setname] = useState("")

    const [total, settotal] = useState({
        dodavka:0,
        montaz:0,
        total:0,
    })
    const [initialTotal, setinitialTotal] = useState(total)

    useEffect(() => {
        var t={
            dodavka:0,
            montaz:0,
            total:0,
        }
        data.blocks.map((block)=>{
            t.dodavka += block.info['total_delivery_price']
            t.montaz += block.info['total_construction_price']
        })
        t.total = t.dodavka + t.montaz
        setloading(false)

        settotal(t);

    }, [data])

    useEffect(() => {
        var t={
            dodavka:0,
            montaz:0,
            total:0,
        }
        data.blocks.map((block)=>{
            t.dodavka += block.info['total_delivery_price']
            t.montaz += block.info['total_construction_price']
        })
        t.total = t.dodavka + t.montaz

        setinitialTotal(t);

    }, [])
    
    function changeValue(obj){ 
        var newData = {...data}
        newData.blocks[obj.blockId].items[obj.polozkaId][obj.valueId] = parseFloat(obj.value)

        if(obj.valueId === "total_construction_price"){
            newData.blocks[obj.blockId].items[obj.polozkaId]['unit_construction_price'] = parseFloat(parseFloat(obj.value) / newData.blocks[obj.blockId].items[obj.polozkaId]['quantity']).toFixed(2)
        }else if(obj.valueId === "total_delivery_price"){
            newData.blocks[obj.blockId].items[obj.polozkaId]['unit_delivery_price'] = (newData.blocks[obj.blockId].items[obj.polozkaId][obj.valueId] / newData.blocks[obj.blockId].items[obj.polozkaId]['quantity']).toFixed(2)
        }
        else{
            newData.blocks[obj.blockId].items[obj.polozkaId]['total_construction_price'] = newData.blocks[obj.blockId].items[obj.polozkaId]['unit_construction_price'] * newData.blocks[obj.blockId].items[obj.polozkaId]['quantity']
            newData.blocks[obj.blockId].items[obj.polozkaId]['total_delivery_price'] = newData.blocks[obj.blockId].items[obj.polozkaId]['unit_delivery_price'] * newData.blocks[obj.blockId].items[obj.polozkaId]['quantity']
        }
        
        newData.blocks[obj.blockId].info['total_delivery_price'] = 0
        newData.blocks[obj.blockId].info['total_construction_price'] = 0

        newData.blocks[obj.blockId].items.map((polozka,i)=>{
            newData.blocks[obj.blockId].info['total_delivery_price'] += polozka["total_delivery_price"]
            newData.blocks[obj.blockId].info['total_construction_price'] += polozka["total_construction_price"]
        })        
        setdata(newData);
    }

    function deleteRow(obj){
        var newData = {...data}
        var polozkaRemoved
        data.blocks.map((block, blockId)=>{
            if(obj.blockId === blockId){
                var newPolozky = []
                block.items.map((polozka,polozkaId)=>{
                    if(polozkaId !== obj.polozkaId){
                        newPolozky.push(polozka)
                    }else{
                        polozkaRemoved = polozka;
                    }
                    
                })
                newData.blocks[blockId].items = newPolozky;
                var newPolozky = []
                var cdc = newData.blocks[blockId].info['total_delivery_price']
                var cmc = newData.blocks[blockId].info['total_construction_price']
                var itemsCount = newData.blocks[blockId].items.length
                
                newData.blocks[blockId].items.map((polozka,polozkaId)=>{
                    polozka["total_construction_price"] += parseFloat(polozkaRemoved["total_construction_price"] / itemsCount)
                    polozka["total_delivery_price"] += parseFloat(polozkaRemoved["total_delivery_price"] / itemsCount)
                    
                    
                    
                    newPolozky.push(polozka)
                })
                newData.blocks[blockId].items = newPolozky;
            
            }
        })

        setdata(newData);
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
      };

    function reorderRows(blockId, e){
        var newData = {...data}
        
        if (!e.destination) {
            return;
        }

        const items = reorder(
            newData.blocks[blockId].items,
            e.source.index,
            e.destination.index
        );
        newData.blocks[blockId].items = items;       

        setdata(newData);
    }

    function reorderBlocks(e){
        var newData = {...data}
        
        if (!e.destination) {
            return;
        }

        const items = reorder(
            newData.blocks,
            e.source.index,
            e.destination.index
        );
        newData.blocks = items;       

        setdata(newData);
    }

    function getTitle(titleId, language){
        return lang[language][titleId]
    }

    function changeSupplyerData(supplyerData){
        var newData = {...data}
        newData.supplyer = supplyerData;

        setdata(newData);
    }

    function editBlockTitle(newTitle, blockId){
        var newData = {...data}
        newData.blocks[blockId].info.title = newTitle;

        setdata(newData);
    }
    
    
    const value={
        data,
        headers,
        total,
        initialTotal,
        changeValue,
        deleteRow,
        reorderRows,
        getTitle,
        reorderBlocks,
        name,
        setname,
        changeSupplyerData,
        editBlockTitle
    }
    return(
        <DataContext.Provider value={value}>
            <FullPageLoading loading={loading} />
            {children}
        </DataContext.Provider>
    )
    
}


export function useData(){
    return useContext(DataContext);
  }
  

