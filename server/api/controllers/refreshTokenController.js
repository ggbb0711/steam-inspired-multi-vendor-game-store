import jwt from "jsonwebtoken"
import createAccessToken from "../../utils/createAccessToken.js"

export default function refreshTokenController(req,res){
    const RefreshJWTtoken=req.signedCookies.RefreshJWTtoken
    console.log(RefreshJWTtoken)

    if(RefreshJWTtoken){
        jwt.verify(RefreshJWTtoken,process.env.VITE_SECRET_JWTREFRESHTOKEN_KEY,(err,authData)=>{
            if(err){
                return res.status(401).json({successful:false, err:{ system:'RefreshToken is not valid' } })
            }
            else{
                delete authData.exp
                delete authData.iat
                const accessToken=createAccessToken(authData,authData.userType)
                return res.status(200).json({successful:true,accessToken})
            }
        })
    }
    else{
        return res.status(400).json({successful:false,err:{ system:'No RefreshToken found' }})
    }
}