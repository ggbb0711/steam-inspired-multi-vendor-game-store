import { Link } from "react-router-dom";

export default function DevProductCard({link,img,title}){
    return(
        <Link className=" p-3 group crusor-pointer relative" to={link}>
            <div className="absolute left-0 top-0 w-full h-full rounded group-hover:bg-black/30 hidden group-hover:flex justify-center items-center text-3xl text-text-white">
                Edit
            </div>
            <div>
                <div className="w-full">
                    <img className="w-full aspect-[4/3]" src={img} alt={title} />
                </div>
                <div>
                    <h3 className="text-left text-xl text-text-white">{title}</h3>
                </div>
            </div>
        </Link>
    )
}