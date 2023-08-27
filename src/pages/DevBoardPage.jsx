import { useUserContext } from "./components/userContex"

export default function DevBoardPage(){
    const {userInfo}=useUserContext()

    return(
    <div className="w-full h-screen relative">
        <div className="w-[70%] h-full bg-dark-green text-text-white">
        
        </div>
    </div>)
}