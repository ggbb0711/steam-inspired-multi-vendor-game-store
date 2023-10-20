import { createContext, useContext, useState } from "react";
import { useUserContext } from "./userContex";
import fetchData from "../../functions/fetchData";


const authorizeContext=createContext(null)

function AuthorizedContext({children}){
    const {setUserInfo}=useUserContext()
    const [isAuthorized,setIsAuthorized]=useState(false)
    
    function successCb(result){
        setIsAuthorized(true)
        setUserInfo(
            {name:result.user.userName,
            email:result.user.email,
            userType:result.user.userType,
            userId:result.user.userId
        })
        return {successful:true, user:{
            name:result.user.userName,
            email:result.user.email,
            userType:result.user.userType,
            userId:result.user.userId
        }}
    }

    function failCb(err){
        setIsAuthorized(false)
        setUserInfo({
            name:'',
            email:'',
            userType:'',
            userId:''
        })
        return {successful:false, err:{...err}}
    }

    async function authorizeData(){
        const accessToken=localStorage.getItem('accesstoken')
        return await fetchData({
            url:`/api/getuserdata/`,
            config:{ headers:{ authorization: 'Bearer '+ accessToken} }
        },successCb,failCb,true)
    }

   

    return(
        <authorizeContext.Provider value={{authorizeData,isAuthorized}}>
            {children}
        </authorizeContext.Provider>
    )
}

const useAuthorizedContext=()=>useContext(authorizeContext)

export {AuthorizedContext, useAuthorizedContext}