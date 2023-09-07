import mongoose from 'mongoose'

const Schema=mongoose.Schema

const gameSchema=Schema({
    title:{type:String,require:true},
    desc:{type:String,require:true},
    price:{type:Number},
    dev:{type:String,require:true},
    genres:[{id:{type:mongoose.Schema.Types.ObjectId,ref:'genre'},name:{type:String}}],
    reviews:{totalRating:{type:Number,default:0},comments:[{id:{type:mongoose.Schema.Types.ObjectId,ref:'comment'}}]},
    images:{ thumbnailImage:{ src:{type:String,require:true} , name:{type:String,require:true} }, carouselImages:[{ src:{type:String,require:true} , name:{type:String,require:true} }] }
})

const gameModel=mongoose.model('game',gameSchema)

export{gameModel}