import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import fetchData from "../../../util/functions/fetchData";

import GameReviewContainer from "./GameReviewContainer";
import LoadingSpinner from "../../../util/components/LoadingSpinner";
import { useAlertContext } from "../../../util/components/Context/AlertContext";

export default function GameReview(){
    const {gameId}=useParams()
    const [game,setGame]=useState({})
    const [reviews,setReviews]=useState([])
    const [page,setPage]=useState(0)
    const [isLoading,setIsLoading]=useState(true)
    const {setAlert}=useAlertContext()


    function successCb(result){
        console.log(result)
        if(result.game) setGame(result.game)

        if(result.reviews.length>0)setReviews([...reviews,result.reviews])
    }

    function failCb(err){
        setAlert('fail',err.system)
    }

    useEffect(()=>{
        setIsLoading(true)
        fetchData({
            url:`/api/review/${gameId}?page=${page}`,
            config:{}
        },successCb,failCb)
        .finally(()=>setIsLoading(false))
    },[page])

    return(
        <div className={`w-full h-full min-h-screen`}>
            
            <div className="w-full m-auto my-4 max-w-[1000px] px-2 z-[3] relative">
                <div className="w-full flex justify-between items-center mb-2 flex-wrap text-center gap-2">
                    {game?
                        <>
                            <h1 className="text-xl text-text-white">{game.title}</h1>
                            <button className="bg-dark-green text-text-white p-4 cursor-pointer"><Link to={`/game/${game._id}`}>Game page</Link></button>
                        </>:
                        <></>
                    }
                </div>
                {reviews.length>0?
                    <GameReviewContainer pages={reviews} turnPage={()=>setPage(page+1)}></GameReviewContainer>:
                    <div className="w-full h-[250px] text-center flex justify-center items-center p-4 bg-neutral-black">
                        <p className="text-2xl text-very-bright-blue">
                            404 NO REVIEWS FOUND
                        </p>
                    </div>
                }
                
                {isLoading?
                    <div className="w-full flex justify-center items-center">
                        <LoadingSpinner/>
                    </div>:
                    <></>
                }
            </div>
            <div className="fixed w-screen h-screen top-0 left-0 mix-blend-overlay z-[2]">
                <img src={`${game.images?.thumbnailImage.src}`} className="absolute object-cover object-right h-full top-0 left-0 w-full " />
                <div className="bg-gradient-to-r from-dark-blue via-bright-blue/80 to-dark-blue absolute h-full top-0 left-0 w-full z-0" />
            </div>
        </div>
    )
}