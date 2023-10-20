import useStrInputs from "../../../../../util/hooks/useStrInputs"
import { BsSearch } from "react-icons/bs"
import { useNavigate } from "react-router-dom"

export default function StoreHeaderSearchMobile({endActive}){
    const [strInput,setStrInput]=useStrInputs({search:''})
    const navigate=useNavigate()
    return(
        <div className="flex w-full h-full">
            <input className="bg-neutral-gray flex-1 min-w-[0px] border-none outline-none hover:brightness-125 text-text-white p-2" type="text" name="search" id="search-mobile" value={strInput.search} onChange={setStrInput} placeholder="Search"/>
            <button className="p-2 bg-bright-blue" onClick={()=>{
                        endActive()
                        navigate(`/browse?titleregex=${strInput.search}`)
                    }}>
                    <BsSearch/>
            </button>
        </div>
    )
}