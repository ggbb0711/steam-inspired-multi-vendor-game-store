import mongoose from "mongoose";

const Schema=mongoose.Schema

const genreSchema=new Schema({
    name:{type:String},
    count:{type:Number}
})

const genreModel=mongoose.model('genre',genreSchema)

export {genreModel}