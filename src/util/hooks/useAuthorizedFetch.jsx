export default function useAuthorizedFetch(){
    
    const authorizedFetch=async(url,config)=>{
        

    
        const response=await fetch(url,{
            ...config,
            credentials: 'include',
            withCredntials: true,
        })

        
        if(response.status===401||response.status===403){
            const responseAccessToken=await fetch(`/api/refreshtoken`,{
                credentials: 'include',
                withCredntials: true,
            })

            console.log(responseAccessToken)
        
            if(responseAccessToken.status===403||responseAccessToken.status===401){
                return responseAccessToken
            }
    
            const accessToken=await responseAccessToken.json()
    
            localStorage.setItem('accesstoken',accessToken.accessToken)
            config.headers= {...config.headers,authorization:'Bearer '+ accessToken.accessToken}
            const newResponse=await fetch(url,{
                ...config,
                credentials: 'include',
                withCredntials: true,
            })
            return newResponse
        }
    
        return response
    }
    return {authorizedFetch}
}