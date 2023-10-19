import { SwiperSlide, Swiper } from "swiper/react"
import PopularGenresCard from "./PopularGenresCard"
import {AiOutlineLeft,AiOutlineRight} from 'react-icons/ai'
import {Navigation} from "swiper/modules"


export default function PopularGenresCarousel({cards}){
    return(
        <section className="w-full max-h-[300px] pb-6">
            <div className="w-full mb-2 flex justify-between">
                <h1 className="text-2xl text-text-white">Popular Genres:</h1>
                <div className="flex gap-2">
                    <button className="p-2 rounded-full bg-gray-bright-blue hover:text-bright-blue genre-arrow-left"><AiOutlineLeft/></button>
                    <button className="p-2 rounded-full bg-gray-bright-blue hover:text-bright-blue genre-arrow-right"><AiOutlineRight/></button>
                </div>
            </div>
            
            <Swiper
                loop={true}
                spaceBetween={20}
                navigation={{ prevEl: ".genre-arrow-left", nextEl: ".genre-arrow-right" }}
                breakpoints={{
                    350: {
                      slidesPerView: 2,
                    },
                    850: {
                        slidesPerView: 3,
                    },
                }}
                modules={[Navigation]}
            >
                {cards.map((card,i)=>
                    <SwiperSlide key={i}>
                        <PopularGenresCard card={card}/>
                    </SwiperSlide>
                )}
            </Swiper>
        </section>
        
    )
}