import { Schema, model } from "mongoose";

const TravelerSchema = Schema(
  {
    firstName: {
      type: String,
      trim: true,
      min: [3, "Too small"],
      max: [15, "Too big"],
      required: [true, "First name is missing!"],
    },
    lastName: {
      type: String,
      trim: true,
      min: [3, "Too small"],
      max: [15, "Too big"],
      required: [true, "Last name is missing!"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "{VALUE} is not matched",
      },
    },
    presentAddress: {
      type: String,
      trim: true,
    },
    permanentAddress: {
      type: String,
      trim: true,
    },
    martialStatus: {
      type: String,
      enum: {
        values: ["married", "unmarried"],
        message: "{VALUE} is not matched",
      },
    },
    dateOfBirth: {
      type: String,
      trim: true,
    },
    passportNumber: {
      type: String,
      trim: true,
    },
    passportExpiryDate: {
      type: String,
      trim: true,
    },
    nationalID: {
      type: String,
      trim: true,
    },
    emergencyContact: {
      type: String,
      trim: true,
    },
    religion: {
      type: String,
      trim: true,
    },
    photo: {
      type: {
        cloudinaryId: {
          type: String,
        },
        cloudinaryUrl: {
          type: String,
          match: [/(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, "Invalid URL format"],
        },
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Traveler = model("Traveler", TravelerSchema);

export default Traveler;
