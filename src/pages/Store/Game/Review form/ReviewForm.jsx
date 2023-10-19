import { useEffect, useState } from "react"
import useStrInputs from "../../../../util/hooks/useStrInputs"
import DropDown from "../../../../util/components/DropDown"
import { useAlertContext } from "../../../../util/components/Context/AlertContext"
import { useNavigate } from "react-router-dom"
import fetchData from "../../../../util/functions/fetchData"

function ReviewForm({gameId}){
    const [strInput,setStrInput]=useStrInputs({title:'',content:''})
    const [errMess,setErrMess]=useState({title:'',content:'',system:''})
    const [currPoint,setCurrPoint]=useState(1)
    const [isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()
    const {setAlert}=useAlertContext()

    function successCb(result){
        setAlert('success','Review posted successfully')
        navigate(0)
    }

    function failCb(err){
        setErrMess(err)
    }
    
    async function submitReview(){
        try{
            setIsLoading(true)
            const form=new FormData()
            console.log({
                title:strInput.title,
                gameId:gameId,
                content:strInput.content,
                rating:currPoint
            })
            form.append('title',strInput.title)
            form.append('content',strInput.content)
            form.append('gameId',gameId)
            form.append('rating',currPoint)

            const accessToken=localStorage.getItem('accesstoken')
            fetchData({
                url:`/api/review/`,
                config:{
                    method:'POST',
                    // body: form,
                    body:JSON.stringify({
                        title:strInput.title,
                        content:strInput.content,
                        gameId:gameId,
                        rating:currPoint
                    }),
                    headers:{ authorization: 'Bearer '+ accessToken, 'Content-type':"application/json"}
                }
            },successCb,failCb,true)
            .finally(false)
        }
        catch(err){
            console.log(err)
            setAlert('fail',err)
        }
    }

    function submit(e){
        e.preventDefault()
        setIsLoading(true)
        submitReview().finally(()=>setIsLoading(false)) 
    }

    function handleInputs(e){
        setStrInput(e)
        let clone={...errMess}
        clone[e.target.name]=''
        clone.system=''
        setErrMess(clone)
    }

    return(
        <div className="w-full flex flex-col items-center">
            <div className="bg-dark-green w-full max-w-[900px] p-2 text-xl text-white">
                This game is already in your library
            </div>
            <form onSubmit={submit} className="bg-neutral-black w-full relative max-w-[900px] m-auto p-2 flex flex-col gap-2">
                {isLoading?
                    <div className="absolute w-full h-full top-0 left-0 z-[3] bg-black/30">
                        
                    </div>:
                    <></>
                }
                
                <h1 className="text-bright-blue text-xl">Write a review for the game:</h1>
                <div className="w-full">
                    <input className="w-full text-bright-blue bg-neutral-gray border-none outline-none hover:brightness-125 p-2" type="text" name="title" id="title" placeholder="Title" value={strInput.title} onChange={handleInputs}/>
                    <p className="text-sm text-red-500">{errMess.title}</p>
                </div>
                
                <div className="max-w-[90px] max-h-[90px]">
                    <p className="text-bright-blue">Rate it:</p>
                    <DropDown inputs={[
                        {
                            name:'1',
                            cb:(e)=>{
                                e.preventDefault()
                                setCurrPoint(1)
                            }
                        },
                        {
                            name:'2',
                            cb:(e)=>{
                                e.preventDefault()
                                setCurrPoint(2)
                            }
                        },
                        {
                            name:'3',
                            cb:(e)=>{
                                e.preventDefault()
                                setCurrPoint(3)
                            }
                        },
                        {
                            name:'4',
                            cb:(e)=>{
                                e.preventDefault()
                                setCurrPoint(4)
                            }
                        },
                        {
                            name:'5',
                            cb:(e)=>{
                                e.preventDefault()
                                setCurrPoint(5)
                            }
                        }
                    ]} currValue={currPoint}/>
                </div>
                <div className="w-full">
                    <textarea className="w-full bg-neutral-gray border-none outline-none hover:brightness-125 text-text-white p-2" name="content" id="content" value={strInput.content} onChange={handleInputs} cols="30" rows="10" placeholder="Please put your thought about the game here"></textarea>
                    <p className="text-sm text-red-500">{errMess.content}</p>
                </div>
                
                <input className="text-white bg-dark-blue/80 hover:bg-dark-blue cursor-pointer p-2 max-w-[120px]" type="submit" value={'Post review'}/>
            </form>
        </div>
        
    )
}

export {ReviewForm}