const multer=require('multer')
const GridStorage=require('multer-gridfs-storage')
const crypto=require('crypto')
const path=require('path')
require('dotenv').config()

const storage= new GridStorage({
    url:process.env.MONGO_CONNECTION,
    file:(req,file)=>{
        return new Promise((resolve,reject)=>{
            crypto.randomBytes(16,(err,buf)=>{
                if(err){
                    return reject(err)
                }
                const fileName=buf.toString('hex')+path.extname(file.originalname)
                resolve({
                    fileName,
                    bucketName:'uploads'
                })
            })
        })
    }
})

const uploadMedia=multer({storage})

export {uploadMedia}