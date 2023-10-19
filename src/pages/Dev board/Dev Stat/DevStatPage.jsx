import { useEffect, useState } from "react"
import DevInfo from "./DevInfo"
import LastSixMonthStat from "./LastSixMonthStat"
import { useAlertContext } from "../../../util/components/Context/AlertContext"
import fetchData from "../../../util/functions/fetchData"
import LoadingSpinner from "../../../util/components/LoadingSpinner"
import BestSeller from "./BestSeller"

export default function DevStatPage(){
    const [devInfo,setDevInfo]=useState({})
    const [lastSixMonthStat,setLastSixMonthStat]=useState([])
    const [bestSeller,setBestSeller]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    const {setAlert}=useAlertContext()


    function successCb(result){
        setDevInfo(result.devInfo)
        setLastSixMonthStat(result.lastSixMonthData)
        setBestSeller(result.bestSeller)
    }

    function failCb(err){
        setAlert('fail',err.system)
    }


    useEffect(()=>{
        const accessToken=localStorage.getItem('accesstoken')
        fetchData({
            url:'/api/devboard/',
            config:{
                headers:{ authorization: 'Bearer '+ accessToken} ,
            }
        },successCb,failCb,true)
        .finally(()=>setIsLoading(false))
    },[])

    return(
        <div className="w-full p-4 flex justify-center items-center">
            {isLoading?
                <LoadingSpinner/>:
                <div className="max-w-[1000px] w-full flex flex-col gap-4">
                    <DevInfo devInfo={devInfo}/>
                    <LastSixMonthStat stat={lastSixMonthStat}/>
                    <BestSeller cards={bestSeller}/>
                </div>
            }
            
        </div>
    )
}