import { gameModel } from "../../models/gameModel.js"



export default async function yourGameController(req,res){
    const page=parseInt(req.query.page)||0
    const limit=parseInt(req.query.limit)||9
    const titleRegex=req.query.titleregex||"(.*?)"
    const titleOption=req.query.titleoption||"i"
    const genres=req.query.genres?req.query.genres.split(','):[]
    const showOption=req.query.show?req.query.show.split('-'):[]
    const gameAggregateMatchPipeLine={
        '$match':{
            '$and':[
                {dev:{'$eq':req.user.userName}},
                {title:{"$regex":titleRegex,"$options":titleOption}},
            ]
        }
    }
    genres.forEach(genre=>gameAggregateMatchPipeLine['$match']['$and'].push({
        genres:{'$in':[genre]}
    }))
    let aggregateShowOption={}
    if(showOption.length>0) aggregateShowOption['$sort']={ [showOption[0]]:(showOption[1]==='reverse')?-1:1 }
    
    
    try{
        const searchedGame=await gameModel.aggregate([
            gameAggregateMatchPipeLine,
            {
                '$facet':
                {
                    games:[
                        aggregateShowOption,
                        {'$skip':limit*page},
                        {'$limit':limit},
                        {'$project':{
                                _id:1,
                                title:1,
                                price:1,
                                genres:1,
                                isPublished:1,
                                'images.thumbnailImage':1
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