import { Link } from "react-router-dom"

export default function FailPage(){
    return(
        <div className="w-screen min-h-screen bg-very-dark-blue flex justify-center items-center">
            <div className="w-[400px] h-[400px] bg-neutral-black/70 p-6 text-center flex flex-col justify-center items-center gap-2">
                <p className="text-bright-blue">Payment canceled</p>
                <Link className="text-dark-green" to={'/'}>Back to store</Link>
            </div>
        </div>
    )
}