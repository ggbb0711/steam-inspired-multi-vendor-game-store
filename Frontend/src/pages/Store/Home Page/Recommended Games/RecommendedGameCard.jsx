import { Link } from "react-router-dom"

export default function RecommendedGameCard({card,isReverse}){
    return(
        <div className="w-full bg-gray-bright-blue p-4 flex flex-col items-center">
            <div className={`w-full max-w-[1000px] text-center ${isReverse?'sm:text-right':'sm:text-left'}`}>
                <Link className="text-xl mb-10 text-bright-blue font-bold" to={`/game/${card._id}`}>{card.title}</Link>
                <div className={`flex ${isReverse?'flex-row-reverse':''} w-full mt-5`}>
                    <div className="w-full relative sm:w-[33%] aspect-[4/3] sm:scale-110 cursor-pointer">
                        <img className="w-full h-full" src={card.images.thumbnailImage.src} alt={card.images.thumbnailImage.name} />
                        <Link className="absolute w-full h-full top-0 left-0" to={`/game/${card._id}`}/>
                    </div>
                    <img className="w-[33%] hidden sm:block aspect-[16/9] hover:scale-125 transition-all cursor-pointer" src={card.images.carouselImages[0].src} alt={card.images.carouselImages[0].name} />
                    <img className="w-[33%] hidden sm:block aspect-[16/9] hover:scale-125 transition-all cursor-pointer" src={card.images.carouselImages[1].src} alt={card.images.carouselImages[0].name} />
                </div>
                <div className="flex mt-2 w-full sm:hidden">
                    <img className="w-[50%] aspect-[16/9] hover:scale-125 transition-all cursor-pointer" src={card.images.carouselImages[0].src} alt={card.images.carouselImages[0].name} />
                    <img className="w-[50%] aspect-[16/9] hover:scale-125 transition-all cursor-pointer" src={card.images.carouselImages[1].src} alt={card.images.carouselImages[0].name} />
                </div>
                <h2 className="text-bright-blue text-bold mt-3">{card.price}$</h2>
            </div>
        </div>
    )
}