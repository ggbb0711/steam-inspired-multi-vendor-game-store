import { AiFillFileAdd, AiFillDelete } from "react-icons/ai"
import { CgArrowsExchange } from "react-icons/cg"



export default function ThumbnailImage({thumbnailImage,handleUploadThumbnailImg,deleteThumbnailImage,changeThumbnailImage}){

    return(
        <div className="flex items-center justify-center relative">
            {thumbnailImage.length>0?
                <div className="w-full flex flex-col justify-center items-center gap-2">
                    <img className="aspect-[4/3] w-[100%] min-w-[250px] max-w-[400px]" src={thumbnailImage[0].src} alt={thumbnailImage.name}/>
                    <div className="w-full flex justify-between items-center gap-2 text-text-white">
                        <button className="cursor-pointer text-2xl bg-red-500 p-2 flex flex-col justify-center items-center flex-1"
                        onClick={()=>deleteThumbnailImage(0)}
                        >
                            <AiFillDelete/>
                            <p>Delete</p>
                        </button>
                        <button className="text-2xl bg-bright-blue p-2 flex flex-col justify-center items-center flex-1 relative"
                        onInput={(e)=>changeThumbnailImage(0,e.target.files[0])}
                        >
                            <CgArrowsExchange/>
                            <p>Change file</p>
                            <input type="file" className="cursor-pointer absolute top-0 left-0 w-full h-full opacity-0" accept="image/png, image/jpeg"/>
                        </button>
                    </div>
                </div>
            :
            <div className="aspect-[4/3] w-[100%] min-w-[250px] max-w-[400px] h relative">
                <div className="bg-bright-blue w-full h-full flex justify-center items-center"><AiFillFileAdd size={28}/></div>
                <input className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" type="file" accept="image/png, image/jpeg" id="images" name="images" onInput={handleUploadThumbnailImg}/>
            </div>
            }
        </div>
    )
}