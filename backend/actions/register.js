import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default async function(pass,name,email,mob){
    try{
        await prisma.user.create({
            data:{
                password:pass,
                name,
                email,
                mobile:mob
            }
        })
        return {
            status:200,
            message:"User created"
        }
    }catch(e){
        return {
            status:400,
            message:"Error creating user"
        }
    }
}