import { useUserContext } from "./components/userContex"

export default function DevBoardPage(){
    const {userInfo}=useUserContext()

    return(
    <div>
        <h1>{userInfo.name}</h1>
        <button>Get dev info</button>
    </div>)
}