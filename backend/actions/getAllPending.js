import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export default async function(){
    const items = await prisma.order.findMany()
    if(!items){
        return {
            status:400,
            message:"No items found"
        }
    }
    return {
        status:200,
        message:items
    }
}