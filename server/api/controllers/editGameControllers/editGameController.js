import { gameModel } from "../../models/gameModel.js";
import { deleteFileFromCloudinary, uploadToCloudinary } from "../../../utils/cloudinaryHelperFunc.js";



export default async function editGameController (req,res){
    const gameId=req.params.gameId
    let { title, desc, price, genres, isPublished, thumbnailImage, deletedThumbnailImages, carouselImages, deletedCarouselImages}=req.body
    console.log(isPublished)
    try{
        if(req.files.uploadCarouselImages && req.files.uploadThumbnailImage?.length>0){
            let uploadThumbnailImage=await uploadToCloudinary(req.files.uploadThumbnailImage,400,300)
            //Replace the src of the image with the new one from cloudinary
            if(uploadThumbnailImage[thumbnailImage[0].name]) thumbnailImage[0].src=uploadThumbnailImage[thumbnailImage[0].name]
        }
        
        if(req.files.uploadCarouselImages && req.files.uploadCarouselImages.length>0){
            let uploadCarouselImages=await uploadToCloudinary(req.files.uploadCarouselImages,1920,1080)
            carouselImages.forEach((image,imageId)=>{
                //Replace the src of the image with the new one from cloudinary
                if(uploadCarouselImages[image.name]) carouselImages[imageId].src=uploadCarouselImages[image.name]
            })
        }
        await deleteFileFromCloudinary(deletedThumbnailImages)
        await deleteFileFromCloudinary(deletedCarouselImages)
        
        const updatedGame=await gameModel.findByIdAndUpdate(gameId,{
            '$set':{
                title:title,
                desc:desc,
                price:price,
                genres:genres,
                isPublished:(isPublished==='true'),
                // reviews:{totalRating:0,comments:[{id:{type:mongoose.Schema.Types.ObjectId,ref:'comment'}}]},
                images:{ thumbnailImage:thumbnailImage[0], carouselImages }
            }
        },{new:true}).exec()
        return res.status(200).json({successful:true,game:updatedGame})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({successful:false,system:'Can\'t create/set game'})
    }
}