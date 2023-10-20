import { Link } from "react-router-dom"
import { useUserContext } from "../../../../util/components/Context/userContex"
import { useShoppingCartContext } from "../../../../util/components/Context/ShoppingCartContext"
import { useAlertContext } from "../../../../util/components/Context/AlertContext"
import { useState } from "react"
import fetchData from "../../../../util/functions/fetchData"

export default function BuySection({game}){
    const {userInfo}=useUserContext()
    const {setShoppingCart}=useShoppingCartContext()
    const {setAlert}=useAlertContext()
    const [isLoading,setIsLoading]=useState(false)
    const {setIsSlideIn}=useShoppingCartContext()

    function successAddCartCb(result){
        setShoppingCart(result.newCart)
        game.inCart=true
        setAlert('success','Item successfully added to cart')
    }

    function failAddCartCb(err){
        setAlert('fail',err.system)
    }

    async function addToCart(){
        console.log(game)
        setIsLoading(true)
        const accessToken=localStorage.getItem('accesstoken')
        await fetchData({
            url:'/api/shoppingcart/',
            config:{
                headers:{ authorization: 'Bearer '+ accessToken, 'Content-type':"application/json"},
                method:'POST',
                body:JSON.stringify({
                    gameId:game._id,
                    title:game.title,
                    price:game.price,
                    thumbnailImageSrc:game.images.thumbnailImage.src,
                    thumbnailImageName:game.images.thumbnailImage.name
                })
            }
        },successAddCartCb,failAddCartCb,true)
        setIsLoading(false)
    }
    return(
        <>
            {(()=>{
                if(game.isCreator){
                    return(<>
                        <p className="text-text-white text-xl text-bold">You are the developer of this game</p>
                        <div className="flex items-center gap-2 bg-black p-2 py-1 rounded max-w-[160px] self-end">
                            <button className={`p-2 bg-dark-green/90 hover:bg-dark-green text-text-white rounded ${isLoading?'bg-black/50 cursor-normal':''}`} disabled={isLoading}><Link to={`/devboard/devgame/${game._id}/editgame`}>Edit game</Link></button>
                        </div>
                    </>)
                }
                if(userInfo.userType!=='customer'){
                    return(
                        <>
                            <p className="text-text-white text-xl text-bold">Please login to a customer account to buy this game</p>
                            <div className="flex items-center gap-2 bg-black p-2 py-1 rounded max-w-[160px] self-end">
                                <button className={`p-2 bg-dark-green/90 hover:bg-dark-green text-text-white rounded ${isLoading?'bg-black/50 cursor-normal':''}`} disabled={isLoading}><Link to={'/login/customer'}>Login</Link></button>
                            </div>
                        </>
                    )
                }
                if(game.isOwned){
                    return(<>
                        <p className="text-text-white text-xl text-bold">This game is already in your library</p>
                        <div className="flex items-center gap-2 bg-black p-2 py-1 rounded max-w-[160px] self-end">
                            <button className={`p-2 bg-dark-green/90 hover:bg-dark-green text-text-white rounded ${isLoading?'bg-black/50 cursor-normal':''}`} disabled={isLoading}><Link to={`/library`}>Library</Link></button>
                        </div>
                        
                    </>)
                }
                if(game.inCart){
                    return(<>
                        <p className="text-text-white text-xl text-bold">This game is already in your cart</p>
                        <div className="flex items-center gap-2 bg-black p-2 py-1 rounded max-w-[160px] self-end">
                            <button className={`p-2 bg-dark-green/90 hover:bg-dark-green text-text-white rounded ${isLoading?'bg-black/50 cursor-normal':''}`} onClick={()=>setIsSlideIn(true)} disabled={isLoading}>Check cart</button>
                        </div>
                        
                    </>)
                }
                else{
                    return(
                        <>
                            <p className="text-text-white text-xl text-bold">Buy {game.title}</p>
                            <div className="flex items-center gap-2 bg-black p-2 py-1 rounded max-w-[160px] self-end">
                                <p className="text-text-white">{game.price===0?'Free':game.price}$</p>
                                <button className={`p-2 bg-dark-green/90 hover:bg-dark-green text-text-white rounded ${isLoading?'bg-black/50 cursor-normal':''}`} disabled={isLoading} onClick={()=>addToCart()}>Add to cart</button>
                            </div>
                        </>
                    )
                }
            })()}
        </>
    )

}