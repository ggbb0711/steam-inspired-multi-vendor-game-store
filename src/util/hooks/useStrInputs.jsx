import { useState } from "react";

export default function useStrInputs(Inputs){
    const [inputs,setInputs]=useState(Inputs)

    function changeInputs(e){
        const clone={...inputs}
        clone[e.target.name]=e.target.value

        setInputs(clone)
    }

    function resetInputs(){
        const clone={...inputs}

        for(inputName in clone){
            clone[inputName]=''
        }

        setInputs(clone)
    }

    return [inputs,changeInputs,setInputs,resetInputs]
}