import { useEffect, useState } from "react";
import dotenv from 'dotenv'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


export default function EmailVerificationPage(){
    const [isToken,setisToken]=useState(false)
    const { token }=useParams()

    useEffect(()=>{
        (async ()=>setisToken(await fetch(`${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_API_PORT}/api/verify/${token}`)))()
    },[])

    return((isToken)?
        <div className="min-h-screen bg-very-dark-blue flex justify-center items-center">
            <h1 className="text-bright-blue justify-self-start">Verification successfully</h1>
            <Link className="text-bright-blue" to={'/login'}>Login</Link>
        </div>:
        <div className="min-h-screen bg-very-dark-blue flex justify-center items-center">
            <h1 className="text-bright-blue justify-self-start">Error invalid link, please login to issue another link</h1>
            <Link className="text-bright-blue" to={'/login'}>Login</Link>
        </div>
    )
}