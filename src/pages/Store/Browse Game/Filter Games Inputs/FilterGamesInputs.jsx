import TagFilter from "./TagFilter"
import ShowGame from "./ShowGame"

export default function FilterGamesInputs({searchParams,changeParams}){
    function changeTags(tags){
        changeParams({...searchParams,genres:tags.join()})
    }

    function changeSortOption(option){
        changeParams({...searchParams,show:option})
    }
    
    return(
        <div className="w-full flex justify-center items-center">
            <div className="w-full bg-neutral-black max-w-[1000px] flex flex-col justify-between items-start sm:items-center sm:flex-row gap-2 p-4">
                <TagFilter genreList={(searchParams.genres)?searchParams.genres.split(','):[]} addCb={changeTags} deleteCb={changeTags}/>
                <ShowGame currValue={searchParams.show} inputsArr={['Newest','Oldest','A-Z','Z-A','Most expansive','Least expansive']} changeCb={changeSortOption}/>
            </div>
        </div>
    )
}