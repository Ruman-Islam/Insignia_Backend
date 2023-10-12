import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../../config/index.js";

const AdminSchema = Schema(
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
    role: {
      type: String,
      enum: {
        values: ["user", "admin", "super_admin"],
        message: "{VALUE} is not matched",
      },
      default: "admin",
    },
    password: {
      type: String,
      match: [
        /^(?=.*[A-Za-z0-9])(?=.*[^A-Za-z0-9]).{8,}$/,
        "Invalid password format",
      ],
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

AdminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

AdminSchema.pre("save", async function (next) {
  const user = this;
  if (user.password) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );
  }
  next();
});

const Admin = model("Admin", AdminSchema);

export default Admin;
