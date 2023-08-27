import express from 'express'
import dotenv from 'dotenv'
import validate from '../../utils/validate.js'
import { checkSchema } from 'express-validator'
import registrationSchema from '../../utils/express-validation-schemas/registrationSchema.js'
import registerController from '../controllers/registerController.js'
dotenv.config()

const registerRouter=express.Router()


registerRouter.post('/:usertype',validate(checkSchema(registrationSchema)),registerController)

export {registerRouter} 