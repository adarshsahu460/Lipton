import {  PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

async function getAdmin(email){
    const user = await prisma.admin.findUnique({
        where : {
            email : email
        }, 
        select : {
            email : true,
            password : false,
            name : true,
            mobile : true
        }
    });

    return user;
}

export default async function (email) {
    const users = await prisma.user.findMany();
    
    const adminDetail = await getAdmin(email);
    // console.log(adminDetail);

    if(!users){
        return {
            status : 200,
            message : {
                pending : 0,
                admin : adminDetail
            }
        }
    }

    // console.log(users);
    let total = 0;
    users.map((u) => {
        total = total + u.balance    
    })
    return {
        status : 200,
        message : {
            pending : total,
            admin : adminDetail
        }
    }
}