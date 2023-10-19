import express from 'express'
import {homepageController, recommendedGames} from '../controllers/homepageController.js'

const homePageRouter=express.Router()

homePageRouter.get('/',homepageController)

homePageRouter.get('/recommendedgames/:id',recommendedGames)

export {homePageRouter}