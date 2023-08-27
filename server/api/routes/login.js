import express from 'express'
import { checkSchema } from 'express-validator'
import validate from '../../utils/validate.js'
import dotenv from 'dotenv'
import loginSchema from '../../utils/express-validation-schemas/loginSchema.js'
import loginController from '../controllers/loginController.js'
dotenv.config()

const loginRouter=express.Router()

loginRouter.post('/:usertype',validate(checkSchema(loginSchema)),loginController)

export {loginRouter}