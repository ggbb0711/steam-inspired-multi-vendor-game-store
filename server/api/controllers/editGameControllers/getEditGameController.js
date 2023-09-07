import { gameModel } from "../../models/gameModel"


export default function getEditGameController(req,res){
    const gameId=req.query.gameId
    try{
        const selectedGame=gameModel.findById(gameId,'title genres price desc images').exec()
        return res.status(200).json({successful:true,game:selectedGame})
    }
    catch{
        return res.status(500).json({successful:false,err:{system:'Something went wrong with the backend: Can\'t get game info'}})
    }
}