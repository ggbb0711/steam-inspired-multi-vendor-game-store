import SortGame from "./SortGame"
import TitleSearch from "./TitleSearch"

export default function LibraryInputs({searchParams,changeParams}){

    function changeTitle(title){
        changeParams({...searchParams,titleregex:title,page:1})
    }

    function changeSortOption(option){
        changeParams({...searchParams,show:option,page:1})
    }

    return(
        <div className="w-full flex justify-center items-center">
            <div className="w-full bg-neutral-black max-w-[1000px] flex flex-col justify-between items-start sm:items-center sm:flex-row gap-2 p-4">
                <TitleSearch changeTitle={changeTitle}/>
                <SortGame currValue={searchParams.show} inputsArr={['A-Z','Z-A']} changeCb={changeSortOption} />
            </div>
        </div>
    )
}