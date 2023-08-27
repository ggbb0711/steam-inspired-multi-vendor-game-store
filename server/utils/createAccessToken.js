import Jwt from "jsonwebtoken"

export default function createAccessToken(user,userType){
    return Jwt.sign({...user,userType},process.env.VITE_SECRET_JWTACCESSTOKEN_KEY,{expiresIn:'1h'})
}