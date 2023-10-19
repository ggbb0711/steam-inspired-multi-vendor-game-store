import { devModel } from '../../api/models/devModel.js'
import { customerModel } from '../../api/models/customerModel.js'
import bcrypt from 'bcrypt'


const loginSchema={
    email:{
        trim:true,
        isEmail:{ errorMessage: "Email is invalid" },
        isLength:{
            errorMessage:'Email must not be empty',
            min:1
        },
        custom:{
            options: async(value,{req}) => {
                const model=(req.params.usertype==='dev')?devModel:customerModel

                const user=await model.findOne({email:value})

                if (!user) return Promise.reject('The user with this email does not exist')
            }
        }
    },
    password:{
        trim:true,
        matches: {
            errorMessage:'Password must contain at least 8 character, including at least one number',
            options: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g,
        },
        custom:{
            options: async(value,{req}) => {
                const {email} = req.body
                const model=(req.params.usertype==='dev')?devModel:customerModel
                const user=await model.findOne({email})
                if(!user) return Promise.reject('Please register with the email')
                const match=await bcrypt.compare(value,user.password)
            
                if (!match) return Promise.reject('Password does not match')
            }
        }
    }
}

export default loginSchema