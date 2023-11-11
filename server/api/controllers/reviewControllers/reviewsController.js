import { gameModel } from "../../models/gameModel.js"
import { reviewModel } from "../../models/reviewModel.js"

export default async function reviewsController(req,res){
    try{
        const gameId=req.params.gameId
        const page=parseInt(req.query.page)||0

        if(page>0){
            const reviews= await reviewModel.find({gameId}).skip(page*25).limit(25)
            return res.json({successful:true,reviews})
        }

        const gameQuery= gameModel.findById(gameId,'title images.thumbnailImage')
        const reviewsQuery= reviewModel.find({gameId}).skip(page*25).limit(25)

        const [game,reviews]=await Promise.all([gameQuery,reviewsQuery])


        return res.json({successful:true,reviews,game})
    }
    catch(err){
        console.log(err)
        res.status(500).json({successful:false, err:{system:'Something wrong with the server'}})
    }
}