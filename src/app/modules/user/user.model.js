import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { roles } from "./user.constant.js";

const UserSchema = Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: [true, "User ID is required"],
    },
    userName: {
      type: String,
      trim: true,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email address is required"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid URL format",
      ],
    },
    password: {
      type: String,
      // required: [true, "Password is required"],
    },
    joiningDate: {
      type: String,
      required: [true, "Joining date is required"],
    },
    joiningTime: {
      type: String,
      required: [true, "Joining time is required"],
    },
    role: {
      type: String,
      enum: {
        values: roles,
        message: "{VALUE} is not matched",
      },
      default: "user",
    },
    avatar: {
      type: String,
      required: [true, "Avatar is required"],
      match: [/(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, "Invalid URL format"],
    },
    permissions: [],
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
  if (!this.isModified("password")) {
    next();
  }

  this.password = bcrypt.hashSync(this.password, 10);
});

const User = model("User", UserSchema);

export default User;
