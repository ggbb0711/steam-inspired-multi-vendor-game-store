import { Outlet } from "react-router-dom"
import DevBoardHeader from "./Dev board header/DevBoardHeader"

export default function DevPage(){
    return(
        <div className="w-full relative">
            <DevBoardHeader links={[
                {
                    link:'/devboard/dev',
                    text:'Dev stat'
                },
                {
                    link:'/devboard/dev/yourgames',
                    text:'Your games'
                }
            ]} defaultActive={0}/>
            <Outlet/>
        </div>
    )
}