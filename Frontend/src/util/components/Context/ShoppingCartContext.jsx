import { createContext, useState, useContext, useEffect } from "react"
import fetchData from "../../functions/fetchData"
import { useUserContext } from "./userContex"
import { useAlertContext } from "./AlertContext"

const shoppingCartContext=createContext(null)

function ShoppingCartContext({children}){
    const [shoppingCart,setShoppingCart]=useState([])
    const [total,setTotal]=useState(0)
    const [isSlideIn,setIsSlideIn]=useState(false)
    const {userInfo}=useUserContext()
    const {setAlert}=useAlertContext()


    function successGetCartCb(result){
        setShoppingCart(result.cart)
    }

    function failGetCartCb(err){
        setAlert('fail',err.system)
    }

    
    useEffect(()=>{
        if(userInfo.userId&&userInfo.userType==='customer'){
            const accessToken=localStorage.getItem('accesstoken')
            fetchData({
                url:`/api/shoppingcart/${userInfo.userId}`,
                config:{
                    headers:{authorization: 'Bearer '+ accessToken},
                }
            },successGetCartCb,failGetCartCb,true)
        }
    },[userInfo.userId])

    useEffect(()=>{
        if(shoppingCart.length>0){
            console.log(shoppingCart)
            const total=shoppingCart.reduce((acc,obj)=>(acc+obj.price),0)
            setTotal(total)
        }
    },[shoppingCart])

    return(
        <shoppingCartContext.Provider value={{shoppingCart,setShoppingCart,isSlideIn,setIsSlideIn,total}}>
            {children}
        </shoppingCartContext.Provider>
    )
}

const useShoppingCartContext=()=>useContext(shoppingCartContext)

export {ShoppingCartContext,useShoppingCartContext}

