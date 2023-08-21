import express from 'express'
import dotenv from 'dotenv'
import validate from '../../utils/validate.js'
import { checkSchema } from 'express-validator'
import registrationSchema from '../../utils/express-validation-schemas/registrationSchema.js'
import registerController from '../controllers/registerController.js'
dotenv.config()

const register=express.Router()


register.post('/:usertype',validate(checkSchema(registrationSchema)),registerController)

export {register} 