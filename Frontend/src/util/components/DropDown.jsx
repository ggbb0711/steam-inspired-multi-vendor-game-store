import { useState } from "react"
import {AiFillCaretDown} from 'react-icons/ai'

export default function DropDown({inputs,currValue}){
    const [isActive,setIsActive]=useState(false)



    return(
        <div className="w-full h-full relative">
            <div className={`${isActive?'bg-very-bright-blue text-text-white':'bg-neutral-gray text-bright-blue'} p-2 hover:bg-very-bright-blue hover:text-text-white`}>
                <button className="w-full h-full flex justify-between items-center" onClick={(e)=>{
                    e.preventDefault()
                    setIsActive(!isActive)
                    }}>{currValue} <AiFillCaretDown/></button>
            </div>
            <ul className={`absolute ${isActive?'block':'hidden'}`}>
                {inputs.map((input,i)=>
                    <li className="bg-bright-blue text-text-white hover:bg-very-bright-blue" key={i} >
                       <button className="w-full h-full text-sm py-2 px-4 text-left" onClick={(e)=>{
                        input.cb(e)
                        setIsActive(false)
                       }}>{input.name}</button> 
                    </li>
                )}
            </ul>
        </div>
    )
}