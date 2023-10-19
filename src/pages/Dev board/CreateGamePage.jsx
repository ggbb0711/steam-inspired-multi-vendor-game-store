import { useEffect, useState } from "react"
import useStrInputs from "../../util/hooks/useStrInputs"
import {useUserContext} from "../../util/components/Context/userContex"
import LoadingSpinner from "../../util/components/LoadingSpinner"
import ThumbnailImage from "./CRUD game form/ThumbnailImg"
import GameInfo from "./CRUD game form/GameInfo"
import { AddImgCarousel } from "./CRUD game form/Carousel/AddImgCarousel"
import useImgFiles from "../../util/hooks/useImgFiles"
import usePrevious from "../../util/hooks/usePrevious"
import { useAlertContext } from "../../util/components/Context/AlertContext"
import { useNavigate } from "react-router-dom"
import fetchData from "../../util/functions/fetchData"



export default function CreateGamePage(){
    const [strInputs,setStrInput]=useStrInputs({title:'',price:0,genres:'',desc:''})
    const prevStrInputs=usePrevious(strInputs)
    const [errorMess,setStrErrMess]=useState({title:'',price:'',genres:'',desc:'',thumbnailImage:'',carouselImages:'',system:''})
    const [genreList,setGenreList]=useState([])
    const [carouselImages,,handleUploadImg,,,deleteUploadImg,changeUploadImg]=useImgFiles(8)
    const [thumbnailImage,,handleUploadThumbnailImg,,,deleteThumbnailImage,changeThumbnailImage]=useImgFiles(1)
    const [isLoading,setIsLoading]=useState(false)
    const {userInfo}=useUserContext()
    const {setAlert}=useAlertContext()
    const navigate=useNavigate()

    function successCb(result){
        setAlert('success','Game created successfully')
        navigate('/devboard/dev/yourgames')
    }
    
    function failCb(err){
        setStrErrMess(oldErrorMess=>{
            for (const error in err){
                oldErrorMess[error]=err[error]
            }
            return oldErrorMess
        })
    }

    async function handleSubmit(e){
        e.preventDefault()
        setIsLoading(true)
        await submitInputToServer()
        setIsLoading(false)
    }

    async function submitInputToServer(){
        const form=new FormData()
        form.append('title',strInputs.title)
        form.append('dev',userInfo.name)
        form.append('price',strInputs.price)
        form.append('genres',JSON.stringify(genreList))
        form.append('desc',strInputs.desc)
        if(thumbnailImage.length>0){
            //Image files will be upload with an array that has the name and the src
            form.append('thumbnailImage',JSON.stringify([{name:thumbnailImage[0].name,src:thumbnailImage[0].src}]))
            //All the file with file object are newly uploaded and should be upload to cloudinary
            form.append('uploadThumbnailImage',(thumbnailImage[0].fileObject)?thumbnailImage[0].fileObject:'')
        }
        else{
            form.append('thumbnailImage','[]')
            form.append('uploadThumbnailImage','')
        }
        
        //Do the same thing like thumbnail image
        if(carouselImages.length>0){
            let carouselImagesArr=[]
            for(const img of carouselImages){
                carouselImagesArr=[...carouselImagesArr,{name:img.name,src:img.src}]
                if(img.fileObject) form.append('uploadCarouselImages',img.fileObject)
            }

            form.append('carouselImages',JSON.stringify(carouselImagesArr))
        }
        else{
            form.append('carouselImages','[]')
            form.append('uploadCarouselImages','')
        }

        const accessToken=localStorage.getItem('accesstoken')

        await fetchData({
            url:`/api/devboard/creategame/`,
            config:{
                headers:{ authorization: 'Bearer '+ accessToken} ,
                method:'POST',
                body: form
            }
        },successCb,failCb,true)

    }


    useEffect(()=>{
        for(const input in strInputs){
            if(strInputs[input]!==prevStrInputs[input]) setStrErrMess((prevValue)=>{
                prevValue[input]=''
                return prevValue
            })
        }
    },[strInputs])

    useEffect(()=>{
        setStrErrMess((prevValue)=>({...prevValue,thumbnailImage:''}))
    },[thumbnailImage])

    useEffect(()=>{
        setStrErrMess((prevValue)=>({...prevValue,carouselImages:''}))
    },[carouselImages])

    return(
        <form className="relative max-w-[850px] m-auto p-6" onSubmit={handleSubmit}>
            <div>
                <section className="w-full flex flex-col justify-between items-center flex-wrap gap-3">
                    <div className="w-full relative">
                        <p className="text-bright-blue">Add thubmnail for your game</p>
                        <ThumbnailImage thumbnailImage={thumbnailImage} handleUploadThumbnailImg={handleUploadThumbnailImg} deleteThumbnailImage={deleteThumbnailImage} changeThumbnailImage={changeThumbnailImage}></ThumbnailImage>
                        <p className="text-xs mt-2 text-red-500">{errorMess.thumbnailImage}</p>
                    </div>
                    <div className="w-full">
                        <p className="text-bright-blue">Add images for your game</p>
                        <AddImgCarousel imgArr={carouselImages} maxfile={8} handleUploadImg={handleUploadImg} handleDeleteImg={deleteUploadImg} handleChangeImg={changeUploadImg}/>
                        <p className="text-xs text-red-500">{errorMess.carouselImages}</p>
                    </div>
                </section>
                <section>
                    <GameInfo strInputs={strInputs} setStrInput={setStrInput} setErrMess={setStrErrMess} errorMess={errorMess} genreList={genreList} setGenreList={setGenreList}></GameInfo>
                </section>
            </div>
            <div className="flex flex-col justify-between gap-2">
                <input disabled={isLoading} type="submit" className={`p-2 ${isLoading?'opacity-50 cursor-auto':''} bg-bright-blue text-text-white cursor-pointer`} value={'Create game'}/>
                <p>{errorMess.system}</p>
            </div>
            <div className={`absolute top-0 left-0 bg-neutral-gray/60 w-full h-full flex justify-center items-center ${isLoading?'z-[50]':'hidden'}`}>
                {isLoading?<LoadingSpinner></LoadingSpinner>:<></>}
            </div>

        </form>
    )
}