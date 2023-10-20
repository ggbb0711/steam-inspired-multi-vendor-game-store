import useStrInputs from "../../../util/hooks/useStrInputs"
import { BsSearch } from "react-icons/bs"

export default function TitleSearch({changeTitle}){
    const [strInput,setStrInput]=useStrInputs({title:''})


    return(
        <div className="flex-1 w-full">
            <div className="relative">
                <input className="w-full bg-neutral-gray border-none outline-none hover:brightness-125 text-text-white p-2" type="text" name="title" id="title" onChange={setStrInput} value={strInput.title} placeholder="Search games"/>
                <button className="p-2 right-0 h-full absolute bg-bright-blue" onClick={()=>{
                        changeTitle(strInput.title)
                    }}>
                    <BsSearch/>
                </button>
            </div>
        </div>
    )
}