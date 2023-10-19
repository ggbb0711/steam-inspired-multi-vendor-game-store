import { useSearchParams } from "react-router-dom";

export function useSearchParamsSite(queries){
    const [searchParams,setSearchParams]=useSearchParams()
    const searchParamState={}
    for(const {name,defaultValue} of queries){
        searchParamState[name]=searchParams.get(name)||defaultValue
    }

    const setSearchParamsState=(newState)=>{
        setSearchParams({...searchParamState,...newState})
    }

    return[searchParamState,setSearchParamsState]
}