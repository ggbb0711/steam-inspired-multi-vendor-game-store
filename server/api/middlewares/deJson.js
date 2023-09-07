export default function deJson(fields){


    return(req,res,next)=>{
        try{
            for (const field of fields){
                req.body[field]=JSON.parse(req.body[field])
            }
    
            next()
        }
        catch(err){
            res.status(500).json({successful:false,system:'Something went wrong with the payload'})
        }

    }

}