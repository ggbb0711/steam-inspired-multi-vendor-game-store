import mongoose from 'mongoose'

const Schema=mongoose.Schema

const gameSchema=new Schema({
    title:{type:String,require:true},
    desc:{type:String,require:true},
    price:{type:Number,default:0,require:true},
    dev:{type:String,require:true},
    averageRating:{type:Number,default:0},
    genres:[{type:String}],
    isPublished:{type:Boolean,default:false},
    images:{ thumbnailImage:{ src:{type:String,require:true} , name:{type:String,require:true} }, carouselImages:[{ src:{type:String,require:true} , name:{type:String,require:true} }] },
    reviews:{
        totalReview:{ type:Number,default: 0 },
        reviewScore:{
            1:{type:Number,default: 0},
            2:{type:Number,default: 0},
            3:{type:Number,default: 0},
            4:{type:Number,default: 0},
            5:{type:Number,default: 0},
        }
    },
    recentReviews:[{
        reviewId:{type:Schema.Types.ObjectId,ref:'reviews'},
        title:{type:String},
        author:{ authorId:{type:Schema.Types.ObjectId,ref:'customers'}, authorName: {type:String}},
        content:{type:String},
        rating:{type:Number},
        createdAt:{type:Date},
    }],
    totalEarning:{type:Number,default: 0},
    copiesSold:{type:Number,default: 0},
},{
    timestamps: true
})

const gameModel=mongoose.model('game',gameSchema)

export{gameModel}