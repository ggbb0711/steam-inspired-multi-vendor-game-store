import { useEffect, useState } from "react";
import useAuthorizedFetch from "./useAuthorizedFetch";

export default function usePagination(fetchUrl,fetchConfig,isAuthorizedFetch,limit,page,cb){
    const [data,setData]=useState()
    const {authorizedFetch}=useAuthorizedFetch()
    
    async function fetchData(){
        try{
            let response
            if(!isAuthorizedFetch) response=await fetch(fetchUrl,fetchConfig)
            response =await authorizedFetch(fetchUrl,fetchConfig)
            
            const result=await response.json()
            setData(result)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchData()
    },[limit,page])

    return [data,fetchData]
}