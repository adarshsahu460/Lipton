import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export default async function(userId,amt){
    let user = await prisma.user.findUnique({
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
    user = await prisma.user.update({
        where:{
            id:Number(userId)
        },
        data:{
            balance:{
                decrement:amt
            }
        },
        include:{
            orders:true
        }
    })
    if(user.balance==0){
        user.orders.forEach(async(order) => {
            await prisma.order.delete({
                where:{
                    id:Number(order.id)
                }
            })
        })
    }

    return {
        status:200,
        message:"Payment successful"
    }
}