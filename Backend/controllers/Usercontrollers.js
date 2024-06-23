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
            const hashedpass = await bcrypt.hash(password, 10)
            const registerUser=new User({
                firstName,
                lastName,
                email,
                password:hashedpass,
                createdAt:new Date()
            })
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

export const login=async (req,res)=>{
    try{
        const {errors,isValid}=loginValidator(req.body)
        if(!isValid){
            res.json({
                success:false,
                errors
            })
        }else{
            User.findOne({
                email:req.body.email
            }).then(user=>{
                if(!user){
                    res.json({
                    message:"User does not exist!!",
                    success:false
                })
                }
                else{
                    bcrypt.compare(req.body.password,user.password).then(success=>{
                        if(!success){
                            res.json({
                                message:"Incorrect Password",
                                success:false
                            })
                        }
                        else{
                            const payload={
                                id:user._id,
                                name:user.firstName
                            }
                            jwt.sign(
                                payload,
                                process.env.JWT_SECRET,{expiresIn:2155926},
                                (error,token)=>{
                                    res.json({
                                        user,
                                        token:"Bearer Token: "+token,
                                        success:true
                                    })
                                }
                            )
                        }
                    })
                }
            })
        }
    }catch(error){
        console.log(error)
    }
}