import { PaginationHelpers } from "../../../helper/paginationHelper.js";
import { reviewSearchableFields } from "./reviews.constants.js";
import Review from "./reviews.model.js";

const submitReview = async (payload) => {
  const result = await Review.create(payload);
  return result;
};

const updateReadCount = async (id) => {
  const result = await Review.findByIdAndUpdate(id, {
    isRead: true,
  });

  return result;
};

const updateVisibility = async (id) => {
  const isExist = await Review.findById(id);

  const result = await Review.findByIdAndUpdate(
    { _id: id },
    { isSelected: !isExist.isSelected }
  );

  return result;
};

const deleteOneReview = async (id) => {
  const result = await Review.findByIdAndDelete(id);

  return result;
};

const deleteManyReview = async (ids) => {
  const result = await Review.deleteMany({ _id: { $in: ids } });

  return result;
};

const getAllReview = async (filters, paginationOptions) => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: reviewSearchableFields.map((field) => ({
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

  const result = await Review.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Review.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const ReviewService = {
  submitReview,
  updateReadCount,
  updateVisibility,
  deleteOneReview,
  deleteManyReview,
  getAllReview,
};
