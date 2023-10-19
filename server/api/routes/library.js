import express from 'express'
import LibraryController from '../controllers/libraryController.js'
import verifyJWTAccessToken from '../middlewares/verifyJWTAccessToken.js'
import authorizeUserType from '../middlewares/authorizeUserType.js'

const libraryRouter=express.Router()


libraryRouter.use(verifyJWTAccessToken)
libraryRouter.use(authorizeUserType('customer'))
libraryRouter.get('/',LibraryController)

export {libraryRouter}