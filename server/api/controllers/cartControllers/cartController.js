import { customerModel } from "../../models/customerModel.js"

export default async function cartController(req,res){
    try{
        const customerId=req.params.customerId

        const cart=await customerModel.findById(customerId,'cart')

        if(!cart) res.status(404).json({successful:false,err:{system:'The customer does not exist'}})
        
        res.json({successful:true,cart:cart.cart})
    }
    catch(err){
        console.log(err)
        res.status(500).json({successful:false,err:{system:'Something went wrong with the server'}})
    }
}