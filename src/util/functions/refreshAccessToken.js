export default async function refreshAccessToken(){
    try{
        const responseRefreshToken=await fetch(`${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_API_PORT}/api/refreshtoken`,{
            credentials: 'include',
            withCredntials: true,
        })
        const refreshToken=await responseRefreshToken.json()

        return refreshToken
    }
    catch(err){
        console.log(err)
        return { successful:false, message:'Something wrong with the server' }
    }
}