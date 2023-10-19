export default function StoreHeaderDesktop({els}){


    return(
        <div className="max-w-[1000px] w-full p-4 justify-between hidden md:flex">
            {els.map((el,i)=>
                <div key={i} className="items-center flex">
                    {el.src}
                </div>
            )}
        </div>
    )
}