import Jwt from "jsonwebtoken"

export default function createRefreshToken(user,userType){
    return Jwt.sign({...user,userType},process.env.VITE_SECRET_JWTREFRESHTOKEN_KEY,{expiresIn:'48h'})
}