import { gameModel } from "../../models/gameModel.js"


export default async function getEditGameController(req,res){
    const gameId=req.params.gameId
    
    try{
        const selectedGame=await gameModel.findById(gameId,'title genres price desc images isPublished dev').exec()
        if(selectedGame.dev!==req.user.userName) return res.status(403).json({successful:false,err:{system:'You cannot access this endpoint with this token'}})
        return res.status(200).json({successful:true,game:selectedGame})
    }
    catch{
        return res.status(500).json({successful:false,err:{system:'Something went wrong with the backend: Can\'t get game info'}})
    }
}