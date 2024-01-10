import httpStatus from "http-status";
import pick from "../../../shared/pick.js";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { searchFilterableField } from "./search.const.js";
import { SearchService } from "./search.services.js";

const getAllQueries = catchAsync(async (req, res) => {
  const filters = pick(req.query, searchFilterableField);
  const { meta, data } = await SearchService.getAllQueries(filters);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Queries retrieved successfully",
    meta,
    data,
  });
});

export const SearchController = {
  getAllQueries,
};
