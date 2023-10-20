import { useState } from "react"
import uuid from "react-uuid"

export default function useImgFiles(maxfile){
    const [imgFiles,setImgFiles]=useState([])
    const [deletedFiles,setDeletedFiles]=useState([])

    function handleUploadImg(e){
        let imgArr=[...imgFiles]
        for(let file of e.target.files){
            if(imgArr.length>=maxfile) break
            file=new File([file],`${uuid()}.png`)
            imgArr=[...imgArr,{src:URL.createObjectURL(file),fileObject:file,name:file.name.split('.')[0]}]
        }
        setImgFiles(imgArr)
    }

    function handleDeleteImg(index){
        let clone=[...imgFiles]
        //File that should be deleted on Cloudinary (They don't have the file object property)
        if(!clone[index].fileObject)setDeletedFiles([...deletedFiles,clone[index]])
        clone.splice(index,1)
        setImgFiles(clone)
    }

    function handleChangeImg(index,file){
        let clone=[...imgFiles]
        file=new File([file],`${uuid()}.png`)
        //File that should be deleted on Cloudinary (They don't have the file object property)
        if(!clone[index].fileObject)setDeletedFiles([...deletedFiles,clone[index]])
        clone.splice(index,1,{src:URL.createObjectURL(file),fileObject:file,name:file.name.split('.')[0]})
        setImgFiles(clone)
    }

    return [imgFiles,setImgFiles,handleUploadImg,deletedFiles,setDeletedFiles,handleDeleteImg,handleChangeImg]
}