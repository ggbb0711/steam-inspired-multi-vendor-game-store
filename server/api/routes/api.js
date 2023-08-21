import  express  from "express";
import {register} from "./register.js";
import {login} from "./login.js";
import {verifyRouter} from "./verify.js";


const apirouter=express.Router()

apirouter.use('/register',register)
apirouter.use('/login',login)
apirouter.use('/verify',verifyRouter)

export { apirouter }
