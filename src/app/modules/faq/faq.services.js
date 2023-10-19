import { PaginationHelpers } from "../../../helper/paginationHelper.js";
import { faqSearchableFields } from "./faq.constant.js";
import FAQ from "./faq.model.js";

const createFaq = async (payload) => {
  const result = await FAQ.create(payload);

  return result;
};

const getAllFaq = async (filters, paginationOptions) => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: faqSearchableFields.map((field) => ({
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

  const result = await FAQ.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await FAQ.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getOneFaq = async (id) => {
  const result = await FAQ.findById(id);
  return result;
};

const deleteOneFaq = async (id) => {
  const result = await FAQ.findByIdAndDelete(id);
  const faq = await FAQ.find({});
  const total = await FAQ.countDocuments();

  return {
    meta: {
      total,
    },
    data: faq,
  };
};

const deleteManyFaq = async (ids) => {
  const result = await FAQ.deleteMany({ _id: { $in: ids } });

  return result;
};

const updateOneFaq = async (payload) => {
  await FAQ.findByIdAndUpdate({ _id: payload.id }, payload);
  const faq = await FAQ.find({});
  const total = await FAQ.countDocuments();

  return {
    meta: {
      total,
    },
    data: faq,
  };
};

const updateVisibility = async (id) => {
  const isExist = await FAQ.findById(id);

  const result = await FAQ.findByIdAndUpdate(
    { _id: id },
    { isSelected: !isExist.isSelected }
  );

  return result;
};

export const FaqService = {
  createFaq,
  getAllFaq,
  getOneFaq,
  deleteOneFaq,
  updateOneFaq,
  updateVisibility,
  deleteManyFaq,
};
