import express from 'express'
import browseGameContoller from '../controllers/browseGameContoller.js'

const browseGameRouter=express.Router()

browseGameRouter.get('/',browseGameContoller)

export {browseGameRouter}