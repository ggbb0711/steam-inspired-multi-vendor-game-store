import { cloudinaryObject } from "./cloudinaryObject.js"

async function uploadToCloudinary(files,width,height){
    try{
        let fileResult={}
        for(const file of files){
            console.log(file)
            let result=await cloudinaryObject.uploader.upload(file.path,{
                use_filename:true,
                unique_filename:false,
                folder:'Game images',
                width:width,
                height:height,
                public_id:file.filename.split('/')[1]
            })
            fileResult[result.original_filename]=result.secure_url
        }
        return fileResult
    }
    catch(err){
        console.log(err)
    }
}

async function deleteFileFromCloudinary(files){
    try{
        for(const file of files){
            console.log('Delete file:')
            console.log(file)
            await cloudinaryObject.uploader.destroy('Game images/'+file.name)
        }
    }
    catch(err){
        console.log('Delete err:')
        console.log(err)
    }

}

export { uploadToCloudinary, deleteFileFromCloudinary }