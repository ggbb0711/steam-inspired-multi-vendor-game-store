import mongoose from 'mongoose'

const Schema=mongoose.Schema

const devSchema=Schema({
    name:{type:String,require:true,unique:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    verified:{type:Boolean,default:false},
})

const devModel=mongoose.model('dev',devSchema)

export { devModel }