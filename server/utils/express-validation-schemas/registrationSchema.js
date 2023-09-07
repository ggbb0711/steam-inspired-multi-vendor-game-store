import { devModel } from '../../api/models/devModel.js'
import { customerModel } from '../../api/models/customerModel.js'


const registrationSchema={
    name:{
        trim:true,
        notEmpty:true,
        errorMessage:'Name cannot be empty',
        custom:{
            options: async(value,{req}) => {
                const model=(req.params.usertype==='dev')?devModel:customerModel

                const isModel=await model.findOne({name:value})

                if (Object.keys(isModel).length>0) return Promise.reject('A user with this name has alredy existed')
            }
        }
    },
    email:{
        trim:true,
        notEmpty:{ errorMessage:'Email must not be empty' },
        exists:{ errorMessage:'Email is required' },
        isEmail:{ errorMessage:'Email is invalid' },
        custom:{
            options: async(value,{req}) => {
                const model=(req.params.usertype==='dev')?devModel:customerModel

                const isModel=await model.findOne({email:value})

                if (Object.keys(isModel).length>0) return Promise.reject('A user with this email has alredy existed')
            }
        },
        errorMessage:'Bla bal'
    },
    password:{
        trim:true,
        matches: {
            options: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g,
        },
        errorMessage:'Password must contain at least 8 character, including at least one number',
    }
}

export default registrationSchema