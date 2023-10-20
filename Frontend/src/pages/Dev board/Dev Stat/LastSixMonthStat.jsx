import { useEffect, useState } from "react"
import LastSixMonthStatGraph from "../../../util/components/LastSixMonthStatGraph"


export default function LastSixMonthStat({stat}){
    const [statState,setStatState]=useState([])

    useEffect(()=>{
        const monthNames=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        const today=new Date()
        const newState=[]

        for(let i=6;i>0;i--){
            const d=new Date(today.getFullYear(),today.getMonth()-i+1,1)
            
            let copiesSold=0
            if(stat){
                stat.forEach(date=>{
                    if(date._id.month-1===d.getMonth()) copiesSold=date.copiesSold
                })
            }
            
            newState.push({
                date:monthNames[d.getMonth()]+'-'+d.getFullYear(),
                copiesSold
            })
        }

        setStatState(newState)
    },[stat])
    return(
        <div className="w-full flex justify-center">
            {stat?
                <div className="w-full">
                    <h1 className="text-2xl text-very-bright-blue text-md">Last six month sales:</h1>
                    <div className="w-full flex justify-center">
                        <LastSixMonthStatGraph data={statState}/>
                    </div>
                   
                </div>:
                <div className="w-full p-6 text-bright-blue bg-neutral-black">
                    <p>This developer has no sales data</p>
                </div>
            }
        </div>
        
    )
}