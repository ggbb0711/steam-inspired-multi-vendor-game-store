import mongoose from "mongoose";
import { gameModel } from "./gameModel.js";
import { devModel } from "./devModel.js";
import { libraryModel } from "./librarayModel.js";

const Schema=mongoose.Schema

const receiptSchema=new Schema({
    customerId:{type:mongoose.Schema.Types.ObjectId,ref:'customers'},
    productId:{type:mongoose.Schema.Types.ObjectId,ref:'games'},
    devId:{type:mongoose.Schema.Types.ObjectId,ref:'devs'},
    status:{type:String},
    gateway:{type:String},
    type:{type:String},
    amount:{type:Number},
},{
    timestamps:true
})

receiptSchema.post('save',async(doc)=>{
    await gameModel.findByIdAndUpdate(doc.productId,{
        '$inc':{
            copiesSold:1,
            totalEarning:doc.amount,
        }
    })

    await devModel.findByIdAndUpdate(doc.devId,{
        '$inc':{
            copiesSold:1,
            totalEarning:doc.amount,
        }
    })

    await libraryModel.create({
        customerId:doc.customerId,
        productId:doc.productId,
    })
})

const receiptModel=mongoose.model('receipts',receiptSchema)

export {receiptModel}