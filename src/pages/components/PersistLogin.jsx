import { useEffect, useState } from "react";
import getUserData from "../../util/functions/getUserData";
import refreshAccessToken from "../../util/functions/refreshAccessToken";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "./userContex";
import LoadingSpinner from "./LoadingSpinner";


export default function PersistLogin({out}){
    const [isLoading,setIsLoading]=useState(false)
    const [errMessage,setErrMessage]=useState('')
    const navigate=useNavigate()
    const {setUserInfo}=useUserContext()

    useEffect(()=>{
        setIsLoading(true)
        async function getData(){
            try{
                //Use access token to get email, name and userType
                let userData=await getUserData()
                if(!userData.successful){
                    //Get accessToken with refreshToken
                    const refreshToken=await refreshAccessToken()
                    //Log out if the refresh token is invalid
                    if(!refreshToken.successful){
                        navigate('/login',{replace:true})
                        return
                    }
                    localStorage.setItem('accesstoken',refreshToken.accessToken)
                    userData= await getUserData()
                }
                setUserInfo(
                    {name:userData.user.userName,
                    email:userData.user.email,
                    userType:'dev'})
            }
            catch(err){
                console.log(err)
                setErrMessage(err)
            }
        }
        
        getData()
        setIsLoading(false)
    },[])

    return(
        <div className="min-h-screen bg-very-dark-blue flex justify-center items-center">
            {(isLoading)?
                <LoadingSpinner/>:
                (errMessage)?<h1 className="text-xs text-red-500">{errMessage}</h1>:<Outlet/>
            }
        </div>
    )
}