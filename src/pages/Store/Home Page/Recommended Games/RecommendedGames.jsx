import { useEffect, useState } from "react"
import { useAlertContext } from "../../../../util/components/Context/AlertContext"
import { useUserContext } from "../../../../util/components/Context/userContex"
import LoadingSpinner from "../../../../util/components/LoadingSpinner"
import RecommendedGamePage from "./RecommendedGamePage"
import fetchData from "../../../../util/functions/fetchData"

export default function RecommendedGames(){
    const [isLoading,setIsLoading]=useState(false)
    const [currPage,setCurrPage]=useState(0)
    const [pages,setPages]=useState([])
    const {setAlert}=useAlertContext()
    const {userInfo}=useUserContext()

    function successCb(result){
        if(result.result.length>0) setPages([...pages,result.result])
    }

    function faiCb(err){
        setAlert('fail',err.system)
    }


    useEffect(()=>{
        setIsLoading(true)
        fetchData({
            url:`/api/homepage/recommendedgames/${userInfo.userId}?page=${currPage}`,
            config:{}
        },successCb,faiCb).finally(()=>setIsLoading(false))
    },[currPage])


    return(
        <section className="w-full flex flex-col items-center gap-2">
            {pages.map((page,i)=><RecommendedGamePage key={i} turnPage={()=>setCurrPage(currPage+1)} cards={page}/>)}
            {isLoading?<LoadingSpinner/>:<></>}
        </section>
    )
}