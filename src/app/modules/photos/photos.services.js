import { PaginationHelpers } from "../../../helper/paginationHelper.js";
import cloudinary from "../../middleware/cloudinary.js";
import { photosSearchableFields } from "./photos.constants.js";
import Photo from "./photos.model.js";

const addPhoto = async (payload) => {
  const result = await Photo.create(payload);

  return result;
};

const deleteOnePhoto = async (id) => {
  const exist = await Photo.findById(id);

  const deletedData = await cloudinary.v2.uploader.destroy(
    exist?.photo?.cloudinaryId
  );

  if (deletedData.result === "ok") {
    const result = await Photo.findByIdAndDelete(id);

    return result;
  }
};

const deleteManyPhoto = async (ids) => {
  const result = await Photo.find({ _id: { $in: ids } });

  const deletedResult = [];
  for (const item of result) {
    const deletedData = await cloudinary.v2.uploader.destroy(
      item?.photo?.cloudinaryId
    );
    deletedResult.push(deletedData);
  }

  if (deletedResult.length) {
    await Photo.deleteMany({ _id: { $in: ids } });
    return deletedResult;
  }
};

const updateVisibility = async (id) => {
  const isExist = await Photo.findById(id);

  const result = await Photo.findByIdAndUpdate(
    { _id: id },
    { isSelected: !isExist.isSelected }
  );

  return result;
};

const getAllPhoto = async (filters, paginationOptions) => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: photosSearchableFields.map((field) => ({
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

  const result = await Photo.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Photo.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const PhotoService = {
  addPhoto,
  deleteOnePhoto,
  deleteManyPhoto,
  updateVisibility,
  getAllPhoto,
};
