import express from 'express'
import logoutController from '../controllers/logoutController.js'

const logoutRouter=express.Router()

logoutRouter.get('/',logoutController)

export {logoutRouter}