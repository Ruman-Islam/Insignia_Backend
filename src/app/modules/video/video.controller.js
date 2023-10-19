import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import { VideoService } from "./video.services.js";
import sendResponse from "../../../shared/sendResponse.js";
import { paginationFields } from "../../../constants/pagination.js";
import pick from "../../../shared/pick.js";
import { videoFilterableField } from "./video.constant.js";

const addVideo = catchAsync(async (req, res) => {
  const { ...VideoData } = req.body;

  const result = await VideoService.addVideo(VideoData);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Video added successfully",
    meta: null,
    data: result,
  });
});

const updateOneVideo = catchAsync(async (req, res) => {
  const { ...videoData } = req.body;

  const result = await VideoService.updateOneVideo(videoData);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Video updated successfully",
    meta: null,
    data: result,
  });
});

const updateVisibility = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await VideoService.updateVisibility(id);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Video updated successfully",
    meta: null,
    data: result,
  });
});

const deleteOneVideo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await VideoService.deleteOneVideo(id);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Video deleted successfully",
    meta: null,
    data: result,
  });
});

const deleteManyVideo = catchAsync(async (req, res) => {
  const deleteData = req.body;

  const result = await VideoService.deleteManyVideo(deleteData);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Video deleted successfully",
    meta: null,
    data: result,
  });
});

const getAllVideo = catchAsync(async (req, res) => {
  const filters = pick(req.query, videoFilterableField);
  const paginationOptions = pick(req.query, paginationFields);
  const { meta, data } = await VideoService.getAllVideo(
    filters,
    paginationOptions
  );

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Video retrieved successfully",
    meta,
    data,
  });
});

export const VideoController = {
  addVideo,
  updateOneVideo,
  updateVisibility,
  deleteOneVideo,
  deleteManyVideo,
  getAllVideo,
};
