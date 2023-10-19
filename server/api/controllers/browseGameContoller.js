import { gameModel } from "../models/gameModel.js"


export default async function browseGameContoller(req,res){
    const page=parseInt(req.query.page)||0
    const titleRegex=req.query.titleregex||"(.*?)"
    const titleOption=req.query.titleoption||"i"
    const genres=req.query.genres?req.query.genres.split(','):[]
    const showOption=req.query.show?req.query.show.split('-'):['title']


    const gameFilter={'$and':[{title:{"$regex":titleRegex,"$options":titleOption},isPublished:true}]}

    genres.forEach(genre => {
      gameFilter['$and'].push({genres:{'$in':[genre]}})  
    })

    const result=await gameModel.find(gameFilter,{
        title:1,
        price:1,
        genres:1,
        'images.thumbnailImage':1
    })
    .sort({[showOption[0]]:(showOption[1]==='reverse')?-1:1})
    .skip(page*24)
    .limit(24)


    res.status(200).json({successful:true,result})
}