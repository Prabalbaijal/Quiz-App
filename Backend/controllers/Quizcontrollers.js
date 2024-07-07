import { Quiz } from "../models/QuizModel.js";
import { User } from "../models/Usermodel.js";
import mongoose from "mongoose";
export const getquizzes=async (req, res) => {
    try {
      const quizzes = await Quiz.find().populate('createdBy', 'firstName lastName'); // Assuming 'createdBy' is a reference to the User model
      res.json(quizzes);
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: error.message });
    }
  }

export const getquestions=async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId).populate('questions');
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz.questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions' });
  }
}

export const submitquiz = async (req, res) => {
  const { quizId } = req.params;
  const { answers } = req.body;

  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    const answersArray=Object.values(answers)

    let score = 0;
    let correctAnswers = 0;
    let totalQuestions = quiz.questions.length;

    for (let i = 0; i < totalQuestions; i++) {
      const correctAnswer = quiz.questions[i].correctAnswer;
      const userAnswer = Number(answersArray[i]);
      // console.log(correctAnswer,userAnswer)
      if (correctAnswer === userAnswer) {
        correctAnswers++;
      }
    }

    const userId = req.user.id; 
    const performance = {
      quizId: quiz._id,
      score:(correctAnswers/totalQuestions*100),
      correctAnswers,
      totalQuestions,
      dateTaken: new Date()
    };

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { quizzesTaken: performance } },
      { new: true, upsert: true }
    );

    // Retrieve the last inserted performance record's ID
    const resultId = user.quizzesTaken[user.quizzesTaken.length - 1]._id;

    res.status(200).json({ resultId });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getresults=async (req, res) => {
  try {
    const user = await User.findOne({ 'quizzesTaken._id': req.params.resultId }, 'quizzesTaken.$');
    if (!user) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.json(user.quizzesTaken.id(req.params.resultId));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching result' });
  }
} 

