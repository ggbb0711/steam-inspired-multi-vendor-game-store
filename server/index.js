import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {apirouter} from './api/routes/api.js'
import cookieParser from 'cookie-parser'
import { cloudinaryObject } from './utils/cloudinaryObject.js'
dotenv.config()


const app=express()


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    optionsSuccessStatus: 200,
  }))
app.use(express.json())
app.use(cookieParser(process.env.SECRET_COOKIE))
mongoose.connect(process.env.MONGO_CONNECTION)


app.use('/api',apirouter)


app.listen(8080,'localhost')