import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import UserRoute from  './routes/UserRoute.js'

dotenv.config({})

const app=express()
const PORT=process.env.PORT || 2000

app.use(cors())
app.use(express.urlencoded({extended:true}))    
app.use(express.json())

app.use("/api/users",UserRoute)

app.listen(PORT,()=>{
    connectDB()
    console.log(`Server Detected ${PORT}`)
})
