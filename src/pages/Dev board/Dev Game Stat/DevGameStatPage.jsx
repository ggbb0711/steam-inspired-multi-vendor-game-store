import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useAlertContext } from "../../../util/components/Context/AlertContext"
import LoadingSpinner from "../../../util/components/LoadingSpinner"
import DevGameInfo from "./DevGameInfo"
import DevGameSales from "./DevGameSales"
import ReviewScore from "./ReviewScore"
import fetchData from "../../../util/functions/fetchData"
import RecentReview from "./RecentReviews"

export default function DevGameStatPage(){
    const {gameId}=useParams()
    const [gameInfo,setGameInfo]=useState({})
    const [gameSalesData,setGameSalesData]=useState([])
    const [isFetching,setIsFetching]=useState(true)
    const {setAlert}=useAlertContext()
    const navigate=useNavigate()

    function successCb(result){
        console.log(result.lastSixMonthData)
        setGameInfo(result.game)
        setGameSalesData(result.lastSixMonthData)
    }

    function failCb(err){
        setAlert('fail',err.system)
        navigate('/login')
    }

    useEffect(()=>{
        setIsFetching(true)
        const accessToken=localStorage.getItem('accesstoken')
        
        fetchData({
            url:`/api/devboard/gamestat/${gameId}`,
            config:{ headers:{ authorization: 'Bearer '+ accessToken} }
        },successCb,failCb,true)
        .finally(()=>setIsFetching(false))
    },[])

    return(
        <div className="w-full p-4 flex justify-center items-center">
            {isFetching?
                <LoadingSpinner/>:
                <div className="max-w-[1000px] w-full flex flex-col gap-4">
                    <DevGameInfo gameInfo={gameInfo}></DevGameInfo>
                    <DevGameSales stat={gameSalesData}></DevGameSales>
                    <ReviewScore averageRating={gameInfo.averageRating} totalReview={gameInfo.reviews.totalReview} ratings={gameInfo.reviews.reviewScore}/>
                    <RecentReview reviews={gameInfo.recentReviews}/>
                </div>
            }
            
        </div>
    )
}