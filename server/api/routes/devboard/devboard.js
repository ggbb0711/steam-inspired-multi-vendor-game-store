import  express  from "express";
import verifyJWTAccessToken from "../../middlewares/verifyJWTAccessToken.js";
import { createGameRouter } from "./createGame.js";
import { editGameRouter } from "./editGame.js";
import { yourGameRouter } from "./yourGame.js";
import authorizeUserType from "../../middlewares/authorizeUserType.js";
import { devStatRouter } from "./devStat.js";
import { gameStatRouter } from "./gameStat.js";

const devBoardRouter=express.Router()

devBoardRouter.use(verifyJWTAccessToken)
devBoardRouter.use(authorizeUserType('dev'))
devBoardRouter.use('/creategame',createGameRouter)
devBoardRouter.use('/editgame',editGameRouter)
devBoardRouter.use('/yourgame',yourGameRouter)
devBoardRouter.use('/',devStatRouter)
devBoardRouter.use('/gamestat',gameStatRouter)

export {devBoardRouter}