import  express  from "express";
import {registerRouter} from "./register.js";
import {loginRouter} from "./login.js";
import {verifyRouter} from "./verify.js";
import { refreshTokenRouter } from "./refreshToken.js";
import { getUserDataRoute } from "./getUserData.js";


const apirouter=express.Router()

apirouter.use('/register',registerRouter)
apirouter.use('/login',loginRouter)
apirouter.use('/verify',verifyRouter)
apirouter.use('/refreshtoken',refreshTokenRouter)
apirouter.use('/getuserdata',getUserDataRoute)

export { apirouter }
