import { reviewModel } from "../../models/reviewModel.js"

export default async function postReviewController(req,res){
    try{
        const userId=req.user.userId
        const userName=req.user.userName
        const {title,gameId,content,rating}=req.body

        const newReview=await reviewModel.create({
            title:title,
            gameId:gameId,
            author:{ authorId:userId, authorName: userName},
            content:content,
            rating:Number(rating)
        })

        res.json({successful:true,newReview})
    }
    catch(err){
        console.log(err)
        res.status(500).json({successful:false,err:{ system:'Something wrong with the server' }})
    }
}