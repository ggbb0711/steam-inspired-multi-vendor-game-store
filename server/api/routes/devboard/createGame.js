import  express  from "express";
import validate from "../../../utils/validate.js";
import { checkSchema } from "express-validator";
import gameSchema from "../../../utils/express-validation-schemas/gameSchema.js";
import { fileUploader } from "../../../utils/fileUploader.js";
import deJson from "../../middlewares/deJson.js";
import createGameController from "../../controllers/createGameControllers/createGameController.js";


const createGameRouter=express.Router()

createGameRouter.post('/',fileUploader.fields([{name:'uploadThumbnailImage',maxcount:1},{name:'uploadCarouselImages',maxcount:8}]),deJson(['genres','thumbnailImage','carouselImages']),
    validate(checkSchema(gameSchema)),createGameController)




export {createGameRouter}