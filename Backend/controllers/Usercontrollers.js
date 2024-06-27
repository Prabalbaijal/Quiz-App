import { User } from '../models/Usermodel.js'
import bcrypt from 'bcryptjs'
import validator from "validator"
import jwt from "jsonwebtoken"

export const register=async(req,res)=>{
    try{
        const { firstName,lastName, email, password, confirmPassword } = req.body
        if (!firstName ||!lastName || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are requied!!" })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" })
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({ message: "Please fill a valid email" })
        }
        const user1 = await User.findOne({
            email
        })
        if (user1) {
            return res.status(400).json({ message: "Username already exists !!Try different" })
        }
        const hashedpass = await bcrypt.hash(password, 10)
        
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedpass,
            createdAt:new Date()
        })
        const createdUser = await User.findById(user._id).select(
            "-password"
        )
        if (!createdUser) {
            return res.status(500).json({
                message: "Something went wrong while registering the user!!"
            })
        }
        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
            user: createdUser
        })
    }catch(error){
        return res.status(500).json({
            message:'Server Error',
            success:false
        })
    }
}
export const login=async(req,res)=>{
    try{
        const {email,password}=req.body
        if (!email || !password){
            return res.status(400).json({ message: "Please fill all the required fields." })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Invalid user!!",
                success: false
            })
        }
        const MatchPassword = await bcrypt.compare(password, user.password)
        if (!MatchPassword) {
            return res.status(400).json({
                message: "Incorrect Password!!",
                success: false
            })
        }
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })

        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict'
        })
            .json({
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName:user.lastName,
                token:"Bearer Token: "+token,
                success:true
            })

    }catch(error){

    }
}