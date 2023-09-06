import { useState } from "react"
import useStrInputs from "../util/hooks/useStrInputs"
import {useUserContext} from "./components/userContex"
import LoadingSpinner from "./components/LoadingSpinner"
import { AddImgCarousel,useImgFiles } from "../util/components/Carousel/AddImgCarousel"
import { AiFillFileAdd, AiFillDelete } from "react-icons/ai"
import { CgArrowsExchange } from "react-icons/cg"
import uuid from "react-uuid"


export default function CreateGamePage(){
    const [strInputs,setStrInput]=useStrInputs({title:'',price:0,genres:'',desc:''})
    const [errorMess,setStrErrMess]=useState({title:'',price:'',genres:'',desc:'',system:''})
    const [genreList,setGenreList]=useState([])
    const [imgArr,handleUploadImg,deletedImgArrFiles,deleteUploadImg,changeUploadImg]=useImgFiles(8)
    const [thumbnailImg,setThumbnailImg,deletedThumbnailImg,deleteThumbnailImg,changeThumbnailImg]=useImgFiles(1)
    const [isLoading,setIsLoading]=useState(false)


    async function handleSubmit(e){
        e.preventDefault()
        setIsLoading(true)

        const result=await submitInputToServer()
        if(result.successful){
            console.log('yEAH')
        }
        else{setStrErrMess(oldErrorMess=>{
            for (const error in result){
                oldErrorMess[error]=result[error]
            }
            return oldErrorMess
        })}
        setIsLoading(false)
        return
    }

    async function submitInputToServer(){
        try{
            const form=new FormData()
            form.append('title',strInputs.title)
            form.append('price',strInputs.price)
            form.append('genres',JSON.stringify(genreList))
            form.append('desc',strInputs.desc)
            //Image files will be upload with an array that has the name and the src
            form.append('thumbnailImage',JSON.stringify({name:thumbnailImg[0].name,src:thumbnailImg[0].src}))
            //All the file with file object are newly uploaded and should be upload to cloudinary
            form.append('uploadThumbnailImage',(thumbnailImg[0].fileObject)?thumbnailImg[0].fileObject:'')
            //All the file that got replaced or deleted will be put into an array so that the server can know what to delete
            form.append('deltedThumbnailImages',(deletedThumbnailImg[0])?deleteThumbnailImg[0]:'')
            //Do the same thing like thumbnail image
            let carouselImages=[]
            for(const img of imgArr){
                carouselImages=[...carouselImages,{name:img.name,src:img.src}]
                if(img.fileObject) form.append('uploadCarouselImages',img.fileObject)
            }
            console.log(carouselImages)
            form.append('carouselImages',JSON.stringify(carouselImages))
            if(!form.get('uploadCarouselImages')) form.append('uploadCarouselImages','')
            let deltedCarouselImages=[]
            for(const img of deletedImgArrFiles){
                let deltedCarouselImages=[...deltedCarouselImages,{name:img.name,src:img.src}]
                form.append('deltedCarouselImages',JSON.stringify({name:img.name,src:img.src}))
            }
            form.append('deltedCarouselImages',JSON.stringify(deltedCarouselImages))
            if(!form.get('deltedCarouselImages')) form.append('deltedCarouselImages','')
            for(const el of form.entries()){
                console.log(el)
            }


            const response=await fetch(`${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_API_PORT}/api/setgame`,{
                credentials: 'include',
                withCredntials: true,
                // headers:{
                //     "Content-type": "multipart/form-data"
                // },
                method:'POST',
                body: form
            })
            const data=await response.json()
            return data
        }
        catch(err){
            return err
        }
    }

    function handleInputs(e){
        setStrInput(e)
        let clone={...errorMess}
        clone[e.target.name]=''
        clone.system=''
        setStrErrMess(clone)
    }

    return(
        <form className="max-w-[850px] m-auto p-6" onSubmit={handleSubmit}>
            <section className="w-full flex flex-col justify-between items-center flex-wrap gap-3">
                <div className="w-full relative">
                    <p className="text-bright-blue">Add thubmnail for your game</p>
                    <div className="flex items-center justify-center relative">
                        {thumbnailImg.length>0?
                            <div className="w-full flex flex-col justify-center items-center gap-2">
                                <img className="aspect-[4/3] w-[100%] min-w-[250px] max-w-[400px]" src={thumbnailImg[0].src} alt={thumbnailImg.name}/>
                                <div className="w-full flex justify-between items-center gap-2 text-text-white">
                                    <button className="cursor-pointer text-2xl bg-red-500 p-2 flex flex-col justify-center items-center flex-1"
                                    onClick={()=>deleteThumbnailImg(0)}
                                    >
                                        <AiFillDelete/>
                                        <p>Delete</p>
                                    </button>
                                    <button className="cursor-pointer text-2xl bg-bright-blue p-2 flex flex-col justify-center items-center flex-1 relative"
                                    onInput={(e)=>changeThumbnailImg(0,e.target.files[0])}
                                    >
                                        <CgArrowsExchange/>
                                        <p>Change file</p>
                                        <input type="file" className="absolute top-0 left-0 w-full h-full opacity-0" accept="image/png, image/jpeg"/>
                                    </button>
                                </div>
                            </div>
                        :
                        <div className="aspect-[4/3] w-[100%] min-w-[250px] max-w-[400px] h relative">
                            <div className="bg-bright-blue w-full h-full flex justify-center items-center"><AiFillFileAdd size={28}/></div>
                            <input className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" type="file" accept="image/png, image/jpeg" id="images" name="images" onInput={setThumbnailImg}/>
                        </div>
                        }
                    </div>
                </div>
                <div className="w-full">
                    <p className="text-bright-blue">Add images for your game</p>
                    <AddImgCarousel imgArr={imgArr} style={''} maxfile={8} handleUploadImg={handleUploadImg} handleDeleteImg={deleteUploadImg} handleChangeImg={changeUploadImg}/>
                </div>
            </section>
            <section className="w-full flex flex-col justify-between items-center gap-3">
                    <div className="flex justify-between flex-wrap gap-3 w-full">
                        <div className="max-w-[250px] flex-1">
                            <label className="block mb-2 text-bright-blue cursor-pointer" htmlFor="title">Title:</label>
                            <input className="bg-neutral-gray border-none outline-none hover:brightness-125 text-text-white p-2" type="text" id="title" name="title" value={strInputs.title} onChange={handleInputs} />
                            <p className="text-xs text-red-500">{errorMess.title}</p>
                        </div>

                        <div className="max-w-[250px] flex-1 relative">
                            <label className="block mb-2 text-bright-blue cursor-pointer" htmlFor="genres">Genres:</label>
                            <input className="bg-neutral-gray mb-2 border-none outline-none hover:brightness-125 text-text-white p-2" type="text" id="genres" name="genres" value={strInputs.genres} 
                            onChange={(e)=>{
                                if(strInputs.genres.length<20){
                                    handleInputs(e)
                                }
                            }} />
                            <button className="p-2 absolute right-0 bg-bright-blue text-text-white" onClick={(e)=>{
                                e.preventDefault()
                                if(strInputs.genres&&genreList.length<5){
                                    setGenreList([...genreList,strInputs.genres])
                                    setStrInput({target:{name:'genres',value:''}})
                                }
                            }}>Add</button>
                            <p className="text-bright-blue">Genre tags:{genreList.length}/5</p>
                            <div className="flex flex-wrap gap-2 bg-neutral-gray p-2">
                                {genreList.map((genre,i)=><span key={uuid()} className="p-2 rounded bg-bright-blue text-text-white relative group cursor-pointer">
                                    <button className="bg-neutral-gray/50 w-full h-full items-center justify-center absolute top-0 left-0 text-red-500 hidden group-hover:flex"
                                    onClick={(e)=>{
                                        e.preventDefault()
                                        let clone=[...genreList]
                                        clone.splice(i,1)
                                        setGenreList(clone)
                                    }}> 
                                    <AiFillDelete/></button>
                                    {genre}
                                </span>)}
                            </div>
                            <p className="text-xs text-red-500">{errorMess.genres}</p>
                        </div>
                    </div>
                    <div className="flex justify-between flex-wrap gap-3 w-full">
                        <div className="max-w-[250px] flex-1">
                            <label className="block mb-2 text-bright-blue cursor-pointer" htmlFor="price">Price($):</label>
                            <input className="bg-neutral-gray border-none outline-none hover:brightness-125 text-text-white p-2" type="number" id="price" name="price" value={strInputs.price} onKeyDown={
                                (e)=>{if(['e','E','+','-'].includes(e.key)) e.preventDefault()}} 
                                onChange={handleInputs}/>
                            <p className="text-xs text-red-500">{errorMess.price}</p>
                        </div>

                        <div className="max-w-[250px] flex-1">
                            <label className="block mb-2 text-bright-blue cursor-pointer" htmlFor="desc">Description:</label>
                            <textarea className="bg-neutral-gray border-none outline-none hover:brightness-125 text-text-white p-2" id="desc" name="desc" value={strInputs.desc} onChange={handleInputs}/>
                            <p className="text-xs text-red-500">{errorMess.desc}</p>
                        </div>
                    </div>
            </section>
            <input type="submit" className="p-2 bg-bright-blue text-text-white" value={'Create game'}/>
            <p>{errorMess.system}</p>
            {isLoading?<LoadingSpinner></LoadingSpinner>:<></>}
        </form>
    )
}