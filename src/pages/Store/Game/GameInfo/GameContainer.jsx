import ImageCarousel from "./ImageCarousel"
import GameInfo from "./GameInfo"
import BuySection from "./BuySection"

export default function GameContainer({game}){

    return(
        <div>
            <h1 className="pl-4 text-text-white font-bold text-2xl mb-2">{game.title}</h1>
            <div className="w-full mb-10 max-w-[950px] bg-neutral-black/70 p-4 flex flex-col-reverse lg:flex-row gap-4 lg:gap-2">
                <ImageCarousel ImgArr={game.images.carouselImages}/>
                <GameInfo game={game}/>
            </div>
            <div className="w-full max-w-[900px] bg-dark-blue p-2 flex flex-col mx-auto">
                <BuySection game={game}/>
            </div>
        </div>
        
    )
}