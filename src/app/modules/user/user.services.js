import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError.js";
import cloudinary from "../../middleware/cloudinary.js";
import User from "./user.model.js";
import { userSearchableFields } from "./user.constant.js";
import { PaginationHelpers } from "../../../helper/paginationHelper.js";

const getUserList = async (filters, paginationOptions) => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: userSearchableFields.map((field) => ({
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

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getOneCustomer = async (id) => {
  const result = await User.findById(id);

  return result;
};

const deleteOneCustomer = async (id) => {
  // After creating booking segment associated booking data should be delete with user delete

  const result = await User.findByIdAndDelete(id);

  return result;
};

const deleteManyCustomer = async (ids) => {
  // After creating booking segment associated booking data should be delete with user delete
  const result = await User.deleteMany({ _id: { $in: ids } });

  return result;
};

const updateBlockStatus = async (id) => {
  const isExist = await User.findById(id);

  const result = await User.findByIdAndUpdate(
    { _id: id },
    { blockStatus: !isExist.blockStatus }
  );

  return result;
};

const profileUpdate = async (payload, userId) => {
  const updatedData = await User.findOneAndUpdate({ userId }, payload, {
    new: true,
  });

  if (!updatedData) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Internal Server Error!");
  }

  return updatedData;
};

const profileImageUpdate = async (payload, userId) => {
  const { path } = payload;

  const user = await User.findOne({ userId });

  user?.photo?.cloudinaryId &&
    (await cloudinary.v2.uploader.destroy(user?.photo?.cloudinaryId));

  const result = await cloudinary.v2.uploader.upload(path, {
    folder: "insignia/user-profile",
    use_filename: true,
  });

  const updatedData = await User.findOneAndUpdate(
    { userId },
    {
      photo: {
        cloudinaryId: result.public_id,
        cloudinaryUrl: result.secure_url,
      },
    },
    {
      new: true,
    }
  );

  if (!updatedData) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Internal Server Error!");
  }

  return updatedData;
};

export const UserService = {
  getUserList,
  getOneCustomer,
  deleteOneCustomer,
  deleteManyCustomer,
  updateBlockStatus,
  profileUpdate,
  profileImageUpdate,
};
