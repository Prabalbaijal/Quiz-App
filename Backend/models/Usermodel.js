import mongoose from "mongoose";

const QuizPerformanceSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  correctAnswers: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  dateTaken: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: Object,
    required: false,
    contains: {
      url: {
        type: String,
      },
      publicId: {
        type: String,
      },
    },
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  quizzesTaken: [QuizPerformanceSchema],
});

export const User = mongoose.model("User", UserSchema);
