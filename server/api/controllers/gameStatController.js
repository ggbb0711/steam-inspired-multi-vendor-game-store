import { receiptModel } from "../models/receiptModel.js"
import { gameModel } from "../models/gameModel.js"
import mongoose from "mongoose"

export default async function gameStatController(req,res){
    const gameId=new mongoose.Types.ObjectId(req.params.gameId)
    
    try{
        const selectedGame=await gameModel.findById(gameId,'title dev images.thumbnailImage reviews averageRating recentReviews totalEarning copiesSold')
        if(selectedGame.dev!==req.user.userName) return res.status(403).json({successful:false,err:{system:'You cannot access this endpoint with this token'}})
        
        const currDate=new Date()
        const lastSixMonth=new Date()
        lastSixMonth.setDate(1)
        lastSixMonth.setMonth(currDate.getMonth()-5)
        console.log(lastSixMonth)
        const lastSixMonthData=await receiptModel.aggregate([
            {
                '$match':{
                    productId:gameId,
                    createdAt:{'$gte':new Date(lastSixMonth),'$lte':new Date(currDate)}
                }
            },
            {
                '$project':{
                    createdAt:1,
                    monthDate:{'$month':'$createdAt'},
                    yearDate:{'$year':'$createdAt'}
                }
            },
            {
                '$group':{
                    _id:{
                        month:'$monthDate',
                        year:'$yearDate'
                    },
                    copiesSold:{'$count':{}}
                }
            },
        ])

        return res.status(200).json({successful:true,game:selectedGame,lastSixMonthData})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({successful:false,err:{system:'Something went wrong with the backend: Can\'t get game info'}})
    }
}