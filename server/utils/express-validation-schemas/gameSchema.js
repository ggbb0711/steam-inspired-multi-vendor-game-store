

const gameSchema={
    title:{
        notEmpty:true,
        errorMessage:'Title cannot be empty',
        isLength:{
            errorMessage:'Title must contain at least 1 word',
            min:1
        },
    },
    genres:{
        notEmpty:true,
        errorMessage:'There must be at least one genre tag',
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
        notEmpty:true,
        errorMessage:'Price cannot be empty',
    },
    desc:{
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
    },
    carouselImages:{
        notEmpty:true,
        errorMessage:'There must be at least one image',
    }
}

export default gameSchema