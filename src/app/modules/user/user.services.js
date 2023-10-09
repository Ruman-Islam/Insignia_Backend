import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError.js";
import User from "./user.model.js";

const profileUpdate = async (payload, user) => {
  const updatedData = await User.findOneAndUpdate(
    { userId: user.userId },
    payload,
    { new: true }
  );

  if (!updatedData) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Internal Server Error!");
  }

  return updatedData;
};

export const UserService = {
  profileUpdate,
};
