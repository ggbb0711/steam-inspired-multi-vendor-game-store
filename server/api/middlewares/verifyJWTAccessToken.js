import Jwt from "jsonwebtoken"

export default function verifyJWTAccessToken(req,res,next){
    const accessToken=req.headers.authorization.split(' ')[1]

    if(accessToken){
        Jwt.verify(accessToken,process.env.VITE_SECRET_JWTACCESSTOKEN_KEY,(err,authData)=>{
            if(err){
                return res.status(401).json({successful:false,message:'Accesstoken is not valid'})
            }
            else{
                delete authData.exp
                delete authData.iat
                req.user={...authData}
                return next()
            }
        })
        
    }
    else{
        return res.status(400).json({successful:false,message:'No token found'})
    }
}