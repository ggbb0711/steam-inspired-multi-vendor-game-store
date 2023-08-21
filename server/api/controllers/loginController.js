import jwt from 'jsonwebtoken'
import { randomBytes } from 'crypto'
import sendMail from '../../utils/sendMail.js'
import { devModel } from '../models/devModel.js'
import { customerModel } from '../models/customerModel.js'
import { tokenModel } from '../models/tokenModel.js'
import dotenv from 'dotenv'
dotenv.config()

export default async function loginController(req,res){
    const {email}=req.body
    const userType=req.params.usertype

    let model=(userType==='dev')?devModel:customerModel

    try{
        const user=await model.findOne({email}).exec()
        if(user.verified){
            const token=jwt.sign({...user},'secret',{expiresIn:'1d'})
            res.cookie('token',token,{
                httpOnly:true
            }).status(200).json({successfull:true,token,userName:user.name,userId:user._id})
        }
        else{
            const token=randomBytes(127).toString('hex')
            await tokenModel.create({token,userType,accountId:user._id})
            const url=`${process.env.BASE_URL}:${process.env.CLIENT_PORT}/verify/${token}`
            sendMail(email,'Email verification',url)
            res.status(401).json({successfull:false,system:'Please check your email for validation link. We have sent one to yours'})
        }
    }
    catch(err){
        res.status(500).json({successfull:false,system:err})
    }
} 