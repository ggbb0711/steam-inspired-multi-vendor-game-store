import mongoose from 'mongoose'

const Schema=mongoose.Schema

const gameSchema=Schema({
    name:{type:String,require:true},
    desc:{type:String,require:true},
    price:{type:Number},
    dev:{type:String,require:true},
    genres:[{id:{type:mongoose.Schema.Types.ObjectId,ref:'genre'},name:{type:String}}],
    reviews:{totalRating:0,comments:[{id:{type:mongoose.Schema.Types.ObjectId,ref:'comment'}}]},
})

module.exports=mongoose.model('game',gameSchema)