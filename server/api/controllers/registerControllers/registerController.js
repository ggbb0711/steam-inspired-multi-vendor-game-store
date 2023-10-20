import bcrypt from 'bcrypt'
import { randomBytes } from 'crypto'
import { devModel } from '../../models/devModel.js'
import { customerModel } from '../../models/customerModel.js'
import { tokenModel } from '../../models/tokenModel.js'
import sendMail from '../../../utils/sendMail.js'
import dotenv from 'dotenv'
dotenv.config()

export default async function registerController(req,res){
    const {name,email,password}=req.body
    const userType=req.params.usertype

    let model=(userType==='dev')?devModel:customerModel

    bcrypt.hash(password,10,async (err,hash)=>{
        try{
            const newModel=await model.create({name,email,password:hash})
            const token=randomBytes(127).toString('hex')
            await tokenModel.create({token,userType,accountId:newModel._id})
            const url=`${process.env.BASE_FRONTEND_URL}/verify/${token}`
            sendMail(email,'Email verification',url)
            return res.status(201).json({successful:true,system:'Please check your email for verification'})
        }
        catch(err){
            return res.status(500).json({successful:false,err:{ system:'Cannot create this user' }})
        }
    })
}