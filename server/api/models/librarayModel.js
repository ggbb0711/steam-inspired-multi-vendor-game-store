import mongoose from 'mongoose'

const Schema=mongoose.Schema

const librarySchema=new Schema({
    productId:{type:mongoose.Schema.Types.ObjectId,ref:'games'},
    customerId:{type:mongoose.Schema.Types.ObjectId,ref:'customers'}
},{
    timestamps: true
})

const libraryModel=mongoose.model('library',librarySchema)

export{libraryModel}