import { gameModel } from "../../models/gameModel.js";
import { uploadToCloudinary } from "../../../utils/cloudinaryHelperFunc.js";



export default async function createGameController (req,res){
    let { title, desc, dev, thumbnailImage, carouselImages}=req.body
    try{
        if(req.files.uploadCarouselImages && req.files.uploadThumbnailImage.length>0){
            let uploadThumbnailImage=await uploadToCloudinary(req.files.uploadThumbnailImage,400,300)
            //Replace the src of the image with the new one from cloudinary
            if(uploadThumbnailImage[thumbnailImage[0].name]) thumbnailImage[0].src=uploadThumbnailImage[thumbnailImage[0].name]
        }
        
        if(req.files.uploadCarouselImages && req.files.uploadCarouselImages.length>0){
            let uploadCarouselImages=await uploadToCloudinary(req.files.uploadCarouselImages,1920,1080)
            carouselImages.forEach((image,imageId)=>{
                //Replace the src of the image with the new one from cloudinary
                if(uploadCarouselImages[image.name]) carouselImages[imageId].src=uploadCarouselImages[image.name]
                console.log(image)
            })
        }
        
        const newGame=await gameModel.create({
            title:title,
            desc:desc,
            // price:{type:Number},
            dev:dev,
            // genres:[{id:{type:mongoose.Schema.Types.ObjectId,ref:'genre'},name:{type:String}}],
            // reviews:{totalRating:0,comments:[{id:{type:mongoose.Schema.Types.ObjectId,ref:'comment'}}]},
            images:{ thumbnailImage:thumbnailImage[0], carouselImages }
        })
        return res.status(200).json({successful:true,game:newGame})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({successful:false,system:'Can\'t create/set game'})
    }
}