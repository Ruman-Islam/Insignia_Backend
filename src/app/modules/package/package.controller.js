import httpStatus from "http-status";
import pick from "../../../shared/pick.js";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { paginationFields } from "../../../constants/pagination.js";
import { packageService } from "./package.services.js";
import { packageFilterableField } from "./package.constants.js";

const createPackage = catchAsync(async (req, res) => {
  const { ...packageData } = req.body;

  const result = await packageService.createPackage(packageData);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Package created successfully",
    meta: null,
    data: result,
  });
});

const updateOnePackage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { ...updatedData } = req.body;

  const result = await packageService.updateOnePackage(id, updatedData);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Package updated successfully",
    meta: null,
    data: result,
  });
});

const updateVisibility = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await packageService.updateVisibility(id);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Package updated successfully",
    meta: null,
    data: result,
  });
});

const deleteOnePackage = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await packageService.deleteOnePackage(id);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Package deleted successfully",
    meta: null,
    data: result,
  });
});

const deleteManyPackage = catchAsync(async (req, res) => {
  const deleteData = req.body;

  const result = await packageService.deleteManyPackage(deleteData);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Packages deleted successfully",
    meta: null,
    data: result,
  });
});

const updatePopularity = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await packageService.updatePopularity(id);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Package updated successfully",
    meta: null,
    data: result,
  });
});

const getOnePackage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await packageService.getOnePackage(id);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Package retrieved successfully",
    meta: null,
    data: result,
  });
});

const getAllPackage = catchAsync(async (req, res) => {
  const filters = pick(req.query, packageFilterableField);

  const paginationOptions = pick(req.query, paginationFields);

  const { meta, data } = await packageService.getAllPackage(
    filters,
    paginationOptions
  );

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Package retrieved successfully",
    meta,
    data,
  });
});

export const PackageController = {
  createPackage,
  getOnePackage,
  getAllPackage,
  updateVisibility,
  updatePopularity,
  deleteOnePackage,
  deleteManyPackage,
  updateOnePackage,
};
