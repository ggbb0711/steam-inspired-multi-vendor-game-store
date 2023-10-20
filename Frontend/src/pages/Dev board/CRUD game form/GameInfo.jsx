import { AiFillDelete } from "react-icons/ai"
import uuid from "react-uuid"



export default function GameInfo({strInputs,setStrInput,setErrMess,errorMess,genreList,setGenreList}){
    return(
        <div className="w-full flex flex-col justify-between items-center gap-3">
            <div className="flex justify-between flex-wrap gap-3 w-full">
                <div className="max-w-[250px] flex-1">
                    <label className="block mb-2 text-bright-blue cursor-pointer" htmlFor="title">Title:</label>
                    <input className="bg-neutral-gray border-none outline-none hover:brightness-125 text-text-white p-2" type="text" id="title" name="title" value={strInputs.title} onChange={setStrInput} />
                    <p className="text-xs text-red-500">{errorMess.title}</p>
                </div>

                <div className="max-w-[250px] flex-1 relative">
                    <label className="block mb-2 text-bright-blue cursor-pointer" htmlFor="genres">Genres:</label>
                    <input className="bg-neutral-gray mb-2 border-none outline-none hover:brightness-125 text-text-white p-2" type="text" id="genres" name="genres" value={strInputs.genres} 
                    onChange={(e)=>{
                        if(e.target.value.length<=20){
                            setStrInput(e)
                        }
                    }} />
                    <button className="p-2 absolute right-0 bg-bright-blue text-text-white" onClick={(e)=>{
                        e.preventDefault()
                        if(strInputs.genres&&genreList.length<5){
                            if(!genreList.includes(strInputs.genres)){
                                setGenreList([...genreList,strInputs.genres])
                                setStrInput({target:{name:'genres',value:''}})
                            }
                            else{
                                setErrMess({...errorMess,genres:'This tag has already added'})
                            }
                        }
                    }}>Add</button>
                    <p className="text-bright-blue">Genre tags:{genreList.length}/5</p>
                    <div className="flex flex-wrap gap-2 bg-neutral-gray p-2">
                        {genreList.map((genre,i)=><span key={uuid()} className="p-2 rounded bg-bright-blue text-text-white relative group cursor-pointer">
                            <button className="bg-neutral-gray/50 w-full h-full items-center justify-center absolute top-0 left-0 text-red-500 hidden group-hover:flex"
                            onClick={(e)=>{
                                e.preventDefault()
                                let clone=[...genreList]
                                clone.splice(i,1)
                                setGenreList(clone)
                            }}> 
                            <AiFillDelete/></button>
                            {genre}
                        </span>)}
                    </div>
                    <p className="text-xs text-red-500">{errorMess.genres}</p>
                </div>
            </div>
            <div className="flex justify-between flex-wrap gap-3 w-full">
                <div className="max-w-[250px] flex-1">
                    <label className="block mb-2 text-bright-blue cursor-pointer" htmlFor="price">Price($):</label>
                    <input className="bg-neutral-gray border-none outline-none hover:brightness-125 text-text-white p-2" type="number" id="price" name="price" value={strInputs.price} onKeyDown={
                        (e)=>{if(['e','E','+','-'].includes(e.key)) e.preventDefault()}} 
                        onChange={setStrInput}/>
                    <p className="text-xs text-red-500">{errorMess.price}</p>
                </div>

                <div className="max-w-[250px] flex-1">
                    <label className="block mb-2 text-bright-blue cursor-pointer" htmlFor="desc">Description:</label>
                    <textarea className="bg-neutral-gray border-none outline-none hover:brightness-125 text-text-white p-2" id="desc" name="desc" value={strInputs.desc} onChange={setStrInput}/>
                    <p className="text-xs text-red-500">{errorMess.desc}</p>
                </div>
            </div>
        </div>
    )
}