import { useShoppingCartContext } from "./Context/ShoppingCartContext";
import { Link } from "react-router-dom";
import {RxCross2} from "react-icons/rx"
import { useAlertContext } from "./Context/AlertContext";
import fetchData from "../functions/fetchData";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function ShoppingCartPopIn(){
    const {shoppingCart, setShoppingCart, isSlideIn, setIsSlideIn, total}=useShoppingCartContext()
    const {setAlert}=useAlertContext()
    const [isLoading,setIsLoading]=useState(false)
    const [isCheckOut,setIsCheckOut]=useState(false)

    function successRemoveCarCb(result){
        setShoppingCart(result.newCart)
    }

    function failRemoveCarCb(err){
        setAlert('fail',err.system)
    }

    async function removeFromCart(i){
        setIsLoading(true)
        const accessToken=localStorage.getItem('accesstoken')
        await fetchData({
            url:`/api/shoppingcart/${shoppingCart[i].game_id}`,
            config:{
                headers:{authorization: 'Bearer '+ accessToken},
                method:'PUT',
            }
        },successRemoveCarCb,failRemoveCarCb,true)
        setIsLoading(false)
    }

    function successCheckOut(result){
        window.location.href = result.url
    }

    function failCheckOut(err){
        setAlert('fail',err.system)
    }

    async function createCheckOut(e){
        e.preventDefault()
        setIsCheckOut(true)
        setIsLoading(true)
        const accessToken=localStorage.getItem('accesstoken')
        const items=new FormData()
        let checkOutItems=[]
        for(const item of shoppingCart){
            checkOutItems.push(JSON.stringify(item))
        }
        items.append('items',JSON.stringify([...checkOutItems]))

        await fetchData({
            url:'/api/checkout',
            config:{
                body:items,
                method:'POST',
                headers:{ authorization: 'Bearer '+ accessToken}
            }
        },successCheckOut,failCheckOut,true).finally(()=>{
            setIsCheckOut(false)
            setIsLoading(false)
        })
    }

    return(
        <>
            <div className={`bg-black/30 fixed cursor-pointer w-full h-full z-50 top-0 left-0 ${isSlideIn?'block':'hidden'}`} onClick={()=>setIsSlideIn(false)}></div>
            <div className={`fixed top-0 right-0 h-full w-[65vw] max-w-[350px] bg-gray-bright-blue flex flex-col gap-2 justify-between items-center p-4 z-[99] transition-all duration-200 ${isSlideIn?'':'translate-x-[150%]'}`}>
                <RxCross2 className="text-text-white hover:text-red-500 absolute top-5 right-3 cursor-pointer" onClick={()=>setIsSlideIn(false)}/>
                <p className="text-2xl text-bright-blue">Your cart</p>
                <div className="w-full relative h-full max-h-[90%] flex flex-col items-center gap-2 overflow-y-scroll">
                    <div className={`absolute w-full h-full bg-black/60 top-0 left-0 flex justify-center items-center z-50 ${isLoading?'':'hidden'}`}>
                        <LoadingSpinner></LoadingSpinner>
                    </div>
                    {(()=>{
                        if(shoppingCart.length>0){
                            return(
                                shoppingCart.map((item,i)=>
                                    <div key={i} className="w-full relative flex flex-col justify-center items-center">
                                        <RxCross2 className="text-text-white hover:text-red-500 absolute top-0 right-0 cursor-pointer" onClick={()=>removeFromCart(i)}/>
                                        <Link className="text-very-bright-blue" to={`/game/${item.game_id}`}>{item.title}</Link>
                                        <div className="w-full max-w-[250px] aspect-[4/3] relative">
                                            <img className="w-full h-full" src={item.thumbnailImage.src} alt={item.thumbnailImage.name} />
                                            <Link className="absolute top-0 left-0 w-full h-full" to={`/game/${item.game_id}`}></Link>
                                        </div>
                                        <p className="text-dark-green">{item.price}$</p>
                                    </div>
                                )
                            )
                        }

                        return(
                            <div className="w-full h-full text-very-bright-blue text-center">
                                <p>There are no items in your cart</p>
                            </div>
                        )
                    })()}
                </div>
                {shoppingCart.length>0?
                <>
                    <p className="text-text-white">Total: <span className="text-dark-green">{total}$</span></p>
                    <form>
                        <input className={`bg-dark-green p-4 text-text-white cursor-pointer ${isCheckOut?'bg-black/50':''}`} disabled={isCheckOut} onClick={createCheckOut} type="submit" value={'Check out'}/>
                    </form>
                </>:
                <></>}
            </div>
            
        </>
    )
}