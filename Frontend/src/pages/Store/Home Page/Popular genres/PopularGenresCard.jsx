import { Link } from "react-router-dom"

export default function PopularGenresCard({card}){
    return(
        <div className="p-2 text-center cursor-pointer bg-gray-bright-blue rounded-md relative">
            <div className="relative w-full">
                <img className="aspect-[4/3] w-[70%] md:w-[55%] z-[1] absolute top-0 left-0" src={card.images[1].thumbnailImage.src} alt={card.images[1].thumbnailImage.name} />
                <img className="aspect-[4/3] w-[70%] md:w-[55%] z-[1] absolute top-0 right-0" src={card.images[2].thumbnailImage.src} alt={card.images[2].thumbnailImage.name} />
                
                <img className="aspect-[4/3] m-auto w-[70%] md:w-[55%] z-[2] relative shadow-[12px_0px_15px_-5px,-12px_0px_15px_-5px] shadow-black/75" src={card.images[0].thumbnailImage.src} alt={card.images[0].thumbnailImage.name} />
            </div>
            <h1 className="text-text-white">{card._id}</h1>
            <Link className="w-full h-full absolute top-0 left-0 z-[3]" to={`/browse?genres=${card._id}`}></Link>
        </div>
    )
}