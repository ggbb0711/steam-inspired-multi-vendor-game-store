import DevProductCard from "../util/components/ProductCards/DevProductCard"
import { Link } from "react-router-dom"

export default function YourGamesDevPage(){
    return (
        <section className="max-w-[1000px] py-6 m-auto grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
            <DevProductCard link={'/'} img={'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png'} title={'God of war'}></DevProductCard>
            <DevProductCard link={'/'} img={'https://file.hstatic.net/1000026716/file/gearvn-honkai-star-rail-4_7677ead863e84ff298824c2b27d900a3_1024x1024.png'} title={'God of war'}></DevProductCard>
            <DevProductCard link={'/'} img={'https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_GenshinImpact_miHoYoLimited_S1_2560x1440-91c6cd7312cc2647c3ebccca10f30399'} title={'God of war'}></DevProductCard>
            <DevProductCard link={'/'} img={'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png'} title={'God of war'}></DevProductCard>
            <DevProductCard link={'/'} img={'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png'} title={'God of war'}></DevProductCard>
            <Link className="p-3 crusor-pointer relative" to={'/devboard/creategame'}>
                <div className="h-full rounded flex justify-center items-center bg-very-bright-blue">
                    <h1 className="text-2xl text-text-white">Add</h1>
                </div>
            </Link>
        </section>
    )    
}