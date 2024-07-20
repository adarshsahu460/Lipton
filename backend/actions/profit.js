import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export async function getProfit(date){
    let profit = await prisma.profit.findUnique({
        where:{
            date
        }
    })
    if(!profit){
        profit = await prisma.profit.create({
            data:{
                profit:0,
                date
            }
        })
    }
    return {
        status:200,
        message:profit.profit
    }
}   

export async function addProfit(profit,date){
    await prisma.profit.upsert({
        where:{
            date
        },
        update:{
            profit:{
                increment:profit
            }
        },
        create:{
            profit,
            date
        }
    })
    return {
        status:200,
        message:"Profit added"
    }
}