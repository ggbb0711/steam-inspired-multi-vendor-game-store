import express from 'express'
import refreshTokenController from '../controllers/refreshTokenController.js'
import cookieParser from 'cookie-parser'

const refreshTokenRouter=express.Router()

refreshTokenRouter.get('/',cookieParser(process.env.SECRET_COOKIE),refreshTokenController)

export {refreshTokenRouter}