import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export default async function sendMail(receiver,subject,text){
    try{
        const transport=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.USER_MAIL,
                pass:process.env.PASS_MAIL
            }
        })

        await transport.sendMail({
            from:'Steam clone',
            to:receiver,
            subject:subject,
            text:text
        })

        console.log('Message sent successfully')

    }
    catch(err){
        console.log('Something went wrong')
        console.log(err)
    }
}