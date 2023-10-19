import express from 'express'
import devStatController from '../../controllers/devStatController.js'

const devStatRouter=express.Router()

devStatRouter.get('/',devStatController)

export {devStatRouter}