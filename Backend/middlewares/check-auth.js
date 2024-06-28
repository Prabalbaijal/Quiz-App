import jwt from "jsonwebtoken"
import { User } from "../models/Usermodel.js"

const isAuthenticated=async(req,res,next)=>{
    try{    
        const token=req.cookies.token
        if(!token){
            return res.status(401).json({
                message:"User authentication failed!!"
            })
        }
        const decode=await jwt.verify(token,process.env.JWT_SECRET)
        const user=await User.findById(decode?.userId).select("-password")
        if(!user){
            return res.status(401).json({message:"Invalid Token!!"})
        }
        req.user=user
        next()
    }
    catch(error){
        console.log(error)
    }
}
export default isAuthenticated