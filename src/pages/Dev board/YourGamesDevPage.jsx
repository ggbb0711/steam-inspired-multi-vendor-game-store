import { useEffect, useState } from "react"
import uuid from "react-uuid"
import DevProductCard from "../../util/components/ProductCards/DevProductCard"
import { Link, useSearchParams } from "react-router-dom"
import { useUserContext } from "../../util/components/Context/userContex"
import LoadingSpinner from "../../util/components/LoadingSpinner"
import { useAlertContext } from "../../util/components/Context/AlertContext"
import DropDown from "../../util/components/DropDown.jsx"
import Pagination from "../../util/components/Pagination"
import useStrInputs from "../../util/hooks/useStrInputs"
import {BsSearch} from 'react-icons/bs'
import {GrFormAdd} from 'react-icons/gr'
import {AiFillDelete} from 'react-icons/ai'
import { useSearchParamsSite } from "../../util/hooks/useSearchParamsSite"
import fetchData from "../../util/functions/fetchData"



export default function YourGamesDevPage(){
    const [searchParams]=useSearchParams()
    const [games,setGames]=useState([])
    const [isReloading,setIsReloading]=useState(false)
    const [isFetchingData,setIsFetchingData]=useState(false)
    const [inputs,setInputs]=useStrInputs({title:searchParams.get('titleregex')==="(.*?)"?'':searchParams.get('titleregex'),genre:''})
    const [genreList,setGenreList]=useState(searchParams.get('genres')?searchParams.get('genres').split(','):[])
    const {userInfo}=useUserContext()
    const {setAlert}=useAlertContext()
    const [searchParamsObject,setSearchParamsObject]=useSearchParamsSite([
        {
            name:'genres',
            defaultValue:''
        },
        {
            name:'page',
            defaultValue:'1'
        },
        {
            name:'skipvalue',
            defaultValue:'9'
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
    const [showValue,setShowValue]=useState(searchParamsObject.show)
    const showObject={
        'createdAt-reverse':'Newest',
        'createdAt':'Oldest',
        'title':'A-Z',
        'title-reverse':'Z-A',
        'price-reverse':'Most expansive',
        'price':'Least expansive',
    }
    const [maxPage,setMaxPage]=useState(1)

    function successCb(result){
        setGames(result.games)
        setMaxPage(Math.ceil(result.totalGame/searchParamsObject.skipvalue))
    }

    function failCb(err){
        setAlert('fail',err.system)
    }

    async function getGames(){
        const accessToken=localStorage.getItem('accesstoken')
        await fetchData({
            url:`/api/devboard/yourgame/?page=${parseInt(searchParamsObject.page)-1}&titleregex=${searchParamsObject.titleregex}&genres=${searchParamsObject.genres}&show=${searchParamsObject.show}`,
            config:{ headers:{ authorization: 'Bearer '+ accessToken} }
        },successCb,failCb,true)
    }

    useEffect(()=>{
        setInputs({target:{ name:'title', value:searchParamsObject.titleregex==='(.*?)'?'':searchParamsObject.titleregex }})
    },[searchParamsObject.titleregex])

    useEffect(()=>{
        setGenreList(searchParamsObject.genres?searchParamsObject.genres.split(','):[])
    },[searchParamsObject.genres])

    useEffect(()=>{
        setShowValue(showObject[searchParamsObject.show])
    },[searchParamsObject.show])

    useEffect(()=>{
        if(userInfo.name){
            setIsReloading(true)
            getGames().finally(()=>setIsReloading(false))
        }
    },[userInfo.name])

    useEffect(()=>{
        setIsFetchingData(true)
        getGames().finally(()=>setIsFetchingData(false))
    },[searchParamsObject.titleregex,searchParamsObject.genres,searchParamsObject.page,searchParamsObject.show])
    
    return (
        <section className="max-w-[1000px] py-6 m-auto">
            {isReloading?
                <div className="h-full w-full flex justify-center items-center">
                    <LoadingSpinner></LoadingSpinner>
                </div>
                :
                <div>
                    <div className="flex flex-col justify-between items-center gap-2 md:flex-row">
                        <div className="flex justify-center items-center flex-col gap-2">
                            <div className="max-w-[250px]">
                                <div className="relative">
                                    <input className="bg-neutral-gray border-none outline-none hover:brightness-125 text-text-white p-2" type="text" name="title" id="title" onChange={setInputs} value={inputs.title||''} placeholder="Search games"/>
                                    <button className="p-2 right-0 h-full absolute bg-bright-blue" onClick={()=>{
                                            setSearchParamsObject({...searchParamsObject,titleregex:inputs.title,page:1})
                                        }}>
                                        <BsSearch/>
                                    </button>
                                </div>
                            </div>
                            <div className="max-w-[250px] min-h-[40px] p-2 pr-[32px] flex flex-wrap gap-2 hover:brightness-125 bg-neutral-gray relative">
                                {genreList.map((genre,i)=><span key={uuid()} className="p-2 rounded bg-bright-blue text-text-white relative group cursor-pointer">
                                    <button className="bg-neutral-gray/50 w-full h-full items-center justify-center absolute top-0 left-0 text-red-500 hidden group-hover:flex"
                                    onClick={async()=>{
                                        let clone=[...genreList]
                                        clone.splice(i,1)
                                        setSearchParamsObject({...searchParamsObject,genres:clone.join(),page:1})
                                    }}> 
                                    <AiFillDelete/></button>
                                    {genre}
                                </span>)}
                                <input className="bg-inherit flex-1 p-2 min-w-[50%] border-none outline-none text-text-white" type="text" name="genre" id="genre" value={inputs.genre} placeholder="Add tag to filter" onChange={(e)=>{
                                    if(e.target.value.length<=20){     
                                        setInputs(e)
                                    }
                                }}/>
                                <button className="p-2 h-full absolute top-0 right-0 bg-bright-blue text-text-white" onClick={async (e)=>{
                                    if(inputs.genre&&genreList.length<5){
                                        setSearchParamsObject({...searchParamsObject,genres:[...genreList,inputs.genre].join(),page:1})
                                        setInputs({target:{name:'genre',value:''}})
                                    }
                                }}>
                                    <GrFormAdd/>
                                </button>
                            </div>
                            <div className="max-w-[250px] w-full z-[8]">
                                <p className="text-text-white">Show:</p>
                                <DropDown currValue={showValue} inputs={[
                                    {
                                        name:'Newest',
                                        cb:()=>{
                                            setSearchParamsObject({...searchParamsObject,page:1,show:'createdAt-reverse'})
                                        }
                                    },
                                    {
                                        name:'Oldest',
                                        cb:()=>{
                                            setSearchParamsObject({...searchParamsObject,page:1,show:'createdAt'})
                                        }
                                    },
                                    {
                                        name:'A-Z',
                                        cb:()=>{
                                            setSearchParamsObject({...searchParamsObject,page:1,show:'title'})
                                        }
                                    },
                                    {
                                        name:'Z-A',
                                        cb:()=>{
                                            setSearchParamsObject({...searchParamsObject,page:1,show:'title-reverse'})
                                        }
                                    },
                                    {
                                        name:'Most expansive',
                                        cb:()=>{
                                            setSearchParamsObject({...searchParamsObject,page:1,show:'price-reverse'})
                                        }
                                    },
                                    {
                                        name:'Least expansive',
                                        cb:()=>{
                                            setSearchParamsObject({...searchParamsObject,page:1,show:'price'})
                                        }
                                    },
                                ]}/>
                            </div>
                        </div>
                        <Link className="crusor-pointer relative" to={'/devboard/creategame'}>
                            <div className="h-full rounded flex justify-center items-center bg-very-bright-blue p-4">
                                <h1 className="text-2xl text-text-white">Add new game</h1>
                            </div>
                        </Link>
                    </div>
                    {isFetchingData?
                        <LoadingSpinner/>:
                        <>
                            {games.length===0?
                            <div className="w-full min-h-[500px] my-4 bg-gray-bright-blue flex justify-center items-center">
                                <p className="text-2xl text-bright-blue">404 MISSING</p>
                            </div>:
                            <>
                                <section className="flex flex-col gap-2 my-2">
                                    {games.map((game)=>{
                                        return <DevProductCard key={Math.random()} link={`/devboard/devgame/${game._id}`} img={game.images.thumbnailImage.src} title={game.title} price={game.price} genres={game.genres} isPublished={game.isPublished}></DevProductCard>}
                                    )}                 
                                </section>
                                <div className="flex justify-center">
                                    <Pagination currentPage={parseInt(searchParamsObject.page)} setCurrPage={async(page)=>{
                                            setSearchParamsObject({...searchParamsObject,page:page})
                                        }} maxPage={parseInt(maxPage)} siblingCount={1}/>
                                </div>  
                            </>}
                            
                        </>
                    }
                    
                </div>
            }
        </section>
        
    )    
}