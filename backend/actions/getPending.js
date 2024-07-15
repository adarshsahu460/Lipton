import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default async function(userId){
    const user = await prisma.user.findUnique({
        where:{
            id:Number(userId)
        }
    })
    if(user) return {
        status:200,
        message:user.balance
    }
    else{
        return {
            status:400,
            message:"User not found"
        }
    }
}