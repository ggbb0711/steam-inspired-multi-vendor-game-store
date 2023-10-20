export default function HamburgerIcon({onClick}){
    return(
        <div onClick={onClick} className="w-[30px] h-[30px] flex flex-col gap-2 items-center cursor-pointer">
            <div className="w-full h-1/3 bg-text-white"></div>
            <div className="w-full h-1/3 bg-text-white"></div>
            <div className="w-full h-1/3 bg-text-white"></div>
        </div>
    )
}