import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default async function verify(id,otp) {
    const otpG = await prisma.oTP.findUnique({
        where:{
            userId:id
        }
    })
    if(otpG && otpG.otp==otp){
        await prisma.oTP.delete({
            where:{
                id:otpG.id
            }
        })
        if(otpG.createdAt.getTime() < Date.now() - 10*60*1000 ){
            return {
                status:400,
                message:"OTP expired"
            }
        }
        return {
            status:200,
            message:"OTP matched"
        }
    }else{
        return {
            status:400,
            message:"OTP not matched"
        }
    }
}