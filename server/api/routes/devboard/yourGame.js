import express from 'express'
import yourGameController from '../../controllers/yourGameControllers/yourGameControllers.js'

const yourGameRouter=express.Router({ mergeParams: true })

yourGameRouter.get('/',yourGameController)

export {yourGameRouter}