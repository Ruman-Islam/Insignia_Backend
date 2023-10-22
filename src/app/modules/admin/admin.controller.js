import httpStatus from "http-status";
import pick from "../../../shared/pick.js";
import { AdminService } from "./admin.services.js";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { adminFilterableField } from "./admin.constants.js";
import { paginationFields } from "../../../constants/pagination.js";

const getAdminList = catchAsync(async (req, res) => {
  const filters = pick(req.query, adminFilterableField);
  const paginationOptions = pick(req.query, paginationFields);

  const { meta, data } = await AdminService.getAdminList(
    filters,
    paginationOptions
  );
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin retrieved successfully",
    meta,
    data,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { ...data } = req.body;

  const result = await AdminService.createAdmin(data);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created successfully",
    meta: null,
    data: result,
  });
});

const deleteOneAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { ...user } = req.user;

  const result = await AdminService.deleteOneAdmin(id, user);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin deleted successfully",
    meta: null,
    data: result,
  });
});

const deleteManyAdmin = catchAsync(async (req, res) => {
  const deleteData = req.body;
  const { ...user } = req.user;

  const result = await AdminService.deleteManyAdmin(deleteData, user);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin deleted successfully",
    meta: null,
    data: result,
  });
});

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

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { ...data } = req.body;

  const result = await AdminService.updateUser(id, data);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully!",
    meta: null,
    data: result,
  });
});

export const AdminController = {
  getAdminList,
  createAdmin,
  deleteOneAdmin,
  deleteManyAdmin,
  bannerImageUpload,
  windowImageUpload,
  bannerTitleUpdate,
  getSystemConfig,
  updateUser,
};
