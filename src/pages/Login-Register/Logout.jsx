import { useEffect, useState } from "react";
import LoadingSpinner from "../../util/components/LoadingSpinner";
import { useAuthorizedContext } from "../../util/components/Context/isAuthorizedContext";
import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../../util/components/Context/AlertContext";
import { Link } from "react-router-dom";

export default function Logout(){
    const {authorizeData}=useAuthorizedContext()
    const navigate=useNavigate()
    const {setAlert}=useAlertContext()
    const [isLoading,setIsLoading]=useState(true)


    useEffect(()=>{
        authorizeData()
            .then(async (result)=>{
                if(result.successful){
                    await fetch('/api/logout')
                    localStorage.removeItem('accesstoken')
                    setAlert('success','Logout successfully')
                    navigate('/login')
                }
                else{
                    setIsLoading(false)
                }
            })
    },[])

    return(
        <div className="min-h-screen bg-very-dark-blue flex justify-center items-center">
            <div className="w-full max-w-[900px] flex flex-col justify-center items-center">
                {isLoading?
                    <>
                        <p className="text-very-bright-blue text-md">Loging out...</p>
                        <LoadingSpinner/>
                    </>
                    :<>
                        <p className="text-very-bright-blue text-md">You are not login</p>
                        <button className="bg-dark-green text-text-white cursor-pointer p-2"><Link to={'/login'}>Login</Link></button>
                        
                    </>
                }
                
            </div>
        </div>
    )
}