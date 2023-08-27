import { useUserContext } from "./components/userContex"

export default function LibraryPage(){
    const {userInfo}=useUserContext()

    return(
        <div>
            Hello, {userInfo.name}
            Library Page
        </div>
    )
}