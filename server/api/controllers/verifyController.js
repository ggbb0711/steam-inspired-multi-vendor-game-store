import { tokenModel } from "../models/tokenModel.js";
import { devModel } from "../models/devModel.js";
import { customerModel } from "../models/customerModel.js";

export default async function verifyController(req,res){
    const emailToken=req.params.emailToken
    console.log(emailToken)
    try{
        const isEmailToken=await tokenModel.findOne({token:emailToken}).exec()

        if(isEmailToken){
            const model=(isEmailToken.userType==='dev')?devModel:customerModel
            try{
                await model.findByIdAndUpdate(isEmailToken.accountId, {verified:true}).exec()

                res.status(200).json({successfull:true,message:'Email verified successfully'})
            }

            catch(err){
                res.status(500).json({successfull:false,message:'Can\'t update user'})
            }
        }
        else{
            res.status(404).json({successfull:false,message:'Token is not found'})
        }
    }
    catch(err){
        console.log('Error found: ',err)
        res.status(500).json({successfull:false,message:'Something went wrong with the server; can\'t find emailToken'})
    }

} 