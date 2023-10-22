import httpStatus from "http-status";
import pick from "../../../shared/pick.js";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { UserService } from "./user.services.js";
import { userFilterableField } from "./user.constant.js";
import { paginationFields } from "../../../constants/pagination.js";

const getUserList = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableField);
  const paginationOptions = pick(req.query, paginationFields);

  const { meta, data } = await UserService.getUserList(
    filters,
    paginationOptions
  );
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    meta,
    data,
  });
});

const getOneCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserService.getOneCustomer(id);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer retrieved successfully",
    meta: null,
    data: result,
  });
});

const deleteOneCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserService.deleteOneCustomer(id);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer deleted successfully",
    meta: null,
    data: result,
  });
});

const deleteManyCustomer = catchAsync(async (req, res) => {
  const deleteData = req.body;

  const result = await UserService.deleteManyCustomer(deleteData);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer deleted successfully",
    meta: null,
    data: result,
  });
});

const updateBlockStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.updateBlockStatus(id);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Block status updated successfully",
    meta: null,
    data: result,
  });
});

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
  getUserList,
  getOneCustomer,
  deleteOneCustomer,
  deleteManyCustomer,
  updateBlockStatus,
  profileUpdate,
  profileImageUpdate,
};
