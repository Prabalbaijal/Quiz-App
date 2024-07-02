import express from 'express'
import isAuthenticated from '../middlewares/check-auth.js'
import { createQuiz, dashboard, login, logout, register } from '../controllers/Usercontrollers.js'
import { getquestions, getquizzes, getresults, submitquiz } from '../controllers/Quizcontrollers.js'

const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/create-quiz").post(isAuthenticated,createQuiz)
router.route("/quizzes").get(getquizzes)
router.route("/:quizId/questions").get(getquestions)
router.route("/:quizId/submit").post(isAuthenticated,submitquiz)
router.route("/results/:resultId").get(getresults)
router.route("/logout").get(logout)
router.route("/dashboard").get(isAuthenticated,dashboard)

export default router