import { Schema, model } from "mongoose";

const QuestionSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name is missing!"],
    },
    emailOrPhone: {
      type: String,
      trim: true,
      required: [true, "email or phone is missing!"],
    },
    questionText: {
      type: String,
      trim: true,
      required: [true, "question is missing!"],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Question = model("Question", QuestionSchema);

export default Question;
