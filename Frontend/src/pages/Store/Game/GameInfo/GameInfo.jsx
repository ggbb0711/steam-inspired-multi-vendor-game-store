import { Link } from "react-router-dom"

export default function GameInfo({game}){
    return(
        <div className="flex-1 flex flex-col sm:flex-row lg:flex-col gap-2">
            <img className="w-full flex-1 aspect-[4/3]" src={game.images.thumbnailImage.src} alt={game.images.thumbnailImage.name} />
            <div className="flex flex-1 flex-col gap-2">
                <textarea disabled={true} className="text-text-white bg-neutral-black/50 min-h-[75px] max-h-[150px] overflow-y-scroll" value={game.desc}></textarea>
                <p><span className="text-neutral-gray">RATING:</span> <span className="text-very-bright-blue">{game.averageRating||0}</span></p>
                <p><span className="text-neutral-gray">DEVELOPER:</span> <span className="text-very-bright-blue">{game.dev}</span></p>
                <p><span className="text-neutral-gray">RELEASE ON:</span> <span className="text-very-bright-blue">{game.createdAt.split('T')[0]}</span></p>
                <div className="max-w-full flex gap-2 flex-wrap">
                    {game.genres.map((genre,i)=><span key={i} className="p-2 rounded bg-bright-blue text-text-white relative cursor-pointer">
                        <Link to={`/browsegame?genres=${genre}`}>{genre}</Link>
                    </span>)}
                </div>
            </div>
        </div>
    )
}