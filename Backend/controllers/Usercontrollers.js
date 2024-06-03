import { User } from '../models/Usermodel.js'
import bcrypt from 'bcryptjs'
import { signupValidator,loginValidator } from "../validators/validators.js"
import jwt from "jsonwebtoken"


export const register=async(req,res)=>{
    try{
        const {errors,isValid}=signupValidator(req.body)
        if(!isValid){
            res.json({
                success:false,
                errors
            })
        }else{
            const {firstName,lastName,email,password}=req.body
            const registerUser=new User({
                firstName,
                lastName,
                email,
                password,
                createdAt:new Date()
            })
            const hashedpass = await bcrypt.hash(password, 10)
            registerUser.save().then(()=>{
                res.json({
                    message:"Account created Successfully.",
                    success:true
                })
            }).catch(error=>res.json({
                message:error.message,
                success:false
            }))
        }
    }catch(error){
        console.log(error)
    }
}