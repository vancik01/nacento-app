import React from 'react'

export default function PriceChangeIndicator({val, endAdorment}) {
    if(val >= 0){
        return(
            <div className='text-[#2b8f3b] text-xs'>
                +{val} 
                {endAdorment ? endAdorment : " €"}
            </div>
        )
   }else{
        return(
            <div className='text-[#8f2b2b] text-xs'>
                {val} 
                {endAdorment ? endAdorment : " €"}
            </div>
        )
   }
}
