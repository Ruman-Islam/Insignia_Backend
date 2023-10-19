import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import { ReviewService } from "./reviews.services.js";
import sendResponse from "../../../shared/sendResponse.js";
import { paginationFields } from "../../../constants/pagination.js";
import pick from "../../../shared/pick.js";
import { reviewFilterableField } from "./reviews.constants.js";

const submitReview = catchAsync(async (req, res) => {
  const { ...ReviewData } = req.body;

  const result = await ReviewService.submitReview(ReviewData);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Thank you for reviewing us!",
    meta: null,
    data: result,
  });
});

const updateReadCount = catchAsync(async (req, res) => {
  const { id } = req.params;
  
  const result = await ReviewService.updateReadCount(id);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review updated successfully",
    meta: null,
    data: result,
  });
});

const updateVisibility = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ReviewService.updateVisibility(id);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review updated successfully",
    meta: null,
    data: result,
  });
});

const deleteOneReview = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewService.deleteOneReview(id);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review deleted successfully",
    meta: null,
    data: result,
  });
});

const deleteManyReview = catchAsync(async (req, res) => {
  const deleteData = req.body;

  const result = await ReviewService.deleteManyReview(deleteData);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review deleted successfully",
    meta: null,
    data: result,
  });
});

const getAllReview = catchAsync(async (req, res) => {
  const filters = pick(req.query, reviewFilterableField);

  const paginationOptions = pick(req.query, paginationFields);
  const { meta, data } = await ReviewService.getAllReview(
    filters,
    paginationOptions
  );

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review retrieved successfully",
    meta,
    data,
  });
});

export const ReviewController = {
  submitReview,
  updateReadCount,
  updateVisibility,
  deleteOneReview,
  deleteManyReview,
  getAllReview,
};
