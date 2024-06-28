    import mongoose from "mongoose";
    import { Question } from "./Questionmodel.js";
    import { User } from "./Usermodel.js";

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
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
    });

    export const Quiz=mongoose.model("Quiz",quizSchema)