import { Link } from "react-router-dom"

export default function HeaderLink({path,text}){
    return(
        <div>
            <Link className="hover:text-bright-blue" to={path}>{text}</Link>
        </div>
    )
}