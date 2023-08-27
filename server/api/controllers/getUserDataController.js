

export default function getUserDataController(req,res){
    return res.status(200).json({successful:true,user:req.user})
}