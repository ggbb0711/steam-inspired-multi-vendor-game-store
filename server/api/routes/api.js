import  express  from "express";
import {registerRouter} from "./register.js";
import {loginRouter} from "./login.js";
import {verifyRouter} from "./verify.js";
import { refreshTokenRouter } from "./refreshToken.js";
import { getUserDataRoute } from "./getUserData.js";
import { createGameRouter } from "./createGame.js";
import editGameController from "../controllers/editGameControllers/editGameController.js";
import yourGameController from "../controllers/yourGameControllers/yourGameControllers.js";


const apirouter=express.Router()

apirouter.use('/register',registerRouter)
apirouter.use('/login',loginRouter)
apirouter.use('/verify',verifyRouter)
apirouter.use('/refreshtoken',refreshTokenRouter)
apirouter.use('/getuserdata',getUserDataRoute)
apirouter.use('/creategame',createGameRouter)
apirouter.use('/editgame',editGameController)
apirouter.use('/yourgame',yourGameController)

export { apirouter }
