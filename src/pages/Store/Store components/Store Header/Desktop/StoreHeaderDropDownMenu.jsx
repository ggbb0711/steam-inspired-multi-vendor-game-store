import { useState } from "react"
import { Link } from "react-router-dom"


export default function StoreHeaderDropDownMenu({title,links}){
    const [isSlideDown,setIsSlideDown]=useState(false)
    
    return(
        <div className={`relative text-white/70 ${isSlideDown?"":'overflow-y-hidden'}`}>
            <button className={`p-3 w-full h-full cursor-pointer flex justify-between items-center gap-2 hover:text-bright-blue ${isSlideDown?'text-bright-blue':''}`} onClick={()=>{
                setIsSlideDown(!isSlideDown)
            }}>
                <p>{title}</p>
            </button>
            <div className={`absolute min-w-full left-0 bg-neutral-black transition-all ${isSlideDown?'translate-y-0':'overflow-y-hidden -translate-y-[999px]'}`}>
                <ul>
                    {links.map((link,i)=>
                        <li key={i} className="p-3 hover:bg-gray-bright-blue hover:text-bright-blue cursor-pointer">
                            <Link to={link.path}>{link.text}</Link>
                        </li>
                    )}         
                </ul>
            </div>
        </div>
    )
}