import mongoose from "mongoose";
import { gameModel } from "../models/gameModel.js";
import { libraryModel } from "../models/librarayModel.js";

async function homepageController(req,res){
    try{
        const result=await gameModel.aggregate([
            {
                '$match':{isPublished:true}
            },
            {
                '$project':{
                    title:1,
                    price:1,
                    averageRating:1,
                    genres:1,
                    images:{
                        thumbnailImage:'$images.thumbnailImage',
                        carouselImages:{$slice:['$images.carouselImages',2]}
                    },
                    createdAt:1,
                    copiesSold:1,
                }
            },
            {
                '$facet':{
                    mostPopular:[
                        {'$sort':{'averageRating':-1,'copiesSold':-1,}},
                        {'$limit':6},
                    ],
                    populargenres:[
                        {'$unwind':'$genres'},
                        {'$group':{
                            _id:'$genres',
                            count:{'$count':{}},
                            games:{'$push':{ averageRating:'$averageRating', thumbnailImage:'$images.thumbnailImage' }}
                        }},
                        {'$sort':{ count:-1 }},
                        {'$limit':6},
                        {'$project':{
                            _id:1,
                            images:{
                                '$firstN':{
                                    n:3,
                                    input:{
                                        '$sortArray':{
                                            input:'$games',
                                            sortBy:{
                                                averageRating:-1
                                            }
                                        }
                                    }
                                }
                            }
                        }}
                    ],
                    newest:[
                        {'$sort':{createdAt:-1}},
                        {'$limit':12}
                    ]
                }
            },
        ])
    
        res.json({
            successful:true,
            result:result[0]
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({successful:false,err:{system:'Something is wrong with the server'}})
    }
}

async function recommendedGames(req,res){
    try{
        const userId=new mongoose.Types.ObjectId(req.params.id)
        const page=parseInt(req.query.page)||0

        const filterOptions =await libraryModel.aggregate([
            {
                '$match':{ customerId:userId }
            },
            {
                '$project':{
                    _id:0,
                    productId:1
                }
            },
            {
                '$facet':{
                    gameId:[
                        {
                            '$group':{
                                _id:null,
                                arr:{'$push':'$productId'}
                            }
                        }
                    ],
                    genreList:[
                        {
                            '$lookup':{
                                from:'games',
                                localField:'productId',
                                foreignField:'_id',
                                as:'game'
                            }
                        },
                        {
                            '$unwind': '$game'
                        },
                        {
                            '$unwind':'$game.genres'
                        },
                        {
                            '$group':{
                                _id:'$game.genres',
                                count:{'$count':{}},
                            }
                        },
                        {
                            '$group':{
                                _id:null,
                                arr:{'$topN':{
                                    output:'$_id',
                                    sortBy:{ "count": 1 },
                                    n:5
                                }}
                            }
                        }
                    ]
                }
            },
        ])

        const gameFilterAggregationPipeLine=[
            {'$match':{ _id:{'$nin':(filterOptions[0].gameId.length>0)?filterOptions[0].gameId[0].arr:[]}, isPublished:true }},
            { 
                '$project':{
                    title:1,
                    price:1,
                    averageRating:1,
                    genres:1,
                    images:{
                        thumbnailImage:'$images.thumbnailImage',
                        carouselImages:{$slice:['$images.carouselImages',2]}
                    },
                }
            },
        ]

        const genreFilter={
            branches:[],
            default:0
        }

        if(filterOptions[0].genreList.length>0){
            filterOptions[0].genreList[0].arr.forEach((genre,i)=>{
                genreFilter.branches.push({ case:{ '$eq':['$$genre',genre] }, then:i+1 })
            })

            gameFilterAggregationPipeLine.push({
                '$addFields':{
                    priority:{
                        '$sum':{
                            '$map':{
                                input:'$genres',
                                as:'genre',
                                in:{
                                    '$switch': genreFilter
                                }
                            }
                        }
                    }
                }
            })

            gameFilterAggregationPipeLine.push(
                {
                    '$sort':{
                        priority:-1
                    }
                },
            )
        }

        if(filterOptions[0].genreList.length===0) gameFilterAggregationPipeLine.push({
            '$sort':{ averageRating:-1 }
        })
        

        gameFilterAggregationPipeLine.push({
            '$skip':page*10
        })

        gameFilterAggregationPipeLine.push({
            '$limit':10
        })

        gameFilterAggregationPipeLine.push({
            '$unset':'priority'
        })


        const result=await gameModel.aggregate(gameFilterAggregationPipeLine)

        res.json({successful:true,result})
    }
    catch(err){
        console.log(err)
        res.status(500).json({successful:false,err:{system:'Something is wrong with the server'}})
    }
}

export {homepageController,recommendedGames}