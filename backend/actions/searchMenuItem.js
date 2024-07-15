import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default async function(str) {
    const items = await prisma.menuItems.findMany({
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
            ]
        },select:{
            id:true,
            name:true,
            price:true
        }
    })
    return items
}