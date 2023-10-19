const reviewSchema={
    title:{
        trim:true,
        notEmpty:true,
        errorMessage:'The title field cannot be empty',
        isLength:{
            errorMessage:'Title must contain at least 1 word',
            min:1
        },
    },
    content:{
        trim:true,
        notEmpty:true,
        errorMessage:'The content field cannot be empty',
        custom:{
            options: async (value)=>{
                
                if(value.length<30){
                    return Promise.reject('Content must contain at least 30 words')
                }
            }
        }
    }
}

export {reviewSchema}