import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()
export default async function (pending){
    const userMob = pending.mobile;
    const items = pending.items;
    // console.log(items);

    const user = await prisma.user.findUnique({
        where:{
            mobile:userMob
        }
    })
    
    if(!user){
        return {
            status:400,
            message:"User not found"
        }
    }
    const userId = user.id;
    items.forEach(async(item) => {
        await prisma.order.create({
            data:{
                userId:Number(userId),
                itemId:Number(item.id),
                quantity:Number(item.qty),
            }
        })
        const menuItem = await prisma.menuItems.findUnique({
            where:{
                id:Number(item.id)
            }
        })
        await prisma.user.update({
            where:{
                id:Number(userId)
            },
            data:{
                balance:{
                    increment:Number(menuItem.price)*Number(item.qty)
                }
            },
        })
    });

    return {
        status:200,
        message:"Order placed successfully"
    }
}