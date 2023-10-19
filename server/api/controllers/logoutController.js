export default function logoutController(req,res){
    return res.clearCookie('RefreshJWTtoken').status(200).json({successful:true})
}