import { Link } from "react-router-dom"

export default function StoreHeaderDropDownMobileLink({path,text,endActive}){
    return <Link to={path} onClick={endActive} className='hover:text-bright-blue'>{text}</Link>
}