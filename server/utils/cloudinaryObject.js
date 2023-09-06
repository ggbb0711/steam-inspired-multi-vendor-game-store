import cloudinary from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()

const cloudinaryObject=cloudinary.v2
cloudinaryObject.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
  secured:true
})

export {cloudinaryObject}