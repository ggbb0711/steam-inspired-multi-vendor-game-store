import  express  from "express";
import verifyController from "../controllers/verifyController.js";


const verifyRouter=express.Router()

verifyRouter.get('/:emailToken',verifyController)

export {verifyRouter}