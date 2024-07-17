import express from 'express'
import {  userLogin } from '../actions/login.js'
import { userForgot } from '../actions/forgot.js'
import {  userUpdatePass } from '../actions/updatePass.js'
import jwt from 'jsonwebtoken'
import { userVerify } from '../actions/verify.js'
import bcrypt from 'bcrypt'
import register from '../actions/register.js'
import { emailSchema, otpSchema, passwordSchema,nameSchema,phoneNumberSchema } from '../validation/index.js'

const app = express.Router()

app.get(`/login`, async (req, res) => {
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
    const result = await userLogin(email,password)
    if(!result.id){
        res.status(result.status).json(result.message)
        return
    }
    return res.status(result.status).json(result.id)
})

app.post(`/login`,async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    if(!email ||!password) return res.status(400).json({message:"Please fill all the fields"})
    // zod validation for email and password
    const {success : emailSuccess} = emailSchema.safeParse(email)
    if(!emailSuccess) return res.status(400).json({message:"Please provide a valid email"})
    const {success : passSuccess} = passwordSchema.safeParse(password)
    if(!passSuccess) return res.status(400).json({message:"Password must be at least 8 characters and maximum 16 characters"})

    const response = await userLogin(email,password)
    if(response.status == 400) return res.status(response.status).json(response.message);
    
    const token = jwt.sign({email,password},process.env.SECRET_KEY)
    return res.status(response.status).json({token})
})

app.post(`forgot`, async (req, res) => {
    const email = req.body.email
    if(!email) return res.status(400).json({message:"Please provide a email"})
    
    const {success : emailSuccess} = emailSchema.safeParse(email)
    if(!emailSuccess) return res.status(400).json({message:"Please provide a valid email"})

    const response = await userForgot(email)
    return res.status(response.status).json(response.message)
})

app.post(`/verify`, async (req, res) => {
    const otp = req.body.otp
    const email = req.body.email

    if(!otp ||!email) return res.status(400).json({message:"Please fill all the fields"})

    const {success : otpSuccess} = otpSchema.safeParse(otp)
    if(!otpSuccess) return res.status(400).json({message:"Please provide a valid otp"})
    const {success : emailSuccess} = emailSchema.safeParse(email)
    if(!emailSuccess) return res.status(400).json({message:"Please provide a valid email"})

    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })
    const id = user.id
    const response = await userVerify(id,otp)
    return res.status(response.status).json(response.message)
})

app.put(`/updatePass`,async (req,res) =>{
    const email = req.body.email
    const pass = req.body.password

    if(!email ||!pass) return res.status(400).json({message:"Please fill all the fields"})

    const {success : emailSuccess} = emailSchema.safeParse(email)
    if(!emailSuccess) return res.status(400).json({message:"Please provide a valid email"})
    const {success : passSuccess} = passwordSchema.safeParse(pass)
    if(!passSuccess) return res.status(400).json({message:"Password must be at least 8 characters and maximum 16 characters"})
    
    const token = jwt.sign({
        email,
        password: pass
    },process.env.SECRET_KEY)
    const hash = await bcrypt.hash(pass,10)
    const response = await userUpdatePass(hash,email)
    if(response.status==500) res.status(response.status).json(response.message)
    else res.status(response.status).json({token})
})

app.post(`/register`, async (req, res) => {
    const email = req.body.email
    const pass = req.body.password
    const name = req.body.name
    const mob = req.body.mobile

    if(!email ||!pass ||!name ||!mob) return res.status(400).json({message:"Please fill all the fields"})
    const{success : emailSuccess} = emailSchema.safeParse(email)
    if(!emailSuccess) return res.status(400).json({message:"Please provide a valid email"})
    const {success : passSuccess} = passwordSchema.safeParse(pass)
    if(!passSuccess) return res.status(400).json({message:"Password must be at least 8 characters and maximum 16 characters"})
    const {success : nameSuccess} = nameSchema.safeParse(name)
    if(!nameSuccess) return res.status(400).json({message:"Name must be at least 3 characters and maximum 20 characters"})
    const {success : mobSuccess} = phoneNumberSchema.safeParse(mob)
    if(!mobSuccess) return res.status(400).json({message:"Please provide a valid phone number"})

    const token = jwt.sign({
        email,
        password: pass
    },process.env.SECRET_KEY)
    const hash = await bcrypt.hash(pass,10)
    const response = await register(email,hash,false,name,mob)
    if(response.status==400) res.status(response.status).json(response.message)
    else res.status(response.status).json({token})
})


export default app