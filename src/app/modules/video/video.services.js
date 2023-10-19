import { PaginationHelpers } from "../../../helper/paginationHelper.js";
import { videoSearchableFields } from "./video.constant.js";
import Video from "./video.model.js";

const addVideo = async (payload) => {
  const result = await Video.create(payload);
  return result;
};

const updateOneVideo = async (payload) => {
  const result = await Video.findByIdAndUpdate({ _id: payload.id }, payload);

  return result;
};

const updateVisibility = async (id) => {
  const isExist = await Video.findById(id);

  const result = await Video.findByIdAndUpdate(
    { _id: id },
    { isSelected: !isExist.isSelected }
  );

  return result;
};

const deleteOneVideo = async (id) => {
  const result = await Video.findByIdAndDelete(id);

  return result;
};

const deleteManyVideo = async (ids) => {
  const result = await Video.deleteMany({ _id: { $in: ids } });

  return result;
};

const getAllVideo = async (filters, paginationOptions) => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: videoSearchableFields.map((field) => ({
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

  const result = await Video.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Video.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const VideoService = {
  addVideo,
  updateOneVideo,
  updateVisibility,
  deleteOneVideo,
  deleteManyVideo,
  getAllVideo,
};
