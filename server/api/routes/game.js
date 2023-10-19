import express from 'express'
import gameController from '../controllers/gameController.js'

const gameRouter=express.Router()

gameRouter.get('/:gameId',gameController)

export {gameRouter}