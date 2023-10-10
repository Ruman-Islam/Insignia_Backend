import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { UserService } from "./user.services.js";

const profileUpdate = catchAsync(async (req, res) => {
  const { ...updateData } = req.body;
  const { userId } = req.user;

  const result = await UserService.profileUpdate(updateData, userId);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile update successful!",
    meta: null,
    data: result,
  });
});

const profileImageUpdate = catchAsync(async (req, res) => {
  const { ...file } = req.file;
  const { userId } = req.user;

  const result = await UserService.profileImageUpdate(file, userId);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Image updated successfully!",
    meta: null,
    data: result,
  });
});

export const UserController = {
  profileUpdate,
  profileImageUpdate,
};
