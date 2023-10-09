import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { UserService } from "./user.services.js";

const profileUpdate = catchAsync(async (req, res) => {
  const { ...updateData } = req.body;
  const { user } = req;

  const result = await UserService.profileUpdate(updateData, user);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile update successful!",
    meta: null,
    data: result,
  });
});

export const UserController = {
  profileUpdate,
};
