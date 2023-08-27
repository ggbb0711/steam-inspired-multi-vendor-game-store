export default function logoutController(req,res,next){
    return res.clearCookie('JWTTOKEN').status(200).json({successful:true,message:'Successfully logged out'})
}