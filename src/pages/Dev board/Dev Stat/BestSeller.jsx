import { Link } from "react-router-dom"

export default function BestSeller({cards}){
    return(
        <div className="w-full">
            <h1 className="text-2xl text-bright-blue">Best seller:</h1>
            {!cards||cards?.length===0?
                <div className="w-full p-6 text-bright-blue bg-neutral-black">
                    <p>This developer has no game</p>
                </div>:
                <div className="w-full py-2 flex justify-center items-center flex-wrap gap-6">
                    {cards.map((card,i)=>
                        <div className="flex-1 basis-[200px] max-w-[400px]" key={i}>
                            <Link className="text-xl text-very-bright-blue" to={`/devboard/devgame/${card._id}`}>{card.title}</Link>
                            <div className="w-full aspect-[4/3] relative">
                                <img className="w-full" src={card.images.thumbnailImage.src} alt={card.images.thumbnailImage.name} />
                                <Link className="absolute top-0 left-0 w-full h-full" to={`/devboard/devgame/${card._id}`}></Link>
                            </div>
                            <div className="bg-neutral-black p-5">
                                <h3 className="text-xl text-bright-blue">Copies sold:</h3>
                                <p className="text-xl text-dark-green">{card.copiesSold}</p>
                            </div>
                        </div>
                    )}
                </div>
            }
            
        </div>
    )
}