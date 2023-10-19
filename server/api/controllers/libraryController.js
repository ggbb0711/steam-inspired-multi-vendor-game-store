import { libraryModel } from "../models/librarayModel.js"
import mongoose from "mongoose"

export default async function LibraryController(req,res){
        const userId=new mongoose.Types.ObjectId(req.user.userId)
        const page=parseInt(req.query.page)||0
        const limit=parseInt(req.query.limit)||24
        const titleRegex=req.query.titleregex||"(.*?)"
        const titleOption=req.query.titleoption||"i"
        const showOption=req.query.show?req.query.show.split('-'):[]
        const gameAggregateMatchPipeLine={
            '$match':{
                customerId:{'$eq':userId},
            }
        }
        let aggregateShowOption={}
        if(showOption.length>0) aggregateShowOption['$sort']={ ['productDoc.'+showOption[0]]:(showOption[1]==='reverse')?-1:1 }
        
        
        try{
            const searchedGame=await libraryModel.aggregate([
                gameAggregateMatchPipeLine,
                {
                    '$lookup':{
                        from:'games',
                        localField:'productId',
                        foreignField:'_id',
                        as:'productDoc'
                    }
                },
                {
                    '$unwind':'$productDoc'
                },
                {'$match':{'productDoc.title':{"$regex":titleRegex,"$options":titleOption}}},
                aggregateShowOption,
                {
                    '$facet':
                    {
                        games:[
                            {'$skip':limit*page},
                            {'$limit':limit},
                            {'$project':{
                                    'productDoc._id':1,
                                    'productDoc.title':1,
                                    'productDoc.images.thumbnailImage':1,
                                }
                            }
                        ],
                        totalGame:[
                            {'$count':'totalGame'}
                        ]
                    },
                }
            ])
            const games=searchedGame[0].games
            const totalGame=searchedGame[0].totalGame[0]?.totalGame||0
            return res.status(200).json({successful:true,games,totalGame})
        }
        
        catch(err){
            console.log(err)
            return res.status(500).json({successful:false,err:{system:'Something went wrong with the backend: Can\'t get games'}})
        }
}