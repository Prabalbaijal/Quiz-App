import mongoose from "mongoose";
import { Question } from "./Questionmodel.js";

const quizSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    category: {
        type:String,
        required:true
    },
    questions: { 
        type:[Question.schema],
        required:true
    }
  });

export const Quiz=mongoose.model("Quiz",quizSchema)