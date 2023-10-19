import { PaginationHelpers } from "../../../helper/paginationHelper.js";
import { questionSearchableFields } from "./question.constants.js";
import Question from "./question.model.js";

const addQuestion = async (payload) => {
  const result = await Question.create(payload);

  return result;
};

const deleteOneQuestion = async (id) => {
  const result = await Question.findByIdAndDelete(id);

  return result;
};

const deleteManyQuestion = async (ids) => {
  const result = await Question.deleteMany({ _id: { $in: ids } });

  return result;
};

const updateReadCount = async (id) => {
  const result = await Question.findByIdAndUpdate(id, {
    isRead: true,
  });

  return result;
};

const getAllQuestion = async (filters, paginationOptions) => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: questionSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculationPagination(paginationOptions);

  const sortConditions = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Question.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Question.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const QuestionService = {
  addQuestion,
  deleteOneQuestion,
  deleteManyQuestion,
  updateReadCount,
  getAllQuestion,
};
