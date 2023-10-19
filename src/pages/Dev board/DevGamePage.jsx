import { Outlet, useParams } from "react-router-dom"
import DevBoardHeader from "./Dev board header/DevBoardHeader"

export default function DevGamePage(){
    const {gameId}=useParams()

    return(
        <div className="w-full relative">
            <DevBoardHeader links={[
                {
                    link:`/devboard/devgame/${gameId}`,
                    text:'Game stat'
                },
                {
                    link:`/devboard/devgame/${gameId}/editgame`,
                    text:'Edit game'
                }
            ]}/>
            <Outlet/>
        </div>
    )
}