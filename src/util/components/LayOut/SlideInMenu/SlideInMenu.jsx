export default function SlideInMenu({firstGroup,secondGroup,thirdGroup,isSlideIn,setIsSlideIn}){

    return (
        <>
            <div onClick={()=>setIsSlideIn(false)} className={`w-screen h-screen z-10 bg-black/50 fixed ${isSlideIn?'':'hidden'}`}>
            </div>
            <div className={`w-[50%] h-full flex flex-col justify-between items-start p-2 bg-dark-green text-text-white fixed transition-all duration-200 ${isSlideIn?'':'-translate-x-[150%]'} z-20 md:hidden`}>
                <div className="flex flex-col justify-between items-start gap-2">
                    {firstGroup.map((element,i)=><div key={i}>{element.src}</div>)}
                </div>
                <div className="flex flex-col justify-between items-start gap-2">
                    {secondGroup.map((element,i)=><div key={i}>{element.src}</div>)}
                </div>
                <div className="flex flex-col justify-between items-start gap-2">
                    {thirdGroup.map((element,i)=><div key={i}>{element.src}</div>)}
                </div>
            </div>
        </>
    )
}