import { useEffect, useState } from "react"
import useStrInputs from "../../util/hooks/useStrInputs"
import {useUserContext} from "../../util/components/Context/userContex"
import LoadingSpinner from "../../util/components/LoadingSpinner"
import ThumbnailImage from "./CRUD game form/ThumbnailImg"
import GameInfo from "./CRUD game form/GameInfo"
import { AddImgCarousel } from "./CRUD game form/Carousel/AddImgCarousel"
import useImgFiles from "../../util/hooks/useImgFiles"
import usePrevious from "../../util/hooks/usePrevious"
import { useParams } from "react-router-dom"
import { useAlertContext } from "../../util/components/Context/AlertContext"
import fetchData from "../../util/functions/fetchData"



export default function EditGamePage(){
    const {gameId}=useParams()
    const [strInputs,setStrInput,changeStrInputs]=useStrInputs({title:'',price:0,genres:'',desc:''})
    const [isPublished,setIsPublished]=useState(true)
    const prevStrInputs=usePrevious(strInputs)
    const [errorMess,setStrErrMess]=useState({title:'',price:'',genres:'',desc:'',thumbnailImage:'',carouselImages:'',system:''})
    const [genreList,setGenreList]=useState([])
    const [carouselImages,setCarouselImages,handleUploadImg,deletedCarouselImagesFiles,setDeletedCarouselImagesFiles,deleteUploadImg,changeUploadImg]=useImgFiles(8)
    const [thumbnailImage,setThumbnailImg,handleUploadThumbnailImg,deletedThumbnailImage,setDeletedThumbnailImage,deleteThumbnailImage,changeThumbnailImage]=useImgFiles(1)
    const [isSubmitting,setIsSubmitting]=useState(false)
    const [isFetching,setIsFetching]=useState(false)
    const {userInfo}=useUserContext()
    const {setAlert}=useAlertContext()

    function successEditCb(result){
        setAlert('success','Successfully edited game')
        const game=result.game
        changeStrInputs({
            title:game.title,
            genres:'',
            price:game.price,
            desc:game.desc
        })
        setIsPublished(result.isPublished)
        setGenreList(game.genres)
        setThumbnailImg([game.images.thumbnailImage])
        setCarouselImages(game.images.carouselImages)
        setDeletedCarouselImagesFiles([])
        setDeletedThumbnailImage([])
    }

    function failEditCb(err){
        setStrErrMess(oldErrorMess=>{
            for (const error in err){
                oldErrorMess[error]=err[error]
            }
            
            return oldErrorMess
        })
    }

    async function handleSubmit(e){
        e.preventDefault()
        setIsSubmitting(true)
        await submitInputToServer()
        setIsSubmitting(false)
    }

    async function submitInputToServer(){
        const form=new FormData()
        form.append('title',strInputs.title)
        form.append('dev',userInfo.name)
        form.append('price',strInputs.price)
        form.append('genres',JSON.stringify(genreList))
        form.append('desc',strInputs.desc)
        form.append('isPublished',isPublished)
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
        //All the file that got replaced or deleted will be put into an array so that the server can know what to delete
        form.append('deletedThumbnailImages',JSON.stringify(deletedThumbnailImage))
        
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
        form.append('deletedCarouselImages',JSON.stringify(deletedCarouselImagesFiles))
        const accessToken=localStorage.getItem('accesstoken')

        await fetchData({
            url:`/api/devboard/editgame/${gameId}`,
            config:{
                headers:{ authorization: 'Bearer '+ accessToken} ,
                method:'PUT',
                body: form
            }
        },successEditCb,failEditCb,true)
    }

    function successGetEditCb(result){
        const game=result.game
        changeStrInputs({
            title:game.title,
            genres:'',
            price:game.price,
            desc:game.desc
        })
        setIsPublished(result.game.isPublished)
        setGenreList(game.genres)
        setThumbnailImg([game.images.thumbnailImage])
        setCarouselImages(game.images.carouselImages)
    }

    function failGetEditCb(err){
        setAlert('fail',err.system)
    }

    useEffect(()=>{
        setIsFetching(true)
        const accessToken=localStorage.getItem('accesstoken')

        fetchData({
            url:`/api/devboard/editgame/${gameId}`,
            config:{
                credentials: 'include',
                withCredntials: true,
                headers:{ authorization: 'Bearer '+ accessToken} ,
            }
        },successGetEditCb,failGetEditCb,true)
        .finally(()=>setIsFetching(false))
    },[])

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
        <>
            {isFetching?
                <LoadingSpinner/>:
                <form className="max-w-[850px] relative m-auto p-6" onSubmit={handleSubmit}>
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
                        <div className="flex gap-2">
                            <label className="text-very-bright-blue" htmlFor="isPublished">Published: </label>
                            <input type="checkbox" id="isPublished" name="isPublished" value="isPublished" checked={isPublished} onChange={()=>setIsPublished(!isPublished)}></input>
                        </div>
                        <input disabled={isSubmitting} type="submit" className={`p-2 ${isSubmitting?'opacity-50 cursor-auto':''} bg-bright-blue text-text-white cursor-pointer`} value={'Edit game'}/>
                        <p>{errorMess.system}</p>
                    </div>
                    <div className={`absolute top-0 left-0 bg-neutral-gray/60 w-full h-full flex justify-center items-center ${isSubmitting?'z-[8]':'hidden'}`}>
                        {isSubmitting?<LoadingSpinner></LoadingSpinner>:<></>}
                    </div>
                </form>
            }
        </>
    )
}