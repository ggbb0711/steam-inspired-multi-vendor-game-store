import { Link } from "react-router-dom";

export default function SlideInMenuLinks({path,text}){
    return(
        <div>
            <Link className="group" to={path}>{text}
                <span className={`block w-0 h-1 group-hover:w-full bg-very-bright-blue transition-all duration-200`}></span>
            </Link>
        </div>
    )
}