import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

dotenv.config({
    path: '../.env'
})
const prisma = new PrismaClient()
export default async function(req,res,next){
    const token = req.headers.authorization
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        if(!decoded.email || !decoded.password){
            return res.status(401).json({message:"Unauthorized"})
        }
        const admin = await prisma.admin.findUnique({
            where:{
                email:decoded.email
            }
        })
        if(!admin){
            return res.status(401).json({message:"Unauthorized"})
        }
        const isMatch = await bcrypt.compare(decoded.password,admin.password)
        if(!isMatch){
            return res.status(401).json({message:"Unauthorized"})
        }
        next()
    }catch(err){
        return res.status(401).json({message:"Unauthorized"})
    }
}