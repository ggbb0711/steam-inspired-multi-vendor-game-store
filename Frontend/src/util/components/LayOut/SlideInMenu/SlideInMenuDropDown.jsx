import { useState } from "react"
import SlideInMenuLinks from "./SlideInMenuLinks"

export default function SlideInMenuDropDown({text,links}){
    const[isActive,setIsActive]=useState(false)
    
    return(
        <div className="overflow-y-hidden relative">
            <div className="cursor-pointer" onClick={()=>setIsActive(!isActive)}>
                <p>{text}</p>
            </div>
            <div className={`w-full pl-2 transition-all duration-200 ${isActive?'':'-translate-y-[200%] absolute'}`}>
                {links.map((link,i)=>{
                    return <SlideInMenuLinks path={link.path} text={link.text} key={i}></SlideInMenuLinks>
                })}
            </div>
        </div>
    )
}