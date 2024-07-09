import express from 'express'
import login from './actions/login.js'
import forgot from './actions/forgot.js'
import updatePass from './actions/updatePass.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import verify from './actions/verify.js'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import register from './actions/register.js'


const app = express()
const prisma = new PrismaClient()
app.use(express.json())
dotenv.config();


app.get(`${process.env.URL}/admin/login`, async (req, res) => {
    const auth = req.headers.authorization
    var email = "" , password = ""
    jwt.verify(auth, process.env.SECRET_KEY,function(err,decoded){
        if(err || !decoded || !decoded.email || !decoded.password){
            return 
        }
        email = decoded.email
        password = decoded.password
    })
    if(email == "" || password == ""){
        return res.status(400).json({message:"Invalid token"})
    }
    const result = await login(email,password)
    if(!result.id){
        res.status(result.status).json(result.message)
        return
    }
    return res.status(result.status).json(result.id)
})

app.post(`${process.env.URL}/admin/login`,async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const response = await login(email,password)
    if(response.status == 400) return res.status(response.status).json(response.message);
    
    const token = jwt.sign({email,password},process.env.SECRET_KEY)
    return res.status(response.status).json({token})
})

app.post(`${process.env.URL}/user/forgot`, async (req, res) => {
    const email = req.body.email
    const response = await forgot(email)
    return res.status(response.status).json(response.message)
})

app.post(`${process.env.URL}/user/verify`, async (req, res) => {
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

app.put(`${process.env.URL}/user/updatePass`,async (req,res) =>{
    const email = req.body.email
    const pass = req.body.password
    if(!email ||!pass) return res.status(400).json({message:"Please fill all the fields"})
    const token = jwt.sign({
        email,
        password: pass
    },process.env.SECRET_KEY)
    const hash = await bcrypt.hash(pass,10)
    const response = await updatePass(hash,email)
    if(response.status==500) res.status(response.status).json(response.message)
    else res.status(response.status).json({token})
})

app.post(`${process.env.URL}/user/register`, async (req, res) => {
    const email = req.body.email
    const pass = req.body.password
    const name = req.body.name
    const mob = req.body.mob
    if(!email ||!pass ||!name ||!mob) return res.status(400).json({message:"Please fill all the fields"})
    const token = jwt.sign({
        email,
        password: pass
    },process.env.SECRET_KEY)
    const hash = await bcrypt.hash(pass,10)
    const response = await register(hash,name,email,mob)
    if(response.status==400) res.status(response.status).json(response.message)
    else res.status(response.status).json({token})
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})

