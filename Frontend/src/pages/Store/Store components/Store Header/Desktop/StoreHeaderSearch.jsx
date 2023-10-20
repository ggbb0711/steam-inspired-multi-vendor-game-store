import { useNavigate } from "react-router-dom"
import useStrInputs from "../../../../../util/hooks/useStrInputs"
import { BsSearch } from "react-icons/bs"

export default function StoreHeaderSearch(){
    const [strInput,setStrInput]=useStrInputs({search:''})
    const navigate=useNavigate()
    
    return(
        <div className="flex">
            <input className="bg-neutral-black border-none outline-none hover:brightness-125 text-text-white p-2" type="text" id='search' name="search" value={strInput.search} onChange={setStrInput} placeholder="Search"/>
            <button className="p-2 bg-bright-blue" onClick={()=>{
                        setStrInput({
                            target:{
                                name:'search',
                                value:''
                            }
                        })
                        navigate(`/browse?titleregex=${strInput.search}`)
                    }}>
                    <BsSearch/>
            </button>
        </div>
    )
}