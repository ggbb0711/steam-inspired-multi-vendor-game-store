import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAlertContext } from "../../util/components/Context/AlertContext";
import fetchData from "../../util/functions/fetchData";


export default function EmailVerificationPage(){
    const [isVerified,setIsVerified]=useState(false)
    const { token }=useParams()
    const {setALert}=useAlertContext()

    function successCb(result){
        setIsVerified(result.successfull)
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

    return(
        <div className="min-h-screen bg-very-dark-blue flex justify-center items-center">
            <div className="max-w-[350px] bg-neutral-black text-center p-8 flex justify-between items-center flex-col gap-2">
                {isVerified?
                    <h1 className="text-bright-blue justify-self-start">Verification successfully</h1>:
                    <h1 className="text-bright-blue justify-self-start">Error invalid link, please login to issue another link</h1>
                }
                <button className="bg-dark-green text-text-white cursor-pointer p-2"><Link to={'/login/'}>Login</Link></button>
            </div>
        </div>
    )
}