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
    role: {
      type: String,
      enum: {
        values: ["traveler", "admin", "super_admin"],
        message: "{VALUE} is not matched",
      },
      default: "traveler",
    },
    password: {
      type: String,
      match: [
        /^(?=.*[A-Za-z0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
        "Invalid password format",
      ],
    },
    resetToken: {
      type: String,
    },
    traveler: {
      type: Schema.Types.ObjectId,
      ref: 'Traveler',
      required: [true, 'Traveler id is missing!'],
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
