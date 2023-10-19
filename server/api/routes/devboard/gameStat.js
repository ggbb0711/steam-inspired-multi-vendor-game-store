import express from 'express'
import gameStatController from '../../controllers/gameStatController.js'


const gameStatRouter=express.Router()

gameStatRouter.get('/:gameId',gameStatController)

export {gameStatRouter}