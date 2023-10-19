import LibraryCard from "./LibraryCard"

export default function LibraryCardContainer({page}){
    console.log(page)
    return(
        <section className="w-full flex justify-center">
            {!page? <p className={`text-bright-blue text-4xl m-auto ${!page?'':'hidden'}`}>404 MISSING</p>:
                <div className="w-full px-4 max-w-[1000px] grid gap-7 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
                    {page.map((card,i)=>
                        <LibraryCard card={card.productDoc} key={i}/>
                    )}
                </div>
            }
            
            
        </section>
    )
}