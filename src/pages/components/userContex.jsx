import { createContext, useState, useContext, useEffect } from "react"

const userContext=createContext(null)

function UserContext({children}){
    const [userInfo,setUserInfo]=useState({
        name:'',
        email:'',
        userType:'',
        userId:''
    })

    useEffect(()=>{
        
    },[])


    return(
        <userContext.Provider value={{userInfo,setUserInfo}}>
            {children}
        </userContext.Provider>
    )
}

const useUserContext=()=>useContext(userContext)

export {UserContext,useUserContext}