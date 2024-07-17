import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export async function searchMenuItem(str) {
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


export async function addMenuitem(name,price,adminId){
    try{
        await prisma.menuItems.create({
            data:{
                name,
                price : Number(price),
                adminId: Number(adminId)
            }
        })
        return {
            status:200,
            message:"Item added successfully"
        }
    }catch(e){
        return {
            status:500,
            message:"Something went wrong"
        }
    }
}

export async function deleteMenuitem(id){
    try{
        await prisma.menuItems.delete({
            where:{
                id : Number(id)
            }
        })
        return {
            status:200,
            message:"Item deleted successfully"
        }
    }catch(e){
        return {
            status:500,
            message:"Something went wrong"
        }
    }
}

export async function updateMenuitem(id,name,price){
    try{
        await prisma.menuItems.update({
            where:{
                id : Number(id)
            },
            data:{
                name,
                price : Number(price)
            }
        })
        return {
            status:200,
            message:"Item updated successfully"
        }
    }catch(e){
        return {
            status:500,
            message:"Something went wrong"
        }
    }
}
