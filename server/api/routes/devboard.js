import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModel from '../models/devModel.js'
import uploadMedia from '../middlewares/uploadMedia'
import verifyJWTAccessToken from '../middlewares/verifyJWTAccessToken.js'
import logoutController from '../controllers/logoutController.js'

const devBoardRouter=express.Router()



devBoardRouter.post('/uploadGame',verifyJWTAccessToken,uploadMedia,(req,res)=>{
    
})

devBoardRouter.get('/logout',verifyJWTAccessToken,logoutController)