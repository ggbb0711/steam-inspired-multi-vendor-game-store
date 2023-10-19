import express from "express"
import verifyJWTAccessToken from "../middlewares/verifyJWTAccessToken.js"
import authorizeUserType from "../middlewares/authorizeUserType.js"
import addCartController from "../controllers/cartControllers/addCartController.js"
import deleteCartController from "../controllers/cartControllers/deleteCartController.js"
import cartController from "../controllers/cartControllers/cartController.js"

const shoppingCartRouter=express.Router()

shoppingCartRouter.use(verifyJWTAccessToken)
shoppingCartRouter.use(authorizeUserType('customer'))
shoppingCartRouter.get('/:customerId',cartController)
shoppingCartRouter.post('/',addCartController)
shoppingCartRouter.put('/:gameId',deleteCartController)

export {shoppingCartRouter}