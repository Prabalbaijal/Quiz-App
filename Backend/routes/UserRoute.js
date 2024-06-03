import express from 'express'
import isAuthenticated from '../middlewares/check-auth.js'
import { register } from '../controllers/Usercontrollers.js'

const router=express.Router()

router.route("/register").post(register)

export default router