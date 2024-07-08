import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import { json } from "express";

const prisma = new PrismaClient()

export default async function login(email, password) {
    const user = await prisma.admin.findFirst({
        where: {        
            name: email
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
        console.log('Correct password')
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