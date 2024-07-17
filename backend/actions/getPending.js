import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default async function(str){
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