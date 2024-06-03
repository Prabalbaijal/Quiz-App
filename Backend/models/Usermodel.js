import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    avatar:{
        type:Object,
        required:false,
        contains:{
            url:{
                typr:String
            },
            publicId:{
                type:String
            }
        }
    },
    deleted:{
        type:Boolean,
        default:false
    }
})

export const User=mongoose.model("Users",UserSchema)