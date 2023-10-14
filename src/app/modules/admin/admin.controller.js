import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { AdminService } from "./admin.services.js";

const bannerImageUpload = catchAsync(async (req, res) => {
  const files = req.body;

  const result = await AdminService.bannerImageUpload(files);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Image uploaded successfully",
    meta: null,
    data: result,
  });
});

const windowImageUpload = catchAsync(async (req, res) => {
  const files = req.body;

  const result = await AdminService.windowImageUpload(files);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Image uploaded successfully",
    meta: null,
    data: result,
  });
});

const bannerTitleUpdate = catchAsync(async (req, res) => {
  const { ...titles } = req.body;

  const result = await AdminService.bannerTitleUpdate(titles);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Title updated successfully",
    meta: null,
    data: result,
  });
});

const getSystemConfig = catchAsync(async (req, res) => {
  const result = await AdminService.getSystemConfig();

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "System config retrieved successfully!",
    meta: null,
    data: result,
  });
});

export const AdminController = {
  bannerImageUpload,
  windowImageUpload,
  bannerTitleUpdate,
  getSystemConfig,
};
