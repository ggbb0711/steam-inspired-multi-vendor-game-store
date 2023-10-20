import { Link } from "react-router-dom"


export default function LibraryCard({card}){
    return(
        <div className="w-full group bg-gray-bright-blue rounded-md relative">
            <img className="w-full aspect-[4/3]" src={card.images.thumbnailImage.src} alt={card.images.thumbnailImage.name} />
            <div className="overflow-x-hidden max-w-full p-2">
                <h1 className="text-text-white group-hover:text-bright-blue">{card.title}</h1>
            </div>
            <Link className="absolute top-0 left-0 w-full h-full" to={`/game/${card._id}`}></Link>
        </div>
    )
}