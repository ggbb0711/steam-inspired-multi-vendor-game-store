import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModel from '../models/devModel.js'
import verifyToken from '../middlewares/verifyToken'
import uploadMedia from '../middlewares/uploadMedia'

const router=express.Router()

router.use(verifyToken)

router.get('/',(req,res)=>{
})

router.post('/uploadGame',uploadMedia,(req,res)=>{
    
})