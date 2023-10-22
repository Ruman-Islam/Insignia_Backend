import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../../config/index.js";

const UserSchema = Schema(
  {
    blockStatus: {
      type: Boolean,
      default: false
    },
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
    role: {
      type: String,
      enum: {
        values: ["user"],
        message: "{VALUE} is not matched",
      },
      default: "user",
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
        /^(?=.*[A-Za-z0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
        "Invalid password format",
      ],
    },
    resetToken: {
      type: String,
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
