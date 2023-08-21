import  mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


const connect=mongoose.createConnection(process.env.MONGO_CONNECTION,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

let gfs

connect.once('open',()=>{
    gfs=new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: 'uploads'
     });
})

exports.module={gfs}