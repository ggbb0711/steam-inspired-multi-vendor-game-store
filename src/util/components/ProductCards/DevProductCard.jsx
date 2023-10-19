import { Link } from "react-router-dom";
import {AiOutlineCheck} from "react-icons/ai"
import {RxCross2} from "react-icons/rx"

export default function DevProductCard({link,img,title,genres,price,isPublished}){
    return(
        <div className="flex-1 w-full relative p-2 flex gap-2 bg-neutral-black text-text-white">
            <Link className="w-[30%] max-w-[175px] h-full" to={link}>
                <img className="w-full aspect-[4/3]" src={img} alt={title} />
            </Link>
            <div className="flex-1 flex flex-col justify-between max-h-[150px]">
                <Link className="hover:text-very-bright-blue " to={link}>{title}</Link>
                <ul className="w-full flex flex-wrap gap-2 overflow-y-scroll sm:overflow-auto">
                    {genres.map((genre,i)=>
                        <li key={i} className="p-2 rounded bg-bright-blue text-text-white">
                            {genre}
                        </li>
                    )}
                </ul>
                <div className="flex gap-4">
                    <h2>{price}$</h2>
                    <p>Published:{isPublished?<AiOutlineCheck className="text-light-green inline"/>:<RxCross2 className="text-red-500 inline"/>}</p>
                </div>
            </div>
        </div>
    )
}