import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import { PhotoService } from "./photos.services.js";
import sendResponse from "../../../shared/sendResponse.js";
import { paginationFields } from "../../../constants/pagination.js";
import pick from "../../../shared/pick.js";
import { photosFilterableField } from "./photos.constants.js";

const addPhoto = catchAsync(async (req, res) => {
  const { ...photoData } = req.body;

  const result = await PhotoService.addPhoto(photoData);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Photo added successfully",
    meta: null,
    data: result,
  });
});

const deleteOnePhoto = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await PhotoService.deleteOnePhoto(id);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Photo deleted successfully",
    meta: null,
    data: result,
  });
});

const deleteManyPhoto = catchAsync(async (req, res) => {
  const deleteData = req.body;

  const result = await PhotoService.deleteManyPhoto(deleteData);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Photo deleted successfully",
    meta: null,
    data: result,
  });
});

const updateVisibility = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await PhotoService.updateVisibility(id);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Photo updated successfully",
    meta: null,
    data: result,
  });
});

const getAllPhoto = catchAsync(async (req, res) => {
  const filters = pick(req.query, photosFilterableField);
  const paginationOptions = pick(req.query, paginationFields);

  const { meta, data } = await PhotoService.getAllPhoto(
    filters,
    paginationOptions
  );

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Photos retrieved successfully",
    meta,
    data,
  });
});

export const PhotosController = {
  addPhoto,
  deleteOnePhoto,
  deleteManyPhoto,
  updateVisibility,
  getAllPhoto,
};
