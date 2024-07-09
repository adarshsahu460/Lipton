import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default async function(pass,email){
    const user = prisma.user.findUnique({
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
    try{
        await prisma.user.update({
            where:{
                email
            },
            data:{
                password:pass
            }
        })
        return {
            status:200,
            message:"Password updated"
        }
    }catch(e){
        return {
            status:500,
            message:"Password not updated"
        }
    }
}