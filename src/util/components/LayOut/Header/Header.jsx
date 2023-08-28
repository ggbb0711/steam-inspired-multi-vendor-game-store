import { useUserContext } from "../../../../pages/components/userContex"
import { Link } from "react-router-dom"

export default function Header({firstGroup,secondGroup,thirdGroup}){
    const {userInfo}=useUserContext()


    return (
        <>
            <div className="flex justify-between bg-neutral-black p-4 relative">

                {/* Mobile */}
                <div className="flex justify-between items-start gap-2 md:hidden">
                    {firstGroup.map((element,i)=><div key={i}>{element.src.mobile}</div>)}
                </div>
                <div className="flex justify-between items-start gap-2 md:hidden">
                    {secondGroup.map((element,i)=><div key={i}>{element.src.mobile}</div>)}
                </div>
                <div className="flex justify-between items-start gap-2 md:hidden">
                    {thirdGroup.map((element,i)=><div key={i}>{element.src.mobile}</div>)}
                </div>


                {/* Desktop */}
                <div className="justify-between items-start gap-2 hidden md:flex">
                    {firstGroup.map((element,i)=><div key={i}>{element.src.desktop}</div>)}
                </div>
                <div className="justify-between items-start gap-2 hidden md:flex">
                    {secondGroup.map((element,i)=><div key={i}>{element.src.desktop}</div>)}
                </div>
                <div className="justify-between items-start gap-2 hidden md:flex">
                    {thirdGroup.map((element,i)=><div key={i}>{element.src.desktop}</div>)}
                </div>


                <div className="absolute top-0 right-4 text-xs">
                    {userInfo.name?
                    <p>Hello, {userInfo.name}|<span className="text-very-bright-blue"><Link>Logout</Link></span></p>
                    :
                    <p><span className="text-very-bright-blue"><Link>Login</Link></span>|<span className="text-very-bright-blue"><Link>Register</Link></span></p>
                    }
                </div>
            </div> 
        </>
    )
}

