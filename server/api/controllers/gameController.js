import { customerModel } from "../models/customerModel.js"
import { gameModel } from "../models/gameModel.js"
import { libraryModel } from "../models/librarayModel.js"
import { reviewModel } from "../models/reviewModel.js"

export default async function gameController(req,res){
    try{
        const gameId=req.params.gameId
        const devName=req.query.dev
        const customerId=req.query.customerId
    
        let game=await gameModel.findOne({_id:gameId,isPublished:true}).lean().exec()
        if(!game) return res.status(404).json({successful:false,err:{system:'Can\'t find game'}})

        if(devName===game.dev){
            game.isCreator=true
            return res.json({successful:true,game:game})
        }
        
        if(customerId){
            const isOwned=await libraryModel.findOne({customerId,productId:gameId})
            if(isOwned) game.isOwned=true
            const hasReviewed=await reviewModel.findOne({'author.authorId':customerId, gameId:gameId})
            if(hasReviewed) game.hasReviewed=true
            const inCart=await customerModel.findOne({_id:customerId,'cart.game_id':gameId})
            if(inCart) game.inCart=true
            console.log(game)
            return res.json({successful:true,game})
        }
        console.log(game)
        return res.json({successful:true,game})
    }
    catch(err){
        console.log(err)
        res.status(500).json({successful:false,err:{system:'Something is wrong with the server'}})
    }
    
}