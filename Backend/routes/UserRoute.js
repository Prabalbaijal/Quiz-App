import express from 'express'
import isAuthenticated from '../middlewares/check-auth.js'
import { createQuiz, login, register } from '../controllers/Usercontrollers.js'
import { User } from '../models/Usermodel.js'

const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/create-quiz").post(createQuiz)


export default router