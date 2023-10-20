import { useState } from "react"
import useStrInputs from "../../util/hooks/useStrInputs"
import { Link, useNavigate } from "react-router-dom"
import LoadingSpinner from "../../util/components/LoadingSpinner"
import fetchData from "../../util/functions/fetchData" 

export default function LoginFormPage({userType}){
    const [inputs,setInputs]=useStrInputs({email:'',password:''})
    const [errorMess,setStrErrMess]=useState({email:'',password:'',system:''})
    const [isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        setIsLoading(true)

        await fetchData({
            url:`/api/login/${userType}`,
            config:{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                credentials: "include",
                body: JSON.stringify({...inputs})
            }
        },successCb,failCb)
        
        setIsLoading(false)
        return
    }

    function successCb(result){
        localStorage.setItem('accesstoken',result.accessToken)
        navigate(userType==='dev'?'/devboard/dev':'/')
    }

    function failCb(err){
        setStrErrMess(oldErrorMess=>{
            for (const error in err){
                oldErrorMess[error]=err[error]
            }
            return oldErrorMess
        })
    }


    function handleInputs(e){
        setInputs(e)
        let clone={...errorMess}
        clone[e.target.name]=''
        clone.system=''
        setStrErrMess(clone)
    }

    return(
        <section className="min-h-screen bg-very-dark-blue flex justify-center items-center">
            {(isLoading)?
            <LoadingSpinner></LoadingSpinner>:
                <form className="h-[500px] max-w-[600px] bg-neutral-black flex flex-col justify-center items-center gap-2 p-4" onSubmit={handleSubmit}>
                    <h1 className={`${userType==='dev'?'text-bright-blue':'text-dark-green'} justify-self-start`}>Login as a {userType}</h1>
                    <div className="max-w-[250px]">
                        <label className={`block mb-2 ${userType==='dev'?'text-bright-blue':'text-dark-green'} cursor-pointer`} htmlFor="email">Email:</label>
                        <input className="bg-neutral-gray border-none outline-none hover:brightness-125 text-text-white p-2" type="email" id="email" name="email" value={inputs.email} onChange={handleInputs} />
                        <p className="text-xs text-red-500">{errorMess.email}</p>
                    </div>

                    <div className="max-w-[250px]">
                        <label className={`block mb-2 ${userType==='dev'?'text-bright-blue':'text-dark-green'} cursor-pointer`} htmlFor="password">Password:</label>
                        <input className="bg-neutral-gray border-none outline-none hover:brightness-125 text-text-white p-2" type="password" id="password" name="password" value={inputs.password} onChange={handleInputs}/>
                        <p className="text-xs text-red-500">{errorMess.password}</p>
                    </div>
                    <p className="text-xs text-red-500">{errorMess.system}</p>
                    <input className={`px-8 py-2 cursor-pointer text-text-white bg-gradient-to-r ${userType==='dev'?'from-very-bright-blue to-bright-blue':'to-light-green/40 from-dark-green'} hover:brightness-125`} type="submit" value={'Login'}/>
                    <button className={`bg-gradient-to-r hover:brightness-125 ${userType==='dev'?'to-light-green/40 from-dark-green':'from-very-bright-blue to-bright-blue'} text-text-white cursor-pointer p-2`}><Link to={`/login/${userType==='dev'?'customer':'dev'}`}>Login as {userType==='dev'?'customer':'dev'}</Link></button>
                    <Link className="text-bright-blue" to={'/register'}>Register</Link>
                </form>
            }
        </section>
    )
}