import mongoose from 'mongoose'

const Schema=mongoose.Schema

const gameSchema=Schema({
    name:{type:String,require:true},
    desc:{type:String,require:true},
    genres:[{id:{type:mongoose.Schema.Types.ObjectId,ref:'genre'},name:{type:String}}],
    prices:{type:Number},
    reviews:{totalRating:0,comments:[{id:{type:mongoose.Schema.Types.ObjectId,ref:'comment'}}]},
    wishlist:[{id:{type:mongoose.Schema.Types.ObjectId,ref:'user'}}],
    dev:[{id:{type:mongoose.Schema.Types.ObjectId,ref:'dev'}}]
})

module.exports=mongoose.model('game',gameSchema)