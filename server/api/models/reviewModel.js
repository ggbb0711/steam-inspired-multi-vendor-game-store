import mongoose from "mongoose";
import { gameModel } from "./gameModel.js";

const Schema=mongoose.Schema

const reviewSchema=new Schema({
    title:{type:String},
    gameId:{type:Schema.Types.ObjectId,ref:'games'},
    author:{ authorId:{type:Schema.Types.ObjectId,ref:'customers'}, authorName: {type:String}},
    content:{type:String},
    rating:{type:Number}
},{
    timestamps: true
})

reviewSchema.post('save',async(doc)=>{
    const aggregationResult=await reviewModel.aggregate([
        {
            '$match':{gameId:doc.gameId}
        },
        {
            '$group':{
                _id:'$rating',
                quantity:{'$count':{}}
            }
        },
        {
            '$set':{
                numerator:{ '$multiply':['$quantity','$_id'] } ,
            }
        },
        {
            '$group':{
                _id:null,
                denominator:{
                    '$sum':'$quantity'
                },
                numerator:{'$sum':'$numerator'}
            }
        },
        {
            '$set':{
                averageRating:{'$round':[{'$divide':['$numerator','$denominator']},1]}
            }
        }
    ])


    await gameModel.findByIdAndUpdate(doc.gameId,
        {
            '$set':{
                averageRating:aggregationResult[0].averageRating,
            },
            '$push':{
                recentReviews:{
                    '$each':[
                        {
                            reviewId:doc._id,
                            title:doc.title,
                            author:doc.author,
                            content:doc.content,
                            rating:doc.rating,
                            createdAt:doc.createdAt,
                        }
                    ],
                    '$position':0,
                    '$slice':15
                },
            },
            '$inc':{
                'reviews.totalReview':1,
                [`reviews.reviewScore.${doc.rating}`]:1,
            }
        })
})

const reviewModel=mongoose.model('reviews',reviewSchema)

export {reviewModel}