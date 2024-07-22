import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export async function getAllPending(){
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

export async function getPending(str){
    const users = await prisma.user.findMany({
        where:{
            OR:[
                {
                    name:{
                        startsWith:str,
                        mode: "insensitive"
                    },
                },
                {
                    name:{
                        contains:str,
                        mode: "insensitive"
                    }
                }
            ],
            AND:{
                balance:{
                    gt:0
                }
            }
        },select:{
            id:true,
            name:true,
            balance:true
        }
    })
    return users
}