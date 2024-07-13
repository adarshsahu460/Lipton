import { PrismaClient } from "@prisma/client";
import emailGenerator from "../functions/email-generator.js";
import otpGenerator from "../functions/otp-generator.js";

const prisma = new PrismaClient()
export async function userForgot(email){
    const otp = await otpGenerator()
    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(!user){
        return {
            status:500,
            message:"User not found"
        }
    }
    const existingOTP = await prisma.userOTP.findUnique({
        where:{
            userId:user.id
        }
    })
    if(existingOTP && existingOTP.createdAt.getTime() >= Date.now() - 10*60*1000){
        return {
            status:400,
            message:"OTP already sent"
        }
    }else if(existingOTP){
        await prisma.userOTP.delete({
            where:{
                userId:user.id
            }
        })
    }
    
    await prisma.userOTP.create({
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


export async function adminForgot(email){
    const otp = await otpGenerator()
    const user = await prisma.admin.findUnique({
        where:{
            email
        }
    })
    if(!user){
        return {
            status:400,
            message:"Admin not found"
        }
    }
    const existingOTP = await prisma.adminOTP.findUnique({
        where:{
            adminID:user.id
        }
    })
    if(existingOTP && existingOTP.createdAt.getTime() >= Date.now() - 10*60*1000 ){
        return {
            status:400,
            message:"OTP already sent"
        }
    }else if(existingOTP){
        await prisma.adminOTP.delete({
            where:{
                id:existingOTP.id
            }
        })
    }
    await prisma.adminOTP.create({
        data:{
            otp,
            adminID:user.id
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
            status:400,
            message:"OTP not sent"
        }
    }
}