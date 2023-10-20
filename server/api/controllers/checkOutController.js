import Stripe from 'stripe'
import dotenv from 'dotenv'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
dotenv.config()


export default async function checkOutController(req,res){
  try{
    const {items}=req.body
    const passInItems={}
    const deJsonItems=items.map((item,i)=>{
      const parsedItem=JSON.parse(item)
      passInItems['item'+i]=parsedItem.game_id
      return parsedItem
    })


    const session=await stripe.checkout.sessions.create({ 
        payment_method_types: ["card"], 
        line_items:deJsonItems.map(item=>({ 
            price_data: { 
              currency: "usd", 
              product_data: { 
                name: item.title, 
              }, 
              unit_amount: item.price * 100, 
            }, 
            quantity: 1, 
        })),
        mode: "payment",
        payment_intent_data:{
          metadata:{userId:req.user.userId,...passInItems},
        },
        success_url: `${process.env.BASE_FRONTEND_URL}/success`, 
        cancel_url: `${process.env.BASE_FRONTEND_URL}/cancel`, 
    })
    res.json({url: session.url})
  }
  catch(err){
    console.log(err)
    res.status(500).json({successful:false,err:{system:'Something went wrong with the server'}})
  }
}