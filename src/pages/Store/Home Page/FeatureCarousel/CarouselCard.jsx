import { useState } from "react"
import { Link } from "react-router-dom"


export default function CarouselCard({card}){
    const [currHoverImg,setCurrHoverImg]=useState()

    return(
        <div className="flex bg-neutral-black w-full gap-2 cursor-pointer relative">
            <div className="md:w-[60%] w-full aspect-[4/3] relative cursor-pointer after:absolute after:w-full after:h-full after:top-0 after:block after:shadow-[inset_0px_-10px_80px_5px] md:after:hidden md:shadow-lg shadow-black/75">
                <img className="w-full h-full absolute" src={(currHoverImg)?currHoverImg.src:card.images.thumbnailImage.src} alt={(currHoverImg)?currHoverImg.name:card.images.thumbnailImage.name} />
                <div className="absolute text-left left-4 bottom-8 md:hidden">
                    <h2 className="text-2xl text-text-white">{card.title}</h2>
                    <h3 className="text-text-white">{card.price}$</h3>
                </div>
            </div>
            
            <div className="hidden flex-1 flex-col items-start justify-center gap-2 md:flex">
                <h2 className="text-2xl text-text-white">{card.title}</h2>
                <div className="w-full flex gap-2">
                    {(card.images.carouselImages.map((img,i)=>
                        <img onMouseEnter={()=>setCurrHoverImg(img)} onMouseLeave={()=>setCurrHoverImg()} key={i} className="w-1/2 cursor-pointer shadow-lg hover:opacity-100 shadow-black/75 opacity-75" src={img.src} alt={img.name} />
                    ))}
                </div>
                <div className="w-full overflow-x-auto">
                    {card.genres.map((genre,i)=><span className="text-dark-blue" key={i}>
                        {genre+((i===card.genres.length-1)?'':', ')}
                    </span>)}
                </div>
                <h3 className="text-text-white">{card.price}$</h3>
            </div>

            <Link className="absolute w-full h-full top-0 left-0" to={`/game/${card._id}`}></Link>
        </div>
    )
}