import mongoose from 'mongoose'

const Schema=mongoose.Schema

const tokenSchema=Schema({
    token:{type:String,require:true},
    userType:{type:String,require:true},
    accountId:{type:mongoose.Schema.Types.ObjectId,ref:function(){ return this.userType }},
    expireAt: {
        type: Date,
        default:new Date(Date.now() + (5 * 60 * 1000)),
        index: { expireAfterSeconds: 300 },
    },
})

const tokenModel=mongoose.model('token',tokenSchema)

export { tokenModel }