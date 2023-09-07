import  express  from "express";
import validate from "../../utils/validate.js";
import { checkSchema } from "express-validator";
import gameSchema from "../../utils/express-validation-schemas/gameSchema.js";
import { fileUploader } from "../../utils/fileUploader.js";
import deJson from "../middlewares/deJson.js";
import editGameController from "../controllers/editGameControllers/editGameController.js";
import getEditGameController from "../controllers/editGameControllers/getEditGameController.js";

const editGameRouter=express.Router()

editGameRouter.post('/:gameId',fileUploader.fields([{name:'uploadThumbnailImage',maxcount:1},{name:'uploadCarouselImages',maxcount:8}]),deJson(['genres','thumbnailImage','carouselImages']),
validate(checkSchema(gameSchema)),editGameController)

editGameRouter.get('/:gameId',getEditGameController)



export {editGameRouter}