import cloudinary from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config({})

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_secret:process.env.CLOUDINARY_SECRET,
    api_key:process.env.CLOUDINARY_API_KEY
})

export default cloudinary.v2