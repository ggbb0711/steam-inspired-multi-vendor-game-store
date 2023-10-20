import { useEffect, useRef } from "react"
import RecommandedGameBanner from "./RecommandedGameBanner"
import RecommendedGameCard from "./RecommendedGameCard"
import useVisible from "../../../../util/hooks/useVisible"

export default function RecommendedGamePage({cards,turnPage}){
    const containerRef=useRef(null)
    const [isVisible,observerRef]=useVisible(containerRef,{
        root:null,
        rootMargin:'50px',
        threshold:0.75
    })

    useEffect(()=>{
        if(isVisible){
            console.log(isVisible)
            observerRef.current.disconnect()
            turnPage()
        }
    },[isVisible])
    
    return(
        <div className="w-full flex flex-col items-center gap-16">
            <RecommandedGameBanner cards={cards.slice(0,2)}/>
            {cards.slice(2).map((card,i)=><RecommendedGameCard key={i} card={card} isReverse={i%2===0}/>)}
            <div ref={containerRef} className="w-full h-[40px]"></div>
        </div>
    )
}