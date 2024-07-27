import { User } from '../models/Usermodel.js'
import bcrypt from 'bcryptjs'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import { Quiz } from '../models/QuizModel.js'
import { uploadOnCloudinary } from '../config/cloudinary.js'

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body
        const avatar = req.file ? req.file.path : null // Get the uploaded file path

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required!!" })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please provide a valid email" })
        }

        const user1 = await User.findOne({ email })
        if (user1) {
            return res.status(400).json({ message: "Email already exists! Try a different one." })
        }

        const hashedPass = await bcrypt.hash(password, 10)
        let avatarUrl = null;
        if (avatar) {
            const uploadResponse = await uploadOnCloudinary(avatar);
            if (uploadResponse) {
                avatarUrl = uploadResponse.secure_url;
            }
        }
        
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPass,
            profilePicture:avatarUrl, 
            createdAt: new Date()
        })

        const createdUser = await User.findById(user._id).select("-password")
        if (!createdUser) {
            return res.status(500).json({
                message: "Something went wrong while registering the user!!"
            })
        }

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
            user: createdUser
        })
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            message: 'Server Error',
            success: false
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the required fields." })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Invalid user!!",
                success: false
            })
        }

        const matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) {
            return res.status(400).json({
                message: "Incorrect Password!!",
                success: false
            })
        }

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })

        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict'
        })
            .json({
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                profilePicture:user.profilePicture,
                success: true
            })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Server Error',
            success: false
        })
    }
}

export const createQuiz = async (req, res) => {
    const { title, category, questions, createdBy } = req.body
    if (!title || !category || !questions) {
        return res.status(400).json({ message: "Please fill all the required fields." })
    }

    const quiz = new Quiz({
        title,
        category,
        questions,
        createdBy
    })

    try {
        await quiz.save()
        res.status(201).json({ message: 'Quiz added successfully.' })
    } catch (error) {
        console.error('Error adding quiz:', error)
        res.status(500).json({ message: 'Error adding quiz' })
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged Out Successfully."
        })
    } catch (error) {
        console.error('Error during logout:', error)
        res.status(500).json({
            message: 'Server Error',
            success: false
        })
    }
}

export const dashboard = async (req, res) => {
    try {
        const userId = req.user.id 

        // Fetch user data including quizzes taken
        const user = await User.findById(userId).populate('quizzesTaken.quizId')

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Extract relevant data for dashboard
        const quizzesTaken = user.quizzesTaken.map((quiz) => ({
            quizId: quiz.quizId._id,
            quizTitle: quiz.quizId.title,
            score: quiz.score,
            correctAnswers: quiz.correctAnswers,
            totalQuestions: quiz.totalQuestions,
            dateTaken: quiz.dateTaken,
        }))

        res.json({ quizzesTaken })
    } catch (error) {
        console.error('Error fetching dashboard data:', error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}
