import Jwt from "jsonwebtoken"

export default function verifyJWTAccessToken(req,res,next){
    const RefreshJWTtoken=req.signedCookies.RefreshJWTtoken
    const accessToken=req.headers.authorization.split(' ')[1]

    if(accessToken&&RefreshJWTtoken){
        Jwt.verify(RefreshJWTtoken,process.env.VITE_SECRET_JWTREFRESHTOKEN_KEY,(err,refreshData)=>{
            if(err){
                return res.status(401).json({successful:false, err:{ system:'RefreshToken is not valid' } })
            }
            else{
                delete refreshData.exp
                delete refreshData.iat
                Jwt.verify(accessToken,process.env.VITE_SECRET_JWTACCESSTOKEN_KEY,(err,accessData)=>{
                    if(err){
                        return res.status(401).json({successful:false,err:{system:'Accesstoken is not valid'}})
                    }
                    else{
                        delete accessData.exp
                        delete accessData.iat
                        if(JSON.stringify(refreshData) !== JSON.stringify(accessData)) return res.status(401).json({successful:false,err:{system:'Refreshtoken and Accesstoken are out of synced'}})
                        req.user={...accessData}
                        return next()
                    }
                })
            }
        })
    }
    else{
        return res.status(401).json({successful:false, err:{ system:'No token found' } })
    }
}