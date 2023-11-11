import GameReviewPage from "./GameReviewPage";

export default function GameReviewContainer({pages,turnPage}){
    return(
        <div className="w-full">
            {pages.map((page,i)=>
                <GameReviewPage key={i} cards={page} turnPage={turnPage}></GameReviewPage>    
            )}
        </div>
    )
}