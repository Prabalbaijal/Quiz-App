import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: {
        type:String,
        required:true
    },
    choices: {
        type:[String],
        required:true
    },
    correctAnswer: {
        type:String,
        required:true
    }
  });

export const Question=mongoose.model("Question",questionSchema)