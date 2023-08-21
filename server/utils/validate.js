import { validationResult } from "express-validator"

export default function validate(validations){
    return async(req,res,next)=>{
        await Promise.all(validations.map(validation=>validation.run(req)))
        
        const result=validationResult(req)

        let errorMess={}

        //For some reason i keep getting the 'Cannot convert undefined or null to object' error, so i'm going to ignore it for now
        result.errors.forEach(error=>{
            if(!errorMess[error.path]&&error.msg!=='Cannot convert undefined or null to object')errorMess[error.path]=error.msg
        })

        if(Object.keys(errorMess).length===0) return next()
        
        return res.status(400).json({successfull:false,...errorMess})
    }
}