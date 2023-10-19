import { reviewModel } from "../../models/reviewModel.js"

export default async function reviewsController(req,res){
    try{
        const gameId=req.params.gameId

        const reviews=await reviewModel.find({gameId})

        res.json({successful:true,reviews})
    }
    catch(err){
        console.log(err)
        res.status(500).json({successful:false, err:{system:'Something wrong with the server'}})
    }
}