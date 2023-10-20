import { Link } from "react-router-dom"

export default function StoreHeaderMobileLink({path,text}){
    return <Link to={path} className='hover:text-bright-blue'>{text}</Link>
}