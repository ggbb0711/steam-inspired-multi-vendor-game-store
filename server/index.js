import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {apirouter} from './api/routes/api.js'
import cookieParser from 'cookie-parser'
dotenv.config()

const app=express()


app.use(cors())
app.use(express.json())
app.use(cookieParser())
mongoose.connect(process.env.MONGO_CONNECTION)
// const connect=mongoose.createConnection(process.env.MONGO_CONNECTION,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })

// let gfs

// connect.once('open',()=>{
//     gfs=new mongoose.mongo.GridFSBucket(connect.db, {
//         bucketName: 'uploads'
//      });
// })

app.use('/api',apirouter)


app.listen(8080,'localhost')