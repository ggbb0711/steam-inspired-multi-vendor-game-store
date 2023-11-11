import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAlertContext } from "../../../util/components/Context/AlertContext"
import LoadingSpinner from "../../../util/components/LoadingSpinner"
import GameContainer from "./GameInfo/GameContainer"
import { useUserContext } from "../../../util/components/Context/userContex"
import ReviewContainer from "./Recent reviews/ReviewContainer"
import {ReviewForm} from "./Review form/ReviewForm"
import fetchData from "../../../util/functions/fetchData"
import GameOverallScore from "./GameInfo/GameOverallScore"


export default function Game(){
    const {gameId}=useParams()
    const {setAlert}=useAlertContext()
    const [gameInfo,setGameInfo]=useState({})
    const [isLoading,setIsLoading]=useState(true)
    const {userInfo}=useUserContext()

    function successCb(result){
        setGameInfo(result.game)
    }

    function failCb(err){
        setAlert('fail',err.system)
    }

    
    useEffect(()=>{
        setIsLoading(true)
        fetchData({
            url:`/api/game/${gameId}?customerId=${(userInfo.userId)}&dev=${userInfo.userType==='dev'?userInfo.name:''}`,
            config:{},
        },successCb,failCb).finally(()=>setIsLoading(false))
    },[userInfo.userId,userInfo.userType])


    return(
        <div className="w-full py-2 flex gap-2 flex-col items-center">
            {isLoading?
                <LoadingSpinner/>:
                <>
                    <GameContainer game={gameInfo}/>
                    {gameInfo.isOwned&&!gameInfo.hasReviewed?<ReviewForm gameId={gameInfo._id}/>:<></>}
                    <GameOverallScore averageRating={gameInfo.averageRating} totalReview={gameInfo.reviews.totalReview} ratings={gameInfo.reviews.reviewScore}/>
                    <ReviewContainer reviews={gameInfo.recentReviews||[]} gameId={gameId} totalReview={gameInfo.reviews.totalReview}/>
                </>
                
            }
        </div>
    )
}