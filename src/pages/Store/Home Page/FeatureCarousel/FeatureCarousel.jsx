import { SwiperSlide, Swiper } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import CarouselCard from "./CarouselCard"
import {AiOutlineLeft,AiOutlineRight} from 'react-icons/ai'

export default function FeatureCarousel({cards}){
    const pagination={
        clickable: true,
        el:'.swiper-custom-pagination',
        renderBullet: (index, className) => {
            return `<span class="rounded flex-1 cursor-pointer p-3 py-2 bg-gray-bright-blue opacity-75 hover:opacity-100 ${className}"> </span>`
        },
    }

    return(
        <section className="w-full max-h-[650px] pb-6">
            <div className="w-full h-full">
                <div className="w-full min-h-[200px] h-full flex items-center gap-2">
                    <button className="hidden md:block hover:text-bright-blue p-4 text-text-white arrow-left"><AiOutlineLeft/></button>
                    <Swiper
                        loop={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        pagination={pagination}
                        navigation={{ prevEl: ".arrow-left", nextEl: ".arrow-right" }}
                        speed={800}
                        modules={[Autoplay,Pagination,Navigation]}
                        className="w-full">
                            {cards.map((card,i)=>
                                <SwiperSlide key={i}>
                                    <CarouselCard card={card}></CarouselCard>
                                </SwiperSlide>
                            )}
                    </Swiper>
                    <button className="hidden md:block hover:text-bright-blue p-4 text-text-white arrow-right"><AiOutlineRight/></button>
                </div>
                
                <div className="w-full flex justify-center mt-2">
                    <div className="swiper-custom-pagination w-full max-w-[200px] flex justify-center gap-2"></div>
                </div>
            </div>
        </section>
    )
}