import { useEffect, useState } from "react"
import useStrInputs from "../../util/hooks/useStrInputs"
import { Link } from "react-router-dom"
import LoadingSpinner from "../../util/components/LoadingSpinner"
import fetchData from "../../util/functions/fetchData"
import { useAlertContext } from "../../util/components/Context/AlertContext"

export default function RegisterFormPage({userType}){
    const [successfullRegister,setSuccessfullRegister]=useState(false)
    const [inputs,setInputs]=useStrInputs({name:'',email:'',password:''})
    const [errorMess,setStrErrMess]=useState({name:'',email:'',password:'',system:''})
    const [isLoading,setIsLoading]=useState(false)
    const {setAlert}=useAlertContext()

    async function handleSubmit(e){
        setIsLoading(true)

        await fetchData({
            url:`/api/register/${userType}`,
            config:{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({...inputs,type:userType})
            }
        },successCb,failCb)

        setIsLoading(false)
        return
    }

    function successCb(result){
        setSuccessfullRegister(true)
    }

    function failCb(err){
        setStrErrMess(oldErrorMess=>{
            for (const error in err){
                oldErrorMess[error]=err[error]
            }
            return oldErrorMess
        })
    }

    useEffect(()=>{
        if(errorMess.system){
            setAlert('fail',errorMess.system)

            setTimeout(()=>setStrErrMess({...errorMess,system:''}),4000)
        }
    },[errorMess.system])


    function handleInputs(e){
        setInputs(e)
        let clone={...errorMess}
        clone[e.target.name]=''
        clone.system=''
        setStrErrMess(clone)
    }

    return(
        <section className="min-h-screen bg-very-dark-blue flex justify-center items-center relative">
            {(!successfullRegister?
                isLoading?
                <LoadingSpinner></LoadingSpinner>
                :(
                    <form className="h-[500px] max-w-[600px] bg-neutral-black flex flex-col justify-center items-center gap-2 p-4" onSubmit={handleSubmit}>
                        <h1 className="text-bright-blue justify-self-start">Register as a {userType}</h1>
                        <div className="max-w-[250px]">
                            <label className="block mb-2 text-bright-blue cursor-pointer" htmlFor="name">Name:</label>
                            <input className="bg-neutral-gray border-none outline-none hover:brightness-125 text-text-white p-2" type="text" id="name" name="name" value={inputs.name} onChange={handleInputs} />
                            <p className="text-xs text-red-500">{errorMess.name}</p>
                        </div>

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
                        <input className="px-8 py-2 cursor-pointer text-text-white bg-gradient-to-r from-very-bright-blue to-bright-blue hover:brightness-125" type="submit" value={'Register'}/>
                        <Link className="text-bright-blue" to={'/login'}>Login</Link>
                    </form>
                ):
                <div className="flex justify-center items-center flex-col">
                    <h1 className="text-bright-blue">Please check your email for a verification email</h1>
                    <Link to={'/login'} className="text-bright-blue">Login</Link>
                </div>
            )}
        </section>
    )
}