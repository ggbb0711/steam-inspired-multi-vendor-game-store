import useVisible from "../../../../util/hooks/useVisible"
import { useRef, useEffect } from "react"
import BrowseGamePageCard from "./BrowseGamePageCard"


export default function BrowseGamePage({cards,turnPage}){
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
        <section className="w-full flex justify-center">
            <div className="w-full px-4 max-w-[1000px] grid gap-7 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
                {cards.map((card,i)=>
                    <BrowseGamePageCard card={card} key={i}/>
                )}
                <div className="w-full h-4" ref={containerRef}></div>
            </div>
        </section>
    )
}