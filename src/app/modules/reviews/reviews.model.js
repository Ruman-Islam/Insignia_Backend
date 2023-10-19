import { Schema, model } from "mongoose";

const ReviewSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is missing!"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is missing!"],
    },
    photoUrl: {
      type: String,
      required: [true, "URL is missing!"],
      trim: true,
    },
    details: {
      type: String,
      required: [true, "URL is missing!"],
      max: 500,
      trim: true,
    },
    rate: {
      type: Number,
      required: [true, "Rate is missing!"],
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    isRead: {
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

const Review = model("Review", ReviewSchema);

export default Review;
