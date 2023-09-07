import express from 'express'
import yourGameController from '../controllers/yourGameControllers/yourGameControllers'

const yourGameRouter=Express.Router()

yourGameRouter.get('/:devId',yourGameController)

export {yourGameRouter}