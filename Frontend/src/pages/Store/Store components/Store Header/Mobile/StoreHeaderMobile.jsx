import { cloneElement, useEffect, useState } from "react"

export default function StoreHeaderMobile({els,dropDownEls}){
    const [isSlideDown,setIsSlideDown]=useState(false)
    const [activeElement,setActiveElement]=useState('')


    useEffect(()=>{
        setIsSlideDown(activeElement?true:false)
    },[activeElement])
    
    function endActive(){
        setActiveElement('')
    }

    return(
        <>
            <div className="max-w-[1000px] z-[5] relative w-full text-white/70 flex flex-col items-center justify-between md:hidden">
                <nav className="w-full p-4 flex items-center justify-between">
                    {
                        els.map((group,groupId)=>
                        <div key={groupId} className="flex justify-center items-center gap-2">
                            {group.map((el,elId)=>
                                <button key={elId} className="p-3 cursor-pointer flex justify-between items-center" onClick={()=>setActiveElement(el.title)}>
                                    {el.src}
                                </button>)}
                        </div>)
                    }
                </nav>
                <div className="w-[90%] bg-neutral-black">
                        {dropDownEls.map((group,groupId)=>
                            <ul className={`${group.title===activeElement?'':'hidden'}`} key={groupId}>
                                {group.src.map((el,elId)=>{
                                    return( 
                                    <li key={elId} className={`p-2 justify-center items-center`}>
                                            {cloneElement(el,{endActive})}
                                    </li>)
                                })}
                            </ul>
                        )}
                </div>
            </div>
            
            <div className={`w-screen h-screen z-[4] bg-black/50 fixed top-0 left-0 ${isSlideDown?'':'hidden'}`} onClick={()=>endActive()}></div>
        </>
        
    )
}