import { PrismaClient } from "@prisma/client";
import emailGenerator from "../functions/email-generator.js";
import otpGenerator from "../functions/otp-generator.js";

const prisma = new PrismaClient()
export default async function(email){
    const otp = await otpGenerator()
    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })
    await prisma.oTP.create({
        data:{
            otp,
            userId:user.id
        }
    })
    const response = await emailGenerator(email,otp);
    if(response){
        return {
            status:200,
            message:"OTP sent to your email"
        }
    }else{
        return {
            status:500,
            message:"OTP not sent"
        }
    }
}