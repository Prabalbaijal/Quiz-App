import express from 'express'
import isAuthenticated from '../middlewares/check-auth.js'
import { login, register } from '../controllers/Usercontrollers.js'
import { User } from '../models/Usermodel.js'

const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/:id").get(isAuthenticated,(req, res) => {
    User.findOne({
        _id: req.params.id
    }).then(user => {
        res.json({ user, success: true })
    }).catch(err => {
        res.json({ success: false, message: err.message })
    })
})


export default router