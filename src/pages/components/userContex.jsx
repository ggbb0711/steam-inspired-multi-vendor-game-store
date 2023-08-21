import { createContext, useState, useContext, useEffect } from "react"

const userContext=createContext(null)

function UserContext({children}){
    const [userInfo,setUserInfo]=useState({
        name:'',
        gmail:'',
        userType:'',
        userId:''
    })


    return(
        <userContext.Provider value={{userInfo,setUserInfo}}>
            {children}
        </userContext.Provider>
    )
}

const useUserContext=()=>useContext(userContext)

export {UserContext,useUserContext}