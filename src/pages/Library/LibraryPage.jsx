import { useState, useEffect } from "react"
import { useAlertContext } from "../../util/components/Context/AlertContext"
import { useSearchParamsSite } from "../../util/hooks/useSearchParamsSite"
import LibraryInputs from "./Library Inputs/LibraryInputs"
import LibraryCardContainer from "./Library Page/LibraryCardContainer"
import Pagination from "../../util/components/Pagination"
import LoadingSpinner from "../../util/components/LoadingSpinner"
import { useUserContext } from "../../util/components/Context/userContex"
import fetchData from "../../util/functions/fetchData"

export default function LibraryPage(){
    const {setAlert}=useAlertContext()
    const {userInfo}=useUserContext()
    const [isLoading,setIsLoading]=useState(true)
    const [page,setPage]=useState([])
    const [maxPage,setMaxPage]=useState(1)
    const [searchParams,setSearchPrams]=useSearchParamsSite([
        {
            name:'titleregex',
            defaultValue:'(.*?)'
        },
        {
            name:'show',
            defaultValue:'title',
        },
        {
            name:'page',
            defaultValue:1,
        }
    ])

    function successCb(result){
        setMaxPage(Math.ceil(result.totalGame/24))
        setPage((result.games.length===0)?null:result.games)
    }

    function failCb(err){
        setAlert('fail',err.system)
    }

    

    useEffect(()=>{
        if(userInfo.userId){
            const accessToken=localStorage.getItem('accesstoken')
            setPage([])
            setIsLoading(true)
            fetchData({
                url:`/api/library?titleregex=${searchParams.titleregex}&show=${searchParams.show}&page=${Number(searchParams.page)-1}`,
                config:{ headers:{ authorization: 'Bearer '+ accessToken} }
            },successCb,failCb,true)
            .finally(()=>setIsLoading(false))
        }
    },[userInfo.userId,searchParams.show,searchParams.titleregex,searchParams.page])



    return(
        <div className="w-full max-w-[1000px] mx-auto py-2 flex justify-center">
                <div className="w-full flex flex-col gap-4">
                    <h1 className="pl-4 text-2xl text-bright-blue">{userInfo.name}'s library</h1>
                    <p className={`pl-4 text-xl text-very-bright-blue ${searchParams.titleregex&&searchParams.titleregex!=='(.*?)'?'':'hidden'}`}>Result for {searchParams.titleregex}:</p>
                    <LibraryInputs searchParams={searchParams} changeParams={setSearchPrams}/>
                    <div className="w-full min-h-[500px] relative flex flex-col justify-start items-center my-2">
                        <LibraryCardContainer page={page}/>
                        <div className={`w-full h-full absolute top-0 left-0 bg-black/50 ${isLoading?'flex justify-center items-center':'hidden'}`}>
                            <LoadingSpinner></LoadingSpinner>
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <Pagination currentPage={Number(searchParams.page)} setCurrPage={(currPage)=>setSearchPrams({...searchParams,page:currPage})} maxPage={maxPage} siblingCount={2}/>
                    </div>
                    
                </div>
        </div>
    )
}