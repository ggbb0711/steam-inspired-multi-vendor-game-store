import  express  from "express";
import Stripe from 'stripe'
import { gameModel } from "../models/gameModel.js";
import { receiptModel } from "../models/receiptModel.js";
import { devModel } from "../models/devModel.js";
import { customerModel } from "../models/customerModel.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const webhookRouter=express.Router()

webhookRouter.post('/',async (request, response) => {
    const sig = request.headers['stripe-signature'];
    let event;
  
  
    try {
      event = stripe.webhooks.constructEvent(request.rawBody, sig, process.env.WEBHOOK_SECRET);
    } catch (err) {
      console.log(err)
  
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const metadata=event.data.object.metadata
        const userId=metadata.userId

        let i=0

        while(metadata['item'+i]){
            const gameId=metadata['item'+i]
            const game=await gameModel.findById(gameId,'dev price')
            const dev=await devModel.findOne({name:game.dev})
            const newReceipt=await receiptModel.create({
                customerId:userId,
                productId:gameId,
                devId:dev._id,
                status:'verified',
                type:'credit',
                amount:game.price
            })
            console.log(newReceipt)
            i++
        }

        await customerModel.findByIdAndUpdate(userId,{
            '$set':{
                cart:[]
            }
        })

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    response.send('Payment complished successfully');
  });

export {webhookRouter}