import express from 'express'
import { adminLogin } from '../actions/login.js'
import { adminForgot } from '../actions/forgot.js'
import { adminUpdatePass } from '../actions/updatePass.js'
import { addMenuitem, deleteMenuitem, searchMenuItem, updateMenuitem } from '../actions/menuItem.js'
import jwt from 'jsonwebtoken'
import { adminVerify } from '../actions/verify.js'
import bcrypt from 'bcrypt'
import register from '../actions/register.js'
import { emailSchema, otpSchema, passwordSchema, nameSchema, phoneNumberSchema } from '../validation/index.js'
import payLater from '../actions/payLater.js'
import getPending from '../actions/getPending.js'
import payNow from '../actions/payNow.js'
import { isAdminAuthenticated } from '../functions/isAuthenticated.js'
import getAllPending from '../actions/getAllPending.js'
import cookieParser from 'cookie-parser'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'


const app = express.Router()
app.use(cookieParser())
const prisma = new PrismaClient()
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));

app.get(`/login`, async (req, res) => {
    const auth = req.cookies['lipton-cookie-admin']
    if (!auth) return res.status(400).json({ message: "Invalid token" })
    var email = "", password = ""
    jwt.verify(auth, process.env.SECRET_KEY, function (err, decoded) {
        if (err || !decoded || !decoded.email || !decoded.password) {
            return
        }
        email = decoded.email
        password = decoded.password
    })
    if (email == "" || password == "") {
        return res.status(400).json({ message: "Invalid token" })
    }
    const result = await adminLogin(email, password)
    if (!result.id) {
        res.status(result.status).json({ message: result.message })
        return
    }
    return res.status(result.status).json({ message: result.id })
})

app.post(`/login`, async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) return res.status(400).json({ message: "Please fill all the fields" })

    // zod validation for email and password
    const { success: emailSuccess } = emailSchema.safeParse(email)
    if (!emailSuccess) return res.status(400).json({ message: "Please provide a valid email" })
    const { success: passwordSuccess } = passwordSchema.safeParse(password)
    if (!passwordSuccess) return res.status(400).json({ message: "Password must be at least 8 characters and maximum 16 characters" })

    const response = await adminLogin(email, password)
    if (response.status == 400) return res.status(response.status).json({ message: response.message });
    const token = jwt.sign({ email, password }, process.env.SECRET_KEY)
    res.cookie("lipton-cookie-admin", token,
        {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
            sameSite: "lax",
            secure: false
        }
    )
    return res.status(response.status).json({ message: response.message })
})

app.post(`/register`, async (req, res) => {
    const email = req.body.email
    const pass = req.body.password
    const name = req.body.name
    const mob = req.body.mobile

    if (!email || !pass || !name || !mob) return res.status(400).json({ message: "Please fill all the fields" })
    const { success: emailSuccess } = emailSchema.safeParse(email)
    if (!emailSuccess) return res.status(400).json({ message: "Please provide a valid email" })
    const { success: passSuccess } = passwordSchema.safeParse(pass)
    if (!passSuccess) return res.status(400).json({ message: "Password must be at least 8 characters and maximum 16 characters" })
    const { success: nameSuccess } = nameSchema.safeParse(name)
    if (!nameSuccess) return res.status(400).json({ message: "Name must be at least 3 characters and maximum 20 characters" })
    const { success: mobSuccess } = phoneNumberSchema.safeParse(mob)
    if (!mobSuccess) return res.status(400).json({ message: "Please provide a valid phone number" })


    const alreadyExist = await prisma.admin.findUnique({
        where: {
            email
        }
    })
    if (alreadyExist) {
        return res.status(200).json({ message: "Account already exist" })
    }

    const token = jwt.sign({
        email,
        password: pass
    }, process.env.SECRET_KEY)

    const hash = await bcrypt.hash(pass, 10)
    const response = await register(email, hash, true, name, mob)
    if (response.status == 400) return res.status(response.status).json({ message: response.message });
    else return res.status(response.status).cookie("lipton-cookie-admin", token, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: "none",
        secure: true
    }).json({ message: response.message })
})

