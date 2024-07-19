import express from 'express'
import { PrismaClient } from '@prisma/client'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express.Router()
app.use(cookieParser())
const prisma = new PrismaClient()
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));

app.get('/getAllPending',async (req,res)=>{
    const pending = await prisma.pending.findMany()
    return res.status(200).json(pending)
})  

app.post('/resolved',async (req,res)=>{
    const id = req.body.id
    const approve = req.body.approve

    const admin = await prisma.pending.findUnique({
        where:{
            id:Number(id)
        }
    })
    if(!admin) return res.status(400).json({message:"Invalid id"})  
    await prisma.pending.delete({
        where:{
            id:Number(id)
        },
    })
    if(approve == "1"){
        await prisma.admin.create({
            data:{
                email:admin.email,
                password:admin.password,
                name:admin.name,
                mobile:admin.mobile
            }
        })
        return res.status(200).json({message:"Approved"})
    }
    return res.status(200).json({message:"Rejected"})
})

export default app