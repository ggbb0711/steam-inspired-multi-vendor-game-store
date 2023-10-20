import { createContext, useContext, useState } from "react";
import uuid from "react-uuid";

const AlertContext=createContext()

export default function AlertProvider({children}){
    const [msgArr,setMsgArr]=useState([])

    function setAlert(type,msg){
        const msgId=uuid()
        setMsgArr([...msgArr,{type,msg,msgId}])

        setTimeout(()=>{
            console.log(msgArr)
            setMsgArr(msgArr.filter(msg=>msg.msgId!==msgId))
        },4000)
    }
    
    return(
        <AlertContext.Provider value={{msgArr,setMsgArr,setAlert}}>
            {children}
        </AlertContext.Provider>
    )
}

const useAlertContext=()=>useContext(AlertContext)

export {AlertProvider,useAlertContext}