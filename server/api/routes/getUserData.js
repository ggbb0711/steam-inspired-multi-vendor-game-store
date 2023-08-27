import express from 'express'
import getUserDataController from '../controllers/getUserDataController.js'
import verifyJWTAccessToken from '../middlewares/verifyJWTAccessToken.js'

const getUserDataRoute=express.Router()

getUserDataRoute.get('/',verifyJWTAccessToken,getUserDataController)

export {getUserDataRoute}