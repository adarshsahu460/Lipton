import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export default async function(email,pass,admin,name,mob){
    if(admin){
        try{
            await prisma.admin.create({
                data:{
                    password:pass,
                    email : email,
                    name : name,
                    mobile : mob
                }
            })
            return {
                status:200,
                message:"Admin created"
            }
        }catch(e){
            return {
                status:400,
                message:"Error creating admin"
            }
        }
    }else{
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
}