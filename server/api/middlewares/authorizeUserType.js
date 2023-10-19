export default function authorizeUserType(userType){
    
    return(req,res,next)=>{
        console.log(req.user.userType)
        if(req.user.userType===userType) return next()

        res.status(403).json({successful:false,err:{system:'Your user type is not permitted here'}})
    }
}