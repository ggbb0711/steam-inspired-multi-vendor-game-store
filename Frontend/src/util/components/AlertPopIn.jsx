import { useEffect, useState } from "react";
import { useAlertContext } from "./Context/AlertContext";

export default function AlertPopIn(){
    const {msgArr}=useAlertContext()

    return(
        <div className="fixed top-[50px] right-0 text-xs z-[15] flex flex-col gap-2">
            {msgArr.map((msg,i)=>{
                if(msg.type==='fail') return <FailTypeAlert key={i} msg={msg.msg}></FailTypeAlert>
                if(msg.type==='success') return <SuccessTypeAlert key={i} msg={msg.msg}></SuccessTypeAlert>
            })}
        </div>
    )
}

function FailTypeAlert({msg}){
    const [slideIn,setSlideIn]=useState(false)

    useEffect(()=>{
        setSlideIn(true)
        setTimeout(()=>setSlideIn(false),3000)
    },[])

    return(
        <div className={`bg-neutral-black border-2 border-red-500 p-3 transition-all duration-1000 ${slideIn?'translate-x-0':'translate-x-[999px]'}`}>
            <p className="text-red-500">{msg}</p>
        </div>
    )
}

function SuccessTypeAlert({msg}){
    const [slideIn,setSlideIn]=useState(false)

    useEffect(()=>{
        setSlideIn(true)
        setTimeout(()=>setSlideIn(false),3000)
    },[])


    return(
        <div className={`bg-neutral-black border-2 border-light-green p-3 transition-all duration-1000 ${slideIn?'translate-x-0':'translate-x-[999px]'}`}>
            <p className="text-light-green">{msg}</p>
        </div>
    )
}