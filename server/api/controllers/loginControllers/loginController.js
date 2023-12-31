import  Jwt  from 'jsonwebtoken'
import { randomBytes } from 'crypto'
import sendMail from '../../../utils/sendMail.js'
import { devModel } from '../../models/devModel.js'
import { customerModel } from '../../models/customerModel.js'
import { tokenModel } from '../../models/tokenModel.js'
import dotenv from 'dotenv'
import createRefreshToken from '../../../utils/createRefreshToken.js'
import createAccessToken from '../../../utils/createAccessToken.js'
dotenv.config()

export default async function loginController(req,res){
    const {email}=req.body
    const userType=req.params.usertype

    let model=(userType==='dev')?devModel:customerModel

    try{
        const user=await model.findOne({email}).exec()
        if(user.verified){
            const refreshToken=createRefreshToken({userName:user.name,email:user.email,userId:user._id},userType)
            const accessToken=createAccessToken({userName:user.name,email:user.email,userId:user._id},userType)
            return res.cookie('RefreshJWTtoken',refreshToken,{
                maxAge: 1000*60*60*48,
                sameSite: 'none',
                secure:true,
                httpOnly:true,
                signed: true,
            }).status(200).json({successful:true,accessToken,userName:user.name,userId:user._id})
        }
        else{
            //Create email token and send it to the user email for verification
            const token=randomBytes(127).toString('hex')
            await tokenModel.create({token,userType,accountId:user._id})
            const url=`${process.env.BASE_FRONTEND_URL}/verify/${token}`
            sendMail(email,'Email verification',url)
            return res.status(401).json({successful:false, err:{ system:'Please check your email for validation link. We have sent one to yours' } })
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json({successful:false,err:{ system:'Something went wrong in the server, can\'t log in' }})
    }
} 