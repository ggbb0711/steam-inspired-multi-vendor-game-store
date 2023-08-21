export default function verifyToken(req,res,next){
    const accessToken=req.cookies.token

    if(accessToken){
        jwt.compare(accessToken,'secret',(err,authData)=>{
            if(err){
                return res.sendStatus(403).json({ok:false,message:'Token is not valid'})
            }
            else{
                req.user={...authData}
                next()
            }
        })
        
    }
    else{
        return res.sendStatus(403).json({ok:false,message:'No token found'})
    }
}