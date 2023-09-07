import { gameModel } from "../../models/gameModel.js"



export default async function yourGameController(req,res){
    const devName=req.query.devName

    try{
        const games=gameModel({ dev:devName },{ title:1, _id:1, 'images.thumbnailImage':1}).exec()
        return res.status(200).json({successful:true,games})
    }
    catch{
        return res.status(500).json({successful:false,err:{system:'Something went wrong with the backend: Can\'t get games'}})
    }
}