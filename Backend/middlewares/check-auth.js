import jwt from 'jsonwebtoken'

const isAuthenticated=async(req,res,next)=>{
    try{
        let token=req.headers['authorization'].split(' ')[2]
        if(!token){
            return res.status(401).json({
                message:"User authentication failed!!"
            })
        }
        const decode=await jwt.verify(token,process.env.JWT_SECRET)
        if(!decode){
            return res.status(401).json({message:"Invalid Token!!"})
        }
        req.userData=decode
        next()  

    }
    catch(error){
        return res.status(401).json({
            "message":"Not Authorized"
        })
    }
}

export default isAuthenticated