import express from 'express'
import login from './actions/login.js'
import forgot from './actions/forgot.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import verify from './actions/verify.js'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()
app.use(express.json())
dotenv.config();

app.get('/admin/login', async (req, res) => {
    const auth = req.headers.authorization
    var email,password
    jwt.verify(auth, process.env.SECRET_KEY,function(err,decoded){
        if(err){
            return res.json({
                status:400,
                message:"Invalid token"
            })
        }
        email = decoded.email
        password = decoded.password
    })
    const result = await login(email,password)
    if(!result.id){
        res.status(result.status).json(result.message)
        return
    }
    return res.status(result.status).json(result.id)
})

app.post('/admin/forgot', async (req, res) => {
    const email = req.body.email
    const response = await forgot(email)
    return res.status(response.status).json(response.message)
})

app.post('/admin/verify', async (req, res) => {
    const otp = req.body.otp
    const email = req.body.email
    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })
    const id = user.id
    const response = await verify(id,otp)
    return res.status(response.status).json(response.message)
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})

