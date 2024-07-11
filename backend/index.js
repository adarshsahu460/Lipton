import express from 'express'
import { adminLogin, userLogin } from './actions/login.js'
import { userForgot,adminForgot } from './actions/forgot.js'
import { adminUpdatePass, userUpdatePass } from './actions/updatePass.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { adminVerify, userVerify } from './actions/verify.js'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import register from './actions/register.js'
import { emailSchema, otpSchema, passwordSchema,nameSchema,phoneNumberSchema } from './validation/index.js'

const app = express()
const prisma = new PrismaClient()
app.use(express.json())
dotenv.config();

// Admin -----------------------------------------------------------------------------------------------------------

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
    const result = await adminLogin(email,password)
    if(!result.id){
        res.status(result.status).json(result.message)
        return
    }
    return res.status(result.status).json(result.id)
})

app.post(`${process.env.URL}/admin/login`,async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    
    if(!email ||!password) return res.status(400).json({message:"Please fill all the fields"})

    // zod validation for email and password
    const {success : emailSuccess} = emailSchema.safeParse(email)
    if(!emailSuccess) return res.status(400).json({message:"Please provide a valid email"})
    const {success : passwordSuccess} = passwordSchema.safeParse(password)
    if(!passwordSuccess) return res.status(400).json({message:"Password must be at least 8 characters and maximum 16 characters"})

    const response = await adminLogin(email,password)
    if(response.status == 400) return res.status(response.status).json(response.message);
    const token = jwt.sign({email,password},process.env.SECRET_KEY)
    return res.status(response.status).json({token})
})

app.post(`${process.env.URL}/admin/register`, async (req, res) => {
    const email = req.body.email
    const pass = req.body.password

    if(!email ||!pass) return res.status(400).json({message:"Please fill all the fields"})

    // zod validation for email and password
    const {success : emailSuccess} = emailSchema.safeParse(email)
    if(!emailSuccess) return res.status(400).json({message:"Please provide a valid email"})
    const {success : passSuccess} = passwordSchema.safeParse(pass)
    if(!passSuccess) return res.status(400).json({message:"Password must be at least 8 characters and maximum 16 characters"})
    
    const alreadyExist = await adminLogin(email,pass)
    if(alreadyExist.status===200){
        return res.status(200).json({message:"Admin already exist"})
    }
    
    const token = jwt.sign({
        email,
        password: pass
    },process.env.SECRET_KEY)
    const hash = await bcrypt.hash(pass,10)
    const response = await register(email,hash,true)
    if(response.status == 400) return res.status(response.status).json(response.message);
    else return res.status(response.status).json({token})
})

app.post(`${process.env.URL}/admin/forgot`, async (req, res) => {
    const email = req.body.email
    if(!email){
        return res.status(400).json({message:"Please provide a email"})
    }
    // zod validation for email
    const {success : emailSuccess} = emailSchema.safeParse(email)
    if(!emailSuccess) return res.status(400).json({message:"Please provide a valid email"})

    const response = await adminForgot(email)
    return res.status(response.status).json(response.message)
})

app.post(`${process.env.URL}/admin/verify`, async (req, res) => {
    const otp = req.body.otp
    // zod validation for otp
    if(!otp){
        return res.status(400).json({message:"Please provide a otp"})
    }
    const {success : otpSuccess} = otpSchema.safeParse(otp)
    if(!otpSuccess) return res.status(400).json({message:"Please provide a valid otp"})

    const email = req.body.email
    // zod validation for email
    const {success : emailSuccess} = emailSchema.safeParse(email)
    if(!emailSuccess) return res.status(400).json({message:"Please provide a valid email"})

    const user = await prisma.admin.findUnique({
        where:{
            email
        }
    })
    const id = user.id
    const response = await adminVerify(id,otp)
    return res.status(response.status).json(response.message)
})

app.put(`${process.env.URL}/admin/updatePass`,async (req,res) =>{
    const email = req.body.email
    const pass = req.body.password

    if(!email ||!pass) return res.status(400).json({message:"Please fill all the fields"})
    // zod validation for email and password
    const {success : emailSuccess} = emailSchema.safeParse(email)
    if(!emailSuccess) return res.status(400).json({message:"Please provide a valid email"})
    const {success : passSuccess} = passwordSchema.safeParse(pass)
    if(!passSuccess) return res.status(400).json({message:"Password must be at least 8 characters and maximum 16 characters"})
    
    const token = jwt.sign({
        email,
        password: pass
    },process.env.SECRET_KEY)
    const hash = await bcrypt.hash(pass,10)
    const response = await adminUpdatePass(hash,email)
    if(response.status==500) res.status(response.status).json(response.message)
    else res.status(response.status).json({token})
})


// User ---------------------------------------------------------------------------------------------------------------

app.get(`${process.env.URL}/user/login`, async (req, res) => {
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

app.post(`${process.env.URL}/user/login`,async (req, res) => {
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

app.post(`${process.env.URL}/user/forgot`, async (req, res) => {
    const email = req.body.email
    if(!email) return res.status(400).json({message:"Please provide a email"})
    
    const {success : emailSuccess} = emailSchema.safeParse(email)
    if(!emailSuccess) return res.status(400).json({message:"Please provide a valid email"})

    const response = await userForgot(email)
    return res.status(response.status).json(response.message)
})

app.post(`${process.env.URL}/user/verify`, async (req, res) => {
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

app.put(`${process.env.URL}/user/updatePass`,async (req,res) =>{
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

app.post(`${process.env.URL}/user/register`, async (req, res) => {
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

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})

