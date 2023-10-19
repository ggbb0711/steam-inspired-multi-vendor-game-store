import { Link } from "react-router-dom"

export default function RegisterPage(){
    return(
    <section className="min-h-screen bg-very-dark-blue flex justify-center items-center">
        <div className="h-[500px] max-w-[600px] bg-neutral-black flex flex-col justify-center items-center gap-2 p-4">
            <button className="bg-very-bright-blue text-text-white cursor-pointer p-2"><Link to={'/register/dev'}>Register as developer</Link></button>
            <button className="bg-dark-green text-text-white cursor-pointer p-2"><Link to={'/register/customer'}>Register as customer</Link></button>
            <Link className="text-bright-blue" to={'/login'}>Login</Link>
            <Link className="text-bright-blue" to={'/'}>To store</Link>
        </div>
    </section>
)
}