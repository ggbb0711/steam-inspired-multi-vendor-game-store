import useAuthorizedFetch from "../hooks/useAuthorizedFetch"

export default async function fetchData({url,config},successcb,failcb,isAuthorizedRoute){
    const {authorizedFetch}=useAuthorizedFetch()
    console.log(process.env.ENV,process.env.BASE_SERVER_URL)
    if(process.env.ENV==='PRODUCTION') url=process.env.BASE_SERVER_URL+'/'+url
    
    try{
        let response
        if(isAuthorizedRoute) response= await authorizedFetch(url,config)
        else{response=await fetch(url,{...config})}
        const result=await response.json()
        if(response.status<400){
            const cbResult=successcb(result)
            return cbResult
        }
        throw result.err
    }
    catch(err){
        console.log(err)
        const cbResult=failcb(err)
        return cbResult
    }
}