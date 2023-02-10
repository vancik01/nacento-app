import { AnimatePresence } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react'
import { lang } from '../../languages';
import BulkEdit from '../components/BulkEdit';
import FullPageLoading from '../components/loading/FullPageLoading';
import Modal from '../components/Modal';
import { d, newd } from '../data';

const DataContext = React.createContext();


export function AppWrap({children}){
    const [data, setdata] = useState(newd)
    const [headers, setheaders] = useState(d.headers)
    const [loading, setloading] = useState(true)
    const [name, setname] = useState("Zadajte názov...")
    const [bulkEdit, setbulkEdit] = useState(false)
    const [bulkEditData, setbulkEditData] = useState(null)
    const [displayTotals, setdisplayTotals] = useState(true)
    const [reorderingBlocks, setreorderingBlocks] = useState(false)
    const [download, setdownload] = useState(false)
    const [selectedFile, setselectedFile] = useState(null)
    const [logo, setlogo] = useState(null)
    const [displaySidebar, setdisplaySidebar] = useState(true)

    const [total, settotal] = useState({
        total_delivery_price:0,
        total_construction_price:0,
        total:0,
    })
    const [initialTotal, setinitialTotal] = useState(total)

    useEffect(() => {
        var t={
            total_delivery_price:0,
            total_construction_price:0,
            total:0,
        }
        data.sections.map((section)=>{
            section.blocks.map((block)=>{
                t.total_delivery_price += parseFloat(block.info['total_delivery_price'])
                t.total_construction_price += parseFloat(block.info['total_construction_price'])
            })
        })

        t.total = t.total_delivery_price + t.total_construction_price
        setloading(false)
        settotal(t);
        

    }, [data])

    useEffect(() => {
        var t={
            total_delivery_price:0,
            total_construction_price:0,
            total:0,
        }
        data.sections.map((section)=>{
            section.blocks.map((block)=>{
                t.total_delivery_price += parseFloat(block.info['total_delivery_price'])
                t.total_construction_price += parseFloat(block.info['total_construction_price'])
            })
        })

        t.total = t.total_delivery_price + t.total_construction_price
        setloading(false)
        setinitialTotal(t);
        
        
    }, [])

    useEffect(() => {
        var newData = {...data}
        var section_total = 0, section_total_delivery_price = 0, section_total_construction_price = 0;
        newData.sections.map((section,k)=>{
            var section_total = 0, section_total_delivery_price = 0, section_total_construction_price = 0;
            section.blocks.map((block,i)=>{
                newData.sections[k].blocks[i].info.total = block.info["total_construction_price"] + block.info["total_delivery_price"]
                section_total_construction_price +=block.info["total_construction_price"]
                section_total_delivery_price +=block.info["total_delivery_price"]
                section_total += newData.sections[k].blocks[i].info.total

                block.items.map((item,j)=>{
                    newData.sections[k].blocks[i].items[j].total = newData.sections[k].blocks[i].items[j].total_construction_price + newData.sections[k].blocks[i].items[j].total_delivery_price
                    //2 desatinn
                    newData.sections[k].blocks[i].items[j].total_construction_price = parseFloat(newData.sections[k].blocks[i].items[j].total_construction_price).toFixed(2)
                    newData.sections[k].blocks[i].items[j].total_delivery_price = parseFloat(newData.sections[k].blocks[i].items[j].total_delivery_price).toFixed(2)
                    newData.sections[k].blocks[i].items[j].unit_construction_price = parseFloat(newData.sections[k].blocks[i].items[j].unit_construction_price).toFixed(2)
                    newData.sections[k].blocks[i].items[j].unit_delivery_price = parseFloat(newData.sections[k].blocks[i].items[j].unit_delivery_price).toFixed(2)
                    newData.sections[k].blocks[i].items[j].total = parseFloat(newData.sections[k].blocks[i].items[j].total).toFixed(2)
                })
            })  

            newData.sections[k].info.total = parseFloat(section_total).toFixed(2)
            newData.sections[k].info.total_construction_price = parseFloat(section_total_construction_price).toFixed(2)
            newData.sections[k].info.total_delivery_price = parseFloat(section_total_delivery_price).toFixed(2)
        })      
        setdata(newData);
    }, [])
    

    
    
    
    function changeValue(obj){ 
        
        var newData = {...data}
        if(obj.value < 0 || obj.value === NaN || isNaN(obj.value) || !obj.value){
            obj.value = 0
        }
        if(obj.valueId != "total"){
            
            newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId][obj.valueId] = parseFloat(obj.value)
        }

        if(obj.valueId === "total_construction_price"){
            newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId]['unit_construction_price'] = parseFloat(parseFloat(obj.value) / newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId]['quantity']).toFixed(2)
            newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId].total = parseFloat( parseFloat(newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId].total_construction_price) +  parseFloat(newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId].total_delivery_price)).toFixed(2)
        }else if(obj.valueId === "total_delivery_price"){
            newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId]['unit_delivery_price'] = (newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId][obj.valueId] / newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId]['quantity']).toFixed(2)
            newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId].total = parseFloat( newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId].total_construction_price +  newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId].total_delivery_price).toFixed(2)
        }else if(obj.valueId === "total"){
            
            var valueChange = obj.value - newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId].total 
            var cmcIndex
            var cdcIndex
            if(newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId].total !== 0){
                var cmcIndex = newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId].total_construction_price / newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId].total
                var cdcIndex = newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId].total_delivery_price / newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId].total
                
            }else{
                var cmcIndex = 0.5
                var cdcIndex = 0.5
            }

            // console.log("cmc -> ", cmcIndex *100, "% ->" , parseFloat(valueChange * cmcIndex))
            // console.log("cdc -> ", cdcIndex *100, "%->", parseFloat(valueChange * cdcIndex))
            
            

            newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId].total_construction_price = (parseFloat(newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId].total_construction_price) + parseFloat(valueChange * cmcIndex)).toFixed(2)
            newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId].total_delivery_price = (parseFloat(newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId].total_delivery_price) + parseFloat(valueChange * cdcIndex)).toFixed(2)

            newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId][obj.valueId] = parseFloat(obj.value)
        }
        else{
            newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId]['total_construction_price'] = newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId]['unit_construction_price'] * newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId]['quantity']
            newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId]['total_delivery_price'] = newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId]['unit_delivery_price'] * newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId]['quantity']
            newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId].total = newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId]['total_construction_price'] + newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId]['total_delivery_price']
            //2 desatinné miesta
            newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId]['total_construction_price'] = parseFloat(newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId]['total_construction_price']).toFixed(2)
            newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId]['unit_construction_price'] = parseFloat(newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId]['unit_construction_price']).toFixed(2)
            newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId]['total'] = parseFloat(newData.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId]['total']).toFixed(2)
        }
        
        newData.sections[obj.sectionId].blocks[obj.blockId].info['total_delivery_price'] = 0
        newData.sections[obj.sectionId].blocks[obj.blockId].info['total_construction_price'] = 0

        

        newData.sections[obj.sectionId].blocks[obj.blockId].items.map((polozka,i)=>{
            newData.sections[obj.sectionId].blocks[obj.blockId].info['total_delivery_price'] += parseFloat(polozka["total_delivery_price"])
            newData.sections[obj.sectionId].blocks[obj.blockId].info['total_construction_price'] += parseFloat( polozka["total_construction_price"])
        })      

        newData.sections[obj.sectionId].info['total_delivery_price'] = 0
        newData.sections[obj.sectionId].info['total_construction_price'] = 0
        newData.sections[obj.sectionId].blocks.map((block,i)=>{
            newData.sections[obj.sectionId].info['total_delivery_price'] = (parseFloat(newData.sections[obj.sectionId].info['total_delivery_price']) + parseFloat(block.info["total_delivery_price"]))
            newData.sections[obj.sectionId].info['total_construction_price'] = (parseFloat(newData.sections[obj.sectionId].info['total_construction_price']) + parseFloat(block.info["total_construction_price"]))
            newData.sections[obj.sectionId].info['total'] = (parseFloat(newData.sections[obj.sectionId].info['total_delivery_price']) + parseFloat(newData.sections[obj.sectionId].info['total_construction_price']))           
        })        

        newData.sections[obj.sectionId].blocks.map((block,i)=>{
            newData.sections[obj.sectionId].blocks[i].info.total = block.info["total_construction_price"] + block.info["total_delivery_price"]
        })

        setdata(newData);
    }

    // function deleteRowOld(obj){
    //     console.log(obj)
        
    //     var newData = {...data}
    //     var polozkaRemoved
    //     data.blocks.map((block, blockId)=>{
    //         if(obj.blockId === blockId){
    //             var newPolozky = []
    //             block.items.map((polozka,polozkaId)=>{
    //                 if(polozkaId !== obj.polozkaId){
    //                     newPolozky.push(polozka)
    //                 }else{
    //                     polozkaRemoved = polozka;
    //                 }
    //             })
    //             newData.sections[sectionId].blocks[blockId].items = newPolozky;
    //             var newPolozky = []
    //             var cdc = newData.sections[sectionId].blocks[blockId].info['total_delivery_price']
    //             var cmc = newData.sections[sectionId].blocks[blockId].info['total_construction_price']
    //             var itemsCount = newData.sections[sectionId].blocks[blockId].items.length
                
    //             newData.sections[sectionId].blocks[blockId].items.map((polozka,polozkaId)=>{
    //                 polozka["total_construction_price"] += parseFloat(polozkaRemoved["total_construction_price"] / itemsCount)
    //                 polozka["total_delivery_price"] += parseFloat(polozkaRemoved["total_delivery_price"] / itemsCount)
                    
                    
                    
    //                 newPolozky.push(polozka)
    //             })
    //             newData.sections[sectionId].blocks[blockId].items = newPolozky;
            
    //         }
    //     })

    //     setdata(newData);
    // }

    function deleteRow(obj){        
        var newData = {...data}
        var polozkaRemoved = data.sections[obj.sectionId].blocks[obj.blockId].items[obj.polozkaId]
        var newPolozky = data.sections[obj.sectionId].blocks[obj.blockId].items
        newData.sections[obj.sectionId].blocks[obj.blockId].items = newPolozky;
        newPolozky.splice(obj.polozkaId, 1)        
        
        var cdc = newData.sections[obj.sectionId].blocks[obj.blockId].info['total_delivery_price']
        var cmc = newData.sections[obj.sectionId].blocks[obj.blockId].info['total_construction_price']
       
        var itemsCount = newData.sections[obj.sectionId].blocks[obj.blockId].items.length
        
        newPolozky.map((polozka, polozkaId)=>{
            newPolozky[polozkaId]["total_construction_price"] = (parseFloat(newPolozky[polozkaId]["total_construction_price"]) + parseFloat(polozkaRemoved["total_construction_price"] / itemsCount)).toFixed(2)
            newPolozky[polozkaId]["total_delivery_price"] = (parseFloat(newPolozky[polozkaId]["total_delivery_price"]) + parseFloat(polozkaRemoved["total_delivery_price"] / itemsCount)).toFixed(2)
            newPolozky[polozkaId].total = (parseFloat(newPolozky[polozkaId]["total_delivery_price"]) + parseFloat(newPolozky[polozkaId]["total_construction_price"])).toFixed(2)
        })

        newData.sections[obj.sectionId].blocks[obj.blockId].items = newPolozky;

        setdata(newData);
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
      };

    function reorderRows(blockId,sectionId, e){
        var newData = {...data}
        
        if (!e.destination) {
            return;
        }

        const items = reorder(
            newData.sections[sectionId].blocks[blockId].items,
            e.source.index,
            e.destination.index
        );
        newData.sections[sectionId].blocks[blockId].items = items;       

        setdata(newData);
    }

    function reorderBlocks(e, sectionId){
        var newData = {...data}
        
        if (!e.destination) {
            return;
        }

        const items = reorder(
            newData.sections[sectionId].blocks,
            e.source.index,
            e.destination.index
        );
        newData.sections[sectionId].blocks = items;       

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
    function changeCustomerData(customerData){
        var newData = {...data}
        newData.customer = customerData;
        setdata(newData);
    }

    function editBlockTitle(newTitle, blockId){
        var newData = {...data}
        newData.sections[sectionId].blocks[blockId].info.title = newTitle;

        setdata(newData);
    }

    function openBulkEdit(data){
        setbulkEdit(true)
        setbulkEditData(data)
    }

    function closeBulkEdit(data){
        setbulkEdit(false)
        setbulkEditData(null)
    }

    function saveBulkEdit(value, blockId, sectionId, valueId){
        if(value == 0) return;  

        var newData = {...data}

        if(blockId >= 0 && newData.sections[sectionId].blocks[blockId].items.length == 0){
            newData.sections[sectionId].blocks[blockId].info[valueId] = newData.sections[sectionId].blocks[blockId].info[valueId] + value
            setdata(newData)
            return;
        }
        
        var sum = parseFloat(newData.sections[sectionId].blocks[blockId].info[valueId])
        var allZero = true

        newData.sections[sectionId].blocks[blockId].items.map((item,i)=>{
            //console.log(`${((item[valueId] / sum) *100).toFixed(2)}% -> + ${((item[valueId] / sum) * value).toFixed(2)}`)
            item[valueId] = parseFloat(item[valueId])
            if(item[valueId] === 0 || item["quantity"] === 0){
                
            }
            else{
                changeValue({
                    blockId: blockId, 
                    sectionId:sectionId,
                    polozkaId: i,
                    valueId: valueId,
                    value: parseFloat(parseFloat(newData.sections[sectionId].blocks[blockId].items[i][valueId]) + parseFloat((item[valueId] / sum) * value)).toFixed(2)
                })
                allZero = false
            }
        })

        if(allZero){
            newData.sections[sectionId].blocks[blockId].items.map((item,i)=>{
                console.log(`${((item[valueId] / sum) *100).toFixed(2)}% -> + ${((item[valueId] / sum) * value).toFixed(2)}`)
                changeValue({
                    blockId: blockId, 
                    sectionId:sectionId,
                    polozkaId: i,
                    valueId: valueId,
                    value: (parseFloat(newData.sections[sectionId].blocks[blockId].items[i][valueId]) + parseFloat(value / newData.sections[sectionId].blocks[blockId].items.length)).toFixed(2)
                })
            })
        }
        
    }

    function toggleTotals(){
        setdisplayTotals(!displayTotals);
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
        changeCustomerData,
        editBlockTitle,

        saveBulkEdit,
        bulkEdit,
        bulkEditData,
        openBulkEdit,
        closeBulkEdit,

        displayTotals,
        toggleTotals,

        reorderingBlocks,
        setreorderingBlocks,
        
        download, 
        setdownload,

        selectedFile,
        setselectedFile,
        logo,
        loading,


        displaySidebar,
        setdisplaySidebar
    }

    useEffect(() => {
      
        if(selectedFile && selectedFile.target.files.length > 0){
            
            setlogo(URL.createObjectURL(selectedFile?.target?.files[0]))
        }else{
            setlogo(null)
        }

    }, [selectedFile])
    



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
  

