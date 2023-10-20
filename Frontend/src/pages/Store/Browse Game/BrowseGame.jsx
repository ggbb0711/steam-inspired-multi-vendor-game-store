import { useEffect, useState } from "react"
import { useSearchParamsSite } from "../../../util/hooks/useSearchParamsSite"
import FilterGamesInputs from "./Filter Games Inputs/FilterGamesInputs"
import { useAlertContext } from "../../../util/components/Context/AlertContext"
import BrowseGamePages from "./Browse Game Pages/BrowseGamePages"
import LoadingSpinner from "../../../util/components/LoadingSpinner"
import fetchData from "../../../util/functions/fetchData"

export default function BrowseGame(){
    const {setAlert}=useAlertContext()
    const [isLoading,setIsLoading]=useState(false)
    const [pages,setPages]=useState([])
    const [searchParams,setSearchPrams]=useSearchParamsSite([
        {
            name:'genres',
            defaultValue:''
        },
        {
            name:'titleregex',
            defaultValue:'(.*?)'
        },
        {
            name:'show',
            defaultValue:'createdAt-reverse',
        },
    ])
    const [currPage,setCurrPage]=useState({page:0})

    function successCb(result){
        if(result.result.length>0)setPages([...pages,result.result])
    }

    function failCb(err){
        setAlert('fail',err.system)
    }

    function changeParams(paramsObject){
        setSearchPrams(paramsObject)
    }

    

    useEffect(()=>{
        console.log(currPage)
        setIsLoading(true)
        fetchData({
            url:`/api/browsegame?genres=${searchParams.genres}&titleregex=${searchParams.titleregex}&show=${searchParams.show}&page=${currPage.page}`,
            config:{}
        },successCb,failCb)
        .finally(()=>setIsLoading(false))
    },[currPage])


    useEffect(()=>{
        setPages([])
        setCurrPage({page:0})
    },[searchParams.genres,searchParams.show,searchParams.titleregex])

    return(
        <div className="w-full py-2 flex gap-2 flex-col items-center">
            {(searchParams.titleregex&&searchParams.titleregex!=='(.*?)')?
                <div className="w-full max-w-[1000px] text-left">
                    <h1 className="text-bright-blue text-2xl">Search result for: {searchParams.titleregex}</h1>
                </div>
                :
                <></>}
            <FilterGamesInputs searchParams={searchParams} changeParams={changeParams}/>
            <BrowseGamePages pages={pages} turnPage={()=>setCurrPage({page:currPage.page+1})}/>
            {isLoading?
                <LoadingSpinner/>:<></>
            }
        </div>
    )
}