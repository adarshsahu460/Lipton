import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config();


export default async function (email, otp) {
    try{
        const transporter = nodemailer.createTransport({
            service:'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASSWORD
            },
        });
        // console.log(process.env.EMAIL_ID+""+process.env.EMAIL_PASSWORD)
        const info = await transporter.sendMail({
            from:{
                name: "Walchand College Canteen",
                address: process.env.EMAIL_ID
            },
            to: email, 
            subject: "This is the email regarding your OTP verification", 
            text: otp
        });
        return true
    }catch(e){
        return false
    }
}

