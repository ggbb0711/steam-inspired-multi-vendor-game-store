import  express  from "express";
import validate from "../../utils/validate.js";
import { checkSchema } from "express-validator";
import gameSchema from "../../utils/express-validation-schemas/gameSchema.js";
import multer from "multer";
import { fileUploader } from "../../utils/fileUploader.js";


const setGameRouter=express.Router()

setGameRouter.post('/',fileUploader.fields([{name:'uploadThumbnailImage',maxcount:1},{name:'uploadCarouselImages',maxcount:8}]),deJson,validate(checkSchema(gameSchema)),(req,res)=>{
    res.status(200).json({successful:true})
})

function deJson(req,res,next){
    let { genres, carouselImages }=req.body
    req.body.genres=JSON.parse(genres)
    console.log(req.body.carouselImages)
    req.body.carouselImages=JSON.parse(carouselImages)
    console.log(req.body)
    next()
}

export {setGameRouter}