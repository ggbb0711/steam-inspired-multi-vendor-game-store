import { customerModel } from "../../models/customerModel.js"

export default async function deleteCartController(req,res){
    try{
        const customerId=req.user.userId
        const gameId=req.params.gameId

        const newCart=await customerModel.findByIdAndUpdate(customerId,{
            '$pull':{
                cart:{
                    game_id:gameId
                }
            }
        },{new:true})

        res.status(200).json({successful:true,newCart:newCart.cart})
    }
    catch(err){
        console.log(err)
        res.status(500).json({successful:false,err:{system:'Something went wrong with the server'}})
    }
}