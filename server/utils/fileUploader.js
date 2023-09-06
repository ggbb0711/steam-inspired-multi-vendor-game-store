import multer from "multer"
import path from 'path'
import { accountStorage } from "./accountStorage.js"


const fileUploader=new multer({
    storage:accountStorage,
    fileFilter:(req,file,cb)=>{
        const ext=path.extname(file.originalname)
        if(ext !== '.png' && ext !== '.jpg' && ext !=='jpeg') {
            console.log(file)
            return cb(new Error('Only images are allowed'))
        }
        cb(null,true)
    }
})

export {fileUploader}