import { tokenModel } from "../models/tokenModel.js";
import { devModel } from "../models/devModel.js";
import { customerModel } from "../models/customerModel.js";

export default async function verifyController(req,res){
    const emailToken=req.params.emailToken

    try{
        const isEmailToken=await tokenModel.findOne({token:emailToken}).exec()

        if(isEmailToken){
            const model=(isEmailToken.userType==='dev')?devModel:customerModel
            try{
                await model.findByIdAndUpdate(isEmailToken.accountId, {verified:true}).exec()

                return res.status(200).json({successfull:true,message:'Email verified successfully'})
            }

            catch(err){
                return res.status(500).json({successfull:false, err:{ system:'Can\'t update user' } })
            }
        }
        else{
            return res.status(404).json({successfull:false, err:{ system:'Token is not found' } })
        }
    }
    catch(err){
        console.log('Error found: ',err)
        return res.status(500).json({successfull:false, err:{ system:'Something went wrong with the server; can\'t find emailToken' } })
    }

} 