import { useState } from "react";
import { Swiper , SwiperSlide} from "swiper/react";
import { AiFillFileAdd, AiFillDelete } from "react-icons/ai"
import { CgArrowsExchange } from "react-icons/cg"


import 'swiper/css';
import uuid from "react-uuid";

function AddImgCarousel({imgArr,maxfile,handleUploadImg,handleDeleteImg,handleChangeImg}){
    const [currActive,setCurrActive]=useState(0)


    return(
        <div className={`flex flex-col justify-center items-center gap-3`}>
            <div className="w-full h-[60%] flex flex-col justify-center items-center gap-2 relative">
                {imgArr.length>0?
                    <> 
                        <img className="aspect-[16/9] w-full min-w-[250px]" src={(imgArr[currActive].src)} alt={imgArr[currActive].name} />
                        <div className="w-full flex justify-between items-center gap-2 text-text-white">
                            <button className="cursor-pointer text-2xl bg-red-500 p-2 flex flex-col justify-center items-center flex-1"
                            onClick={(e)=>{ 
                                e.preventDefault()
                                handleDeleteImg(currActive) 
                                const nextActive=(currActive-1<0)?0:currActive-1
                                setCurrActive(nextActive)
                            }}
                            >
                                <AiFillDelete/>
                                <p>Delete</p>
                            </button>
                            <button className="text-2xl bg-bright-blue p-2 flex flex-col justify-center items-center flex-1 relative"
                            onInput={(e)=>handleChangeImg(currActive,e.target.files[0])}
                            >
                                <CgArrowsExchange/>
                                <p>Change file</p>
                                <input type="file" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" accept="image/png, image/jpeg"/>
                            </button>
                        </div>
                    </>:
                    <></>
                }
            </div>
            <Swiper 
                spaceBetween={0}
                slidesPerView={3}
                breakpoints={{
                    850: {
                      slidesPerView: 4,
                    },
                }}
                className='w-full h-[40%] max-h-[150px]'
            >
                {imgArr.map((img,index)=>
                    <SwiperSlide key={uuid()}>
                        <div className={`${currActive===index?'border-2 border-very-bright-blue':''} w-full h-full cursor-pointer`} onClick={()=>setCurrActive(index)}>
                            <img className="w-full aspect-[16/9]" src={img.src} alt={img.name} />
                        </div>
                    </SwiperSlide>
                )}
                {(imgArr.length>=maxfile)?
                    <></>
                    :<SwiperSlide>
                        <div className="w-full aspect-[16/9] relative">
                            <div className="bg-bright-blue w-full h-full flex justify-center items-center"><AiFillFileAdd size={28}/></div>
                            <input className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" type="file" accept="image/png, image/jpeg" id="images" name="images" onInput={handleUploadImg} multiple/>
                        </div>
                    </SwiperSlide>
                }
            </Swiper>
            <p className="text-bright-blue">{imgArr.length}/{maxfile}</p>
        </div>
    )
}


export { AddImgCarousel }