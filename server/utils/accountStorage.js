import cloudinary from 'cloudinary'
import { CloudinaryStorage } from "multer-storage-cloudinary";


const accountStorage=new CloudinaryStorage({
    cloudinary:cloudinary.v2,
    params:{
        folder:'Game images',
        use_filename:true,
        unique_filename:false,
        public_id:(req,file)=>{
            return file.originalname.split('.')[0]
        }
    }
})

export{accountStorage}