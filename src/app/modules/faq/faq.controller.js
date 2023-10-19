import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { paginationFields } from "../../../constants/pagination.js";
import { faqFilterableField } from "./faq.constant.js";
import { FaqService } from "./faq.services.js";
import pick from "../../../shared/pick.js";

const createFaq = catchAsync(async (req, res) => {
  const { ...faqData } = req.body;

  const { meta, data } = await FaqService.createFaq(faqData);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faq added successfully",
    meta,
    data,
  });
});

const getAllFaq = catchAsync(async (req, res) => {
  const filters = pick(req.query, faqFilterableField);
  const paginationOptions = pick(req.query, paginationFields);

  const { meta, data } = await FaqService.getAllFaq(filters, paginationOptions);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faq retrieved successfully",
    meta,
    data,
  });
});

const getOneFaq = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await FaqService.getOneFaq(id);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faq retrieved successfully",
    meta: null,
    data: result,
  });
});

const deleteOneFaq = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { meta, data } = await FaqService.deleteOneFaq(id);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faq deleted successfully",
    meta,
    data,
  });
});

const deleteManyFaq = catchAsync(async (req, res) => {
  const deleteData = req.body;

  const result = await FaqService.deleteManyFaq(deleteData);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faq deleted successfully",
    meta: null,
    data: result,
  });
});

const updateOneFaq = catchAsync(async (req, res) => {
  const { meta, data } = await FaqService.updateOneFaq(req.body);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faq updated successfully",
    meta,
    data,
  });
});

const updateVisibility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FaqService.updateVisibility(id);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faq updated successfully",
    meta: null,
    data: result,
  });
});

export const FaqController = {
  createFaq,
  getAllFaq,
  getOneFaq,
  deleteOneFaq,
  updateOneFaq,
  updateVisibility,
  deleteManyFaq,
};
