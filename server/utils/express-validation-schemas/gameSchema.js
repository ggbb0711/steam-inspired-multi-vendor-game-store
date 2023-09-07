

const gameSchema={
    title:{
        trim:true,
        notEmpty:true,
        errorMessage:'The title field cannot be empty',
        isLength:{
            errorMessage:'Title must contain at least 1 word',
            min:1
        },
    },
    genres:{
        notEmpty:true,
        errorMessage:'The genres field cannot be empty',
        custom:{
            options: async (value)=>{
                if(!Array.isArray(value)){
                    return Promise.reject('Genres field must be an array')
                }
                if(value.length<1){
                    return Promise.reject('There must be at least one genre tag')
                }
            }
        }
    },
    "genres .*":{
        notEmpty:true,
        errorMessage:'Genre tag cannot be empty',
        isLength:{
            errorMessage:'Genre tag must contain at least 1 word',
            min:1
        },
        toLowerCase:true,
    },
    price:{
        trim:true,
        notEmpty:{ errorMessage:'The price field cannot be empty' },
        custom:{
            options:(value,{req})=>{
                value=Number(value)
                req.body.price=value.toFixed(2)
                console.log(req.body.price)
                if(value<0){
                    return Promise.reject('Price cannot be lower than 00.00')
                }
            }
        }
    },
    desc:{
        trim:true,
        notEmpty:true,
        errorMessage:'Description cannot be empty',
        isLength:{
            errorMessage:'Description must contain at least 50 words',
            min:50
        },
    },
    thumbnailImage:{
        notEmpty:true,
        errorMessage:'Thubmnail image cannot be empty',
        custom:{
            options: async (value)=>{
                if(!Array.isArray(value)){
                    return Promise.reject('ThumbnailImage field must be an array')
                }
                if(value.length<1){
                    return Promise.reject('There must be one thumbnailImage')
                }
            }
        }
    },
    carouselImages:{
        notEmpty:true,
        errorMessage:'There must be at least one image',
        custom:{
            options: async (value)=>{
                if(!Array.isArray(value)){
                    return Promise.reject('CarouselImages field must be an array')
                }
                if(value.length<1){
                    return Promise.reject('There must be at least one image')
                }
            }
        }
    }
}

export default gameSchema