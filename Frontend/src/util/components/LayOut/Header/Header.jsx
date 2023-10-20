import { useUserContext } from "../../Context/userContex"
import { Link } from "react-router-dom"

export default function Header({firstGroup,secondGroup,thirdGroup}){
    const {userInfo}=useUserContext()


    return (
        <>
            <header className="z-[7] flex justify-between bg-neutral-black text-text-white p-4 relative">

                {/* Mobile */}
                <div className="flex justify-between items-start gap-4 md:hidden">
                    {firstGroup.map((element,i)=><div key={i}>{element.src.mobile}</div>)}
                </div>
                <div className="flex justify-between items-start gap-4 md:hidden">
                    {secondGroup.map((element,i)=><div key={i}>{element.src.mobile}</div>)}
                </div>
                <div className="flex justify-between items-start gap-4 md:hidden">
                    {thirdGroup.map((element,i)=><div key={i}>{element.src.mobile}</div>)}
                </div>


                {/* Desktop */}
                <div className="justify-between items-start gap-4 hidden md:flex">
                    {firstGroup.map((element,i)=><div key={i}>{element.src.desktop}</div>)}
                </div>
                <div className="justify-between items-start gap-4 hidden md:flex">
                    {secondGroup.map((element,i)=><div key={i}>{element.src.desktop}</div>)}
                </div>
                <div className="justify-between items-start gap-4 hidden md:flex">
                    {thirdGroup.map((element,i)=><div key={i}>{element.src.desktop}</div>)}
                </div>


                <div className="absolute top-0 right-4 text-xs">
                    {userInfo.name?
                    <p>Hello, {userInfo.name}|<span className="text-very-bright-blue"><Link to={'/logout'}>Logout</Link></span></p>
                    :
                    <p><span className="text-very-bright-blue"><Link to={'/login'}>Login</Link></span>|<span className="text-very-bright-blue"><Link to={'/register'}>Register</Link></span></p>
                    }
                </div>
            </header> 
        </>
    )
}