app.post(`/forgot`, async (req, res) => {
    const email = req.body.email
    if (!email) {
        return res.status(400).json({ message: "Please provide a email" })
    }
    // zod validation for email
    const { success: emailSuccess } = emailSchema.safeParse(email)
    if (!emailSuccess) return res.status(400).json({ message: "Please provide a valid email" })

    const response = await adminForgot(email)
    return res.status(response.status).json({ message: response.message })
})

app.post(`/verify`, async (req, res) => {
    const otp = req.body.otp
    // zod validation for otp
    if (!otp) {
        return res.status(400).json({ message: "Please provide a otp" })
    }
    const { success: otpSuccess } = otpSchema.safeParse(otp)
    if (!otpSuccess) return res.status(400).json({ message: "Please provide a valid otp" })

    const email = req.body.email
    // zod validation for email
    const { success: emailSuccess } = emailSchema.safeParse(email)
    if (!emailSuccess) return res.status(400).json({ message: "Please provide a valid email" })

    const user = await prisma.admin.findUnique({
        where: {
            email
        }
    })
    const id = user.id
    const response = await adminVerify(id, otp)
    return res.status(response.status).json({ message: response.message })
})

app.put(`/updatePass`, async (req, res) => {
    const email = req.body.email
    const pass = req.body.password

    if (!email || !pass) return res.status(400).json({ message: "Please fill all the fields" })
    // zod validation for email and password
    const { success: emailSuccess } = emailSchema.safeParse(email)
    if (!emailSuccess) return res.status(400).json({ message: "Please provide a valid email" })
    const { success: passSuccess } = passwordSchema.safeParse(pass)
    if (!passSuccess) return res.status(400).json({ message: "Password must be at least 8 characters and maximum 16 characters" })

    const token = jwt.sign({
        email,
        password: pass
    }, process.env.SECRET_KEY)
    const hash = await bcrypt.hash(pass, 10)
    const response = await adminUpdatePass(hash, email)
    if (response.status == 500) res.status(response.status).json({ message: response.message })
    else res.status(response.status).cookie("lipton-cookie-admin", token, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: "none",
        secure: true
    }).json({ message: response.message })
})

// All these are visible to only authenticated admins -----------------------------------------------------------
app.use(isAdminAuthenticated)

app.get(`/logout`, async (req, res) => {
    res.clearCookie("lipton-cookie-admin")
    return res.status(200).json({ message: "Logged out successfully" })
})

app.get(`/getItems`, async (req, res) => {
    const str = req.query.str
    const items = await searchMenuItem(str)
    res.json(items)
})


app.post(`/payLater`, async (req, res) => {
    const pending = req.body.pending
    const response = await payLater(pending)
    return res.status(response.status).json({ message: response.message })
})

app.get(`/getPending`, async (req, res) => {
    const str = req.query.str
    const response = await getPending(str)
    return res.json(response)
})

app.get('/getAllPending', async (req, res) => {
    const response = await getAllPending()
    return res.status(response.status).json({ message: response.message })
})

app.post(`/payNow`, async (req, res) => {
    const {userId,amt} = req.body
    if(!userId ||!amt) return res.status(400).json({ message: "Please fill all the fields" })
    const response = await payNow(userId,Number(amt))
    return res.status(response.status).json({ message: response.message })
})

app.post('/addItem', async (req, res) => {
    const { name, price, adminId } = req.body
    if (!name || !price || !adminId) return res.status(400).json({ message: "Please fill all the fields" })
    const response = await addMenuitem(name, price, adminId)
    return res.status(response.status).json({ message: response.message })
})

app.put('/updateItem', async (req, res) => {
    const { id, name, price } = req.body
    if (!name || !price || !id) return res.status(400).json({ message: "Please fill all the fields" })
    const response = await updateMenuitem(id, name, price)
    return res.status(response.status).json({ message: response.message })
})

app.post('/deleteItem', async (req, res) => {
    const { id } = req.body
    if (!id) return res.status(400).json({ message: "Please fill all the fields" })
    const response = await deleteMenuitem(id)
    return res.status(response.status).json({ message: response.message })
})

export default app