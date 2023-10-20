import BrowseGamePage from "./BrowseGamePage"


export default function BrowseGamePages({pages,turnPage}){

    return(
        <div className="w-full">
            {pages.map((page,i)=>
                <BrowseGamePage key={i} cards={page} turnPage={turnPage}/>    
            )}
        </div>
    )
}