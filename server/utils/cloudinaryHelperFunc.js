import { cloudinaryObject } from "./cloudinaryObject.js"

async function uploadToCloudinary(files,width,height){
    let fileResult={}
    for(const file of files){
        let result=await cloudinaryObject.uploader.upload(file.path,{
            width:width,
            height:height,
            public_id:file.filename.split('/')[1]
        })
        fileResult[result.public_id]=result.secure_url
    }
    return fileResult
}

async function deleteFileFromCloudinary(files){
    for(const file of files){
        await cloudinaryObject.uploader.destroy(file.name)
    }
}

export { uploadToCloudinary, deleteFileFromCloudinary }