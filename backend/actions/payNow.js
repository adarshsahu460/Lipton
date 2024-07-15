import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export default async function(userId){
    const user = await prisma.user.findUnique({
        where:{
            id:Number(userId)
        },
        include:{
            orders:true
        }
    })
    if(!user){
        return {
            status:400,
            message:"User not found"
        }
    }
    user.orders.forEach(async(order) => {
        await prisma.order.delete({
            where:{
                id:Number(order.id)
            }
        })
    })
    await prisma.user.update({
        where:{
            id:Number(userId)
        },
        data:{
            balance:{
                decrement:user.balance
            }
        }
    })

    return {
        status:200,
        message:"Payment successful"
    }
}