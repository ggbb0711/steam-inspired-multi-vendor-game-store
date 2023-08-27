export default async function getUserData(){
    try{
        const accessToken=localStorage.getItem('accesstoken')
        const responseAccessToken=await fetch(`${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_API_PORT}/api/getuserdata`,{ headers:{ authorization: 'Bearer '+ accessToken} })
        const AccessToken=await responseAccessToken.json()

        return AccessToken
    }
    catch(err){
        console.log(err)
        return { successful:false, message:'Something wrong with the server' }
    }
}