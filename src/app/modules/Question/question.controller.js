import httpStatus from "http-status";
import { QuestionService } from "./question.services.js";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { paginationFields } from "../../../constants/pagination.js";
import pick from "../../../shared/pick.js";
import { questionFilterableField } from "./question.constants.js";

const addQuestion = catchAsync(async (req, res) => {
  const { ...questionData } = req.body;

  const result = await QuestionService.addQuestion(questionData);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Question submitted successfully",
    meta: null,
    data: result,
  });
});

const deleteOneQuestion = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await QuestionService.deleteOneQuestion(id);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Question deleted successfully",
    meta: null,
    data: result,
  });
});

const deleteManyQuestion = catchAsync(async (req, res) => {
  const deleteData = req.body;

  const result = await QuestionService.deleteManyQuestion(deleteData);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Question deleted successfully",
    meta: null,
    data: result,
  });
});

const updateReadCount = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await QuestionService.updateReadCount(id);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Question updated successfully",
    meta: null,
    data: result,
  });
});

const getAllQuestion = catchAsync(async (req, res) => {
  const filters = pick(req.query, questionFilterableField);
  const paginationOptions = pick(req.query, paginationFields);

  const { meta, data } = await QuestionService.getAllQuestion(
    filters,
    paginationOptions
  );

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Question retrieved successfully",
    meta,
    data,
  });
});

export const QuestionController = {
  addQuestion,
  deleteOneQuestion,
  deleteManyQuestion,
  updateReadCount,
  getAllQuestion,
};
