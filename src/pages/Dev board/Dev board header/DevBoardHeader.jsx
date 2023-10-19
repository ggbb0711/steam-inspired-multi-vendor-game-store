import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function DevBoardHeader({links}){
    const location=useLocation()

    return(
        <div className="sticky w-full px-4 pr-0 flex gap-2 bg-neutral-black top-0 z-[11]">
            {links.map((link,i)=>
                <div key={i} className={`p-2 flex justify-center items-center ${location.pathname===link.link?'text-bright-blue bg-very-dark-blue':'text-text-white'} hover:text-bright-blue`}>
                    <Link to={link.link} onClick={()=>setCurrActive(currActive)}>{link.text}</Link> 
                </div>
            )}
        </div>
    )
}