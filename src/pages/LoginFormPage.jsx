import { useState } from "react"
import useStrInputs from "../util/hooks/useStrInputs"
import { Link, useNavigate } from "react-router-dom"
import {useUserContext} from "./components/userContex"
import LoadingSpinner from "./components/LoadingSpinner"

export default function LoginFormPage({userType}){
    const [inputs,setInputs]=useStrInputs({email:'',password:''})
    const [errorMess,setStrErrMess]=useState({email:'',password:'',system:''})
    const [isLoading,setIsLoading]=useState(false)
    const {setUserInfo}=useUserContext()
    const navigate=useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        setIsLoading(true)

        const result=await submitInputToServer()
        if(result.successfull){
            setUserInfo({
                name:result.userName,
                gmail:'',
                userType:'dev',
                userId:result.userId
            })
            navigate('/devboard')
        }
        else{setStrErrMess(oldErrorMess=>{
            for (const error in result){
                oldErrorMess[error]=result[error]
            }
            return oldErrorMess
        })}
        setIsLoading(false)
        return
    }

    async function submitInputToServer(){
        try{
            const response=await fetch(`http://localhost:8080/api/login/${userType}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({...inputs})
            })
            const data=await response.json()
            return data
        }
        catch(err){
            return err
        }
    }

    function handleInputs(e){
        setInputs(e)
        let clone={...errorMess}
        clone[e.target.name]=''
        clone.system=''
        setStrErrMess(clone)
    }

    return(
        <div className="min-h-screen bg-very-dark-blue flex justify-center items-center">
            {(isLoading)?
            <LoadingSpinner></LoadingSpinner>:
                <form className="h-[500px] max-w-[600px] bg-neutral-black flex flex-col justify-center items-center gap-2 p-4" onSubmit={handleSubmit}>
                    <h1 className="text-bright-blue justify-self-start">Login as a {userType}</h1>
                    <div className="max-w-[250px]">
                        <label className="block mb-2 text-bright-blue cursor-pointer" htmlFor="email">Email:</label>
                        <input className="bg-neutral-gray border-none outline-none hover:brightness-125 text-text-white p-2" type="email" id="email" name="email" value={inputs.email} onChange={handleInputs} />
                        <p className="text-xs text-red-500">{errorMess.email}</p>
                    </div>

                    <div className="max-w-[250px]">
                        <label className="block mb-2 text-bright-blue cursor-pointer" htmlFor="password">Password:</label>
                        <input className="bg-neutral-gray border-none outline-none hover:brightness-125 text-text-white p-2" type="password" id="password" name="password" value={inputs.password} onChange={handleInputs}/>
                        <p className="text-xs text-red-500">{errorMess.password}</p>
                    </div>
                    <p className="text-xs text-red-500">{errorMess.system}</p>
                    <input className="px-8 py-2 cursor-pointer text-text-white bg-gradient-to-r from-very-bright-blue to-bright-blue hover:brightness-125" type="submit" value={'Login'}/>
                    <Link className="text-bright-blue" to={'/'}>Register</Link>
                </form>
            }
        </div>
    )
}