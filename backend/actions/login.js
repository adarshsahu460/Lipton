import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function adminLogin(email, password) {
    const user = await prisma.admin.findFirst({
        where: {  
            email
        }
    })
    if (!user) {
        return {
            status: 400,
            message: "User not found"
        }
    }
    const result = await bcrypt.compare(password, user.password)
    if (result) {
        return {
            status: 200,
            message: "Login successful",
            id: user.id
        }
    } else {
        console.log('Incorrect password')
        return {
            status: 400,
            message: "Password is incorrect"
        }
    }
}

export async function userLogin(email, password) {
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    })
    if (!user) {
        return {
            status: 400,
            message: "User not found"
        }
    }
    const result = await bcrypt.compare(password, user.password)
    if (result) {
        return {
            status: 200,
            message: "Login successful",
            id: user.id
        }
    } else {
        console.log('Incorrect password')
        return {
            status: 400,
            message: "Password is incorrect"
        }
    }
}