import { useEffect, useRef, useState } from "react"
import { useAlertContext } from "../../../util/components/Context/AlertContext"
import { Link } from "react-router-dom"
import FeatureCarousel from "./FeatureCarousel/FeatureCarousel"
import LoadingSpinner from "../../../util/components/LoadingSpinner"
import PopularGenresCarousel from "./Popular genres/PopularGenresCarousel"
import NewestGames from "./Newest games/NewestGames"
import { useUserContext } from "../../../util/components/Context/userContex"
import useVisible from "../../../util/hooks/useVisible"
import RecommendedGames from "./Recommended Games/RecommendedGames"
import fetchData from "../../../util/functions/fetchData"


export default function HomePage(){
    const {setAlert}=useAlertContext()
    const [isLoadingStore,setIsLoadingStore]=useState(false)
    const [carouselCards,setCarouselCards]=useState([])
    const [popularGenresCard,setPopularGenresCard]=useState([])
    const [newestGameCards,setNewestGameCards]=useState([])
    const {userInfo}=useUserContext()
    const [canRecommendGames,setCanRecommendGames]=useState(false)
    const recommendedRef=useRef(null)
    const [isVisible,observerRef]=useVisible(recommendedRef,{
        root:null,
        rootMargin:'50px',
        threshold:0.75
    })

    function successCb(result){
        setCarouselCards([...result.result.mostPopular])
        setPopularGenresCard([...result.result.populargenres])
        setNewestGameCards([...result.result.newest])
    }

    function failCb(err){
        setAlert('fail',err.system)
    }
    

    useEffect(()=>{
        setIsLoadingStore(true)
        fetchData({
            url:`/api/homePage`,
            config:{}
        },successCb,failCb)
        .finally(()=>setIsLoadingStore(false))
    },[])

    useEffect(()=>{
        if(isVisible){
            observerRef.current.disconnect()
        }
    },[isVisible])

    useEffect(()=>{
        if(userInfo.userType==='customer'&&userInfo.userId){
            setCanRecommendGames(true)
        }
    },[userInfo])

    return(
        <div className="w-full flex justify-center items-center">
            {isLoadingStore?
                <LoadingSpinner/>:
                <div className="w-full flex flex-col items-center">
                    <div className="w-full max-w-[1000px] px-4 flex flex-col items-center">
                        <FeatureCarousel cards={carouselCards}/>
                        <PopularGenresCarousel cards={popularGenresCard}/>
                        <NewestGames cards={newestGameCards}/>
                    </div>
                    

                    {canRecommendGames?
                        <>
                            <div ref={recommendedRef} className="w-full h-[40px]"></div>
                            {isVisible?<RecommendedGames/>:<></>}
                        </>:
                        <div className="w-full bg-black relative p-6 text-center">
                            <h3 className="text-bright-blue text-xl">Sign in as a customer to view personalized recommendation</h3>
                            <button className="p-2 mt-2 rounded-sm hover:bg-dark-green text-text-white bg-dark-green/80"><Link to={'/login/customer'}>Sign in</Link></button>
                        </div>
                    }
                </div>
            }
        </div>
    )
}