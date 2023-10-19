import { customerModel } from "../../models/customerModel.js"
import { libraryModel } from "../../models/librarayModel.js"

export default async function addCartController(req,res){
    try{
        const customerId=req.user.userId
        const {gameId, title, price, thumbnailImageSrc, thumbnailImageName}=req.body

        const inLibrary=await libraryModel.findOne({
            productId:gameId,
            customerId:customerId
        })

        if(inLibrary) return res.status(400).json({successful:false,err:{system:'This game is already in your library'}})

        const newCart=await customerModel.findOneAndUpdate({
                _id:customerId,
                'cart.game_id':{'$nin':[gameId]}
            },{
            '$push':{
                cart:{
                    game_id:gameId,
                    title:title,
                    price:price,
                    thumbnailImage:{
                        src:thumbnailImageSrc,
                        name:thumbnailImageName
                    }
                }
            }
        },{new:true})
        if(!newCart) return res.status(400).json({successful:false,err:{system:'This game is already in your cart'}})
        return res.json({successful:true,newCart:newCart.cart})
    }
    catch(err){
        console.log(err)
        res.status(500).json({successful:false,err:{system:'Something went wrong with the server'}})
    }
}