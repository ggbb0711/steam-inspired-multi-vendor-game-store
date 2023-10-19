import express from 'express'
import verifyJWTAccessToken from '../middlewares/verifyJWTAccessToken.js'
import postReviewController from '../controllers/reviewControllers/postReviewController.js'
import authorizeUserType from '../middlewares/authorizeUserType.js'
import reviewsController from '../controllers/reviewControllers/reviewsController.js'
import validate from '../../utils/validate.js'
import { checkSchema } from 'express-validator'
import { reviewSchema } from '../../utils/express-validation-schemas/reviewSchema.js'

const reviewRouter=express.Router()

reviewRouter.post('/',verifyJWTAccessToken,authorizeUserType('customer'),validate(checkSchema(reviewSchema)),postReviewController)

reviewRouter.get('/:gameId',reviewsController)

export {reviewRouter}