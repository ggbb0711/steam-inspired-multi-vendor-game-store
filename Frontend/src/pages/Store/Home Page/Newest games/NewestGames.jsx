import NewestGameCard from "./NewestGameCard"
import { Link } from "react-router-dom"

export default function NewestGames({cards}){
    return(
        <section className="w-full pb-6">
            <div className='w-full mb-2 flex justify-between'>
                <h1 className="text-2xl text-text-white">Newest games:</h1>
            </div>
            <div className="w-full p-2 grid gap-7 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
                {cards.map((card,i)=>
                    <NewestGameCard card={card} key={i}/>
                )}
            </div>
        </section>
    )
}