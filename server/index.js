import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {apirouter} from './api/routes/api.js'
import cookieParser from 'cookie-parser'
import { cloudinaryObject } from './utils/cloudinaryObject.js'
import { webhookRouter } from './api/routes/webhook.js'
dotenv.config()



const app=express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    optionsSuccessStatus: 200,
  }))
app.use(express.json({
    limit: '5mb',
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    }
}))
app.use(cookieParser(process.env.SECRET_COOKIE))
app.use(express.urlencoded({ extended: true }))
mongoose.connect(process.env.MONGO_CONNECTION).then(()=>{
  app.use('/api',apirouter)
  app.use('/webhook',webhookRouter)
  
  if(process.env.ENV==='PRODUCTION') app.listen(process.env.API_PORT||8080,process.env.PRODUCTION_HOST,()=>console.log('Server running on '+process.env.PRODUCTION_HOST+':'+process.env.API_PORT))

  else{app.listen(process.env.API_PORT||8080,'localhost',()=>console.log('Server running on '+process.env.PRODUCTION_HOST+':'+process.env.API_PORT))}
})


