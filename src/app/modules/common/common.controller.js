import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { CommonService } from "./common.services.js";

const getSystemConfig = catchAsync(async (req, res) => {

  const result = await CommonService.getSystemConfig();

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "System config retrieved successfully!",
    meta: null,
    data: result,
  });
});

export const CommonController = {
  getSystemConfig,
};
