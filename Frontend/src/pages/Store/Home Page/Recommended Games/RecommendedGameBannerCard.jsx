import { Link } from "react-router-dom"

export default function RecommendedGameBannerCard({card}){
    return(
        <div className="flex-1 cursor-pointer group">
            <Link className="text-xl text-text-white group-hover:text-bright-blue" to={`/game/${card._id}`}>{card.title}</Link>
            <div className="w-full">
                <Link to={`/game/${card._id}`}>
                    <img className="w-full aspect-[4/3]" src={card.images.thumbnailImage.src} alt={card.images.thumbnailImage.name} />
                </Link>
                <div className="flex mt-2 w-full">
                    <img className="w-[50%] aspect-[4/3]" src={card.images.carouselImages[0].src} alt={card.images.carouselImages[0].name} />
                    <img className="w-[50%] aspect-[4/3]" src={card.images.carouselImages[1].src} alt={card.images.carouselImages[1].name} />
                </div>
            </div>
            <h2 className="text-text-white">{card.price}$</h2>
        </div>
    )
}