import { gameModel } from "../models/gameModel.js"
import { receiptModel } from "../models/receiptModel.js"
import { devModel } from "../models/devModel.js"
import mongoose from "mongoose"


export default async function devStatController(req,res){
    try{
        const devId=new mongoose.Types.ObjectId(req.user.userId)
        const dev=req.user.userName
    
        const devInfo=await devModel.findById(devId,'name totalEarning copiesSold')
    
        const currDate=new Date()
        const lastSixMonth=new Date()
        lastSixMonth.setDate(1)
        lastSixMonth.setMonth(currDate.getMonth()-5)
        const lastSixMonthData=await receiptModel.aggregate([
            {
                '$match':{
                    devId:devId,
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
    
        const bestSeller=await gameModel.find({
            dev:dev,
            copiesSold:{'$gte':1},
        },{
            title:1,
            'images.thumbnailImage':1,
            copiesSold:1
        })
        .sort({
            copiesSold:-1
        })
        .limit(2)

        res.status(200).json({successful:true,devInfo,lastSixMonthData,bestSeller})
    }
    catch(err){
        console.log(err)
        res.status(500).json({successful:false,err:{system:'Something is wrong with the server'}})
    }
    
}