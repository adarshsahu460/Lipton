import express from 'express'
import dotenv from 'dotenv'
import cors from "cors";
import adminRouter from './routes/admin.js'
import userRouter from './routes/user.js'

const app = express()

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
app.use(express.json())
dotenv.config();

app.use(`${process.env.URL}/admin`,adminRouter)
app.use(`${process.env.URL}/user`,userRouter)
app.get('*',(req,res)=>{
    return res.json({
        message:"PAGE NOT FOUND"
    })
})
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
