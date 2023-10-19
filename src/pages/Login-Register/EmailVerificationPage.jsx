import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAlertContext } from "../../util/components/Context/AlertContext";
import fetchData from "../../util/functions/fetchData";


export default function EmailVerificationPage(){
    const [isToken,setisToken]=useState(false)
    const { token }=useParams()
    const {setALert}=useAlertContext()

    function successCb(result){
        setisToken(result.successfull)
    }

    function failCb(){
        setALert('fail','Something went wrong. Please verify your account again')
    }

    useEffect(()=>{
        fetchData({
            url:`/api/verify/${token}`,
            config:{}
        },successCb,failCb)
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