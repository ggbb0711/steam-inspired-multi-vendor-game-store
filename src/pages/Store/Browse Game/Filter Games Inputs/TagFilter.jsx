import useStrInputs from "../../../../util/hooks/useStrInputs"
import uuid from "react-uuid"
import { AiFillDelete } from "react-icons/ai"
import { GrFormAdd } from "react-icons/gr"

export default function TagFilter({genreList,deleteCb,addCb}){
    const [inputs,setInputs]=useStrInputs({
        genre:''
    })
    
    return(
        <div className="max-w-[450px] w-full min-h-[40px] p-2 pr-[32px] flex flex-wrap gap-2 hover:brightness-125 bg-neutral-gray relative">
            {genreList.map((genre,i)=><span key={uuid()} className="p-2 rounded bg-bright-blue text-text-white relative group cursor-pointer">
                <button className="bg-neutral-gray/50 w-full h-full items-center justify-center absolute top-0 left-0 text-red-500 hidden group-hover:flex"
                onClick={async()=>{
                    let clone=[...genreList]
                    clone.splice(i,1)
                    deleteCb(clone)
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
                    addCb([...genreList,inputs.genre])
                    setInputs({target:{name:'genre',value:''}})
                }
            }}>
                <GrFormAdd/>
            </button>
        </div>
    )
}