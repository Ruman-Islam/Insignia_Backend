import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../../config/index.js";

const UserSchema = Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: [true, "User ID is required"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid URL format",
      ],
      required: [true, "Email address is required"],
    },
    userName: {
      type: String,
      trim: true,
      min: [3, "Too small"],
      max: [30, "Too big"],
      required: [true, "User name is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "{VALUE} is not matched",
      },
    },
    role: {
      type: String,
      enum: {
        values: ["customer", "admin", "super_admin"],
        message: "{VALUE} is not matched",
      },
      default: "customer",
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
    password: {
      type: String,
      match: [
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z\d]).{6,}$/,
        "Invalid password format",
      ],
    },
    photoUrl: {
      type: String,
      match: [/(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, "Invalid URL format"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.methods.matchPassword = async function (enteredPassword) {

  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.password) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );
  }
  next();
});

const User = model("User", UserSchema);

export default User;
