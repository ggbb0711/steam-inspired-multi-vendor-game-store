import RecommendedGameBannerCard from "./RecommendedGameBannerCard"

export default function RecommandedGameBanner({cards}){
    return(
        <div className="w-full bg-black p-4 flex justify-center items-center">
            <div className="w-full max-w-[1000px] flex flex-col sm:flex-row gap-2">
                <RecommendedGameBannerCard card={cards[0]}/>
                <RecommendedGameBannerCard card={cards[1]}/>
            </div>
        </div>
    )
}