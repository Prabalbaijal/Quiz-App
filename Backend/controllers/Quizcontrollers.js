import { Quiz } from "../models/QuizModel.js";

export const getquizzes=async (req, res) => {
    try {
      const quizzes = await Quiz.find().populate('createdBy', 'firstName lastName'); // Assuming 'createdBy' is a reference to the User model
      res.json(quizzes);
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: error.message });
    }
  }