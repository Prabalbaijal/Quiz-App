import express from 'express'
import isAuthenticated from '../middlewares/check-auth.js'
import { login, register } from '../controllers/Usercontrollers.js'

const router=express.Router()

router.route("/register").post(register)
router.route("/login").post(login)

export default router