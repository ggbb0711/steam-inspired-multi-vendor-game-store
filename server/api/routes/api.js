import  express  from "express";
import {registerRouter} from "./register.js";
import {loginRouter} from "./login.js";
import {verifyRouter} from "./verify.js";
import { getUserDataRoute } from "./getUserData.js";
import { devBoardRouter } from "./devboard/devboard.js";
import cookieParser from "cookie-parser";
import refreshTokenController from "../controllers/refreshTokenController.js";
import { homePageRouter } from "./homePage.js";
import { browseGameRouter } from "./browseGame.js";
import { gameRouter } from "./game.js";
import { reviewRouter } from "./review.js";
import { logoutRouter } from "./logout.js";
import { shoppingCartRouter } from "./shoppingCart.js";
import { libraryRouter } from "./library.js";
import { checkOutRouter } from "./checkOut.js";


const apirouter=express.Router()

apirouter.use('/register',registerRouter)
apirouter.use('/login',loginRouter)
apirouter.use('/verify',verifyRouter)
apirouter.use('/getuserdata',getUserDataRoute)
apirouter.use('/refreshtoken',cookieParser(process.env.SECRET_COOKIE),refreshTokenController)
apirouter.use('/devboard',devBoardRouter)
apirouter.use('/homePage',homePageRouter)
apirouter.use('/browsegame',browseGameRouter)
apirouter.use('/game',gameRouter)
apirouter.use('/review',reviewRouter)
apirouter.use('/logout',logoutRouter)
apirouter.use('/shoppingcart',shoppingCartRouter)
apirouter.use('/library',libraryRouter)
apirouter.use('/checkout',checkOutRouter)


export { apirouter }
