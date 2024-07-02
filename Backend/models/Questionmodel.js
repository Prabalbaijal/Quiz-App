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
        type:Number,
        required:true
    }
  });

export const Question=mongoose.model("Question",questionSchema)