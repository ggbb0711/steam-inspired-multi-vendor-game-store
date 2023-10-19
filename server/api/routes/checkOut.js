import express from 'express'
import checkOutController from '../controllers/checkOutController.js'
import verifyJWTAccessToken from '../middlewares/verifyJWTAccessToken.js'
import authorizeUserType from '../middlewares/authorizeUserType.js'
import deJson from '../middlewares/deJson.js'
import validate from '../../utils/validate.js'
import { checkSchema } from 'express-validator'
import { checkOutSchema } from '../../utils/express-validation-schemas/checkOutSchema.js'
import { fileUploader } from '../../utils/fileUploader.js'

const checkOutRouter=express.Router()

checkOutRouter.use(verifyJWTAccessToken)
checkOutRouter.use(authorizeUserType('customer'))
checkOutRouter.post('/',fileUploader.none(),deJson(['items']),validate(checkSchema(checkOutSchema)),checkOutController)

export {checkOutRouter}