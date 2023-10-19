import { Schema, model } from "mongoose";

const FaqSchema = Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "title is missing!"],
    },
    answer: {
      type: String,
      trim: true,
      required: [true, "answer is missing!"],
    },
    isSelected: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const FAQ = model("FAQ", FaqSchema);

export default FAQ;
