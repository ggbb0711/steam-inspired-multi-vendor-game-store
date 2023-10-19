const checkOutSchema={
    items:{
        trim:true,
        notEmpty:true,
        errorMessage:'The cart must not be empty',
        custom:{
            options: async (value)=>{
                console.log(value)
                if(!Array.isArray(value)){
                    return Promise.reject('The cart must be an array')
                }
                //Checks for length
                if(value.length<1){
                    return Promise.reject('There must be at least one item in the cart')
                }
            }
        }
    }
}

export {checkOutSchema}