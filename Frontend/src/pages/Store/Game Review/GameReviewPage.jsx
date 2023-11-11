import useVisible from "../../../util/hooks/useVisible"
import { useRef, useEffect } from "react"
import ReviewCard from "../Game/Recent reviews/ReviewCard"



export default function GameReviewPage({cards,turnPage}){
    const containerRef=useRef(null)
    const [isVisible,observerRef]=useVisible(containerRef,{
        root:null,
        rootMargin:'10px',
        threshold:0.75
    })
   
    useEffect(()=>{
        if(isVisible){
            observerRef.current.disconnect()
            turnPage()
        }
    },[isVisible])

    return(
        <div className="w-full flex flex-col justify-center items-center gap-2">
            {cards.map((card,i)=>
                <ReviewCard review={card} key={i}></ReviewCard>
            )}
            <div className="w-full h-4" ref={containerRef}></div>
        </div>
    )
}