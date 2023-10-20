import { useState } from "react"
import { Swiper , SwiperSlide} from "swiper/react"
import {AiOutlineLeft,AiOutlineRight} from 'react-icons/ai'
import {Navigation} from "swiper/modules"


export default function ImageCarousel({ImgArr}){
    const [currImg,setCurrImg]=useState(0)
    
    return(
        <div className="max-w-full w-full lg:max-w-[65%] flex flex-col items-center justify-center gap-6">
            <img className="w-full lg:h-[75%] aspect-[16/9]" src={ImgArr[currImg].src} alt={ImgArr[currImg].name} />
            <div className="max-w-full w-full flex justify-between items-center">
                <AiOutlineLeft className="cursor-pointer arrow-left flex-1 text-text-white hover:text-bright-blue arrow-left"/>
                <Swiper 
                    spaceBetween={0}
                    slidesPerView={4}
                    navigation={{ prevEl: ".arrow-left", nextEl: ".arrow-right" }}
                    modules={[Navigation]}
                    className="w-[280px] sm:w-[350px] min-w-0"
                >
                    {ImgArr.map((img,index)=>
                        <SwiperSlide key={index}>
                            <div className={`${currImg===index?'border-2 border-very-bright-blue':''} w-full h-full cursor-pointer`} onClick={()=>setCurrImg(index)}>
                                <img className="w-full" src={img.src} alt={img.name} />
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
                <AiOutlineRight className="flex-1 arrow-right cursor-pointer text-text-white hover:text-bright-blue arrow-right"/>
            </div>
            
        </div>
    )
}