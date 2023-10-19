import { Link } from "react-router-dom"

export default function StoreHeaderLink({path,text}){
    return(
        <button className="text-center p-3">
            <Link className='hover:text-bright-blue text-white/70' to={path}>{text}</Link>
        </button>
    )
}