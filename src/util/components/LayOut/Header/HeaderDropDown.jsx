import { useState } from "react"
import HeaderLink from "./HeaderLink"

export default function SlideInMenuDropDown({text,links}){
    const[isActive,setIsActive]=useState(false)
    
    return(
        <div className="overflow-y-hidden">
            <div className="hover:text-bright-blue cursor-pointer" onClick={()=>setIsActive(!isActive)}>
                <p>{text}</p>
            </div>
            <div className={`w-[150px] pl-2 bg-gray-bright-blue transition-all absolute duration-200 ${isActive?'':'hidden opacity-0'}`}>
                {links.map((link,i)=>{
                    return <HeaderLink path={link.path} text={link.text} key={i}></HeaderLink>
                })}
            </div>
        </div>
    )
}