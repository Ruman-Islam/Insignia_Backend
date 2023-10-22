import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError.js";
import cloudinary from "../../middleware/cloudinary.js";
import Admin, { SystemConfig } from "./admin.model.js";
import config from "../../../config/index.js";
import { generateAdminId } from "../auth/auth.utils.js";
import { adminSearchableFields } from "./admin.constants.js";
import { PaginationHelpers } from "../../../helper/paginationHelper.js";
import User from "../user/user.model.js";

const getAdminList = async (filters, paginationOptions) => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: adminSearchableFields.map((field) => ({
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

  const result = await Admin.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Admin.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateUser = async (id, payload) => {
  const result = await User.findByIdAndUpdate(id, payload);

  return result;
};

const createAdmin = async (payload) => {
  const isExistEmail = await Admin.findOne({ email: payload.email });
  if (isExistEmail) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is already in use");
  }

  payload.password = config.default_admin_pass;
  payload.userId = await generateAdminId();

  const result = await Admin.create(payload);

  return result;
};

const deleteOneAdmin = async (id, user) => {
  const isSuperAdmin = await Admin.findById(id);

  if (isSuperAdmin.role === "super_admin") {
    throw new ApiError(httpStatus.BAD_REQUEST, "You cannot delete SUPER ADMIN");
  }

  if (isSuperAdmin.userId === user.userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You cannot delete yourself!");
  }

  const result = await Admin.findByIdAndDelete(id);

  return result;
};

const deleteManyAdmin = async (ids, user) => {
  const admins = await Admin.find({ _id: { $in: ids } });

  const isSuperAdmin = admins.find((u) => u.role === "super_admin");

  if (isSuperAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You cannot delete SUPER ADMIN");
  }

  const self = admins.find((u) => u.userId === user.userId);

  if (self) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You cannot delete yourself!");
  }

  const result = await Admin.deleteMany({ _id: { $in: ids } });

  return result;
};

const bannerImageUpload = async (payload) => {
  // const systemConfig = await SystemConfig.create({
  //   systemConfigId: "system_config",
  //   banner1: {
  //     cloudinaryId: "test",
  //     cloudinaryUrl: "https://rsuitejs.com/components/loader/",
  //   },
  //   banner2: {
  //     cloudinaryId: "test",
  //     cloudinaryUrl: "https://rsuitejs.com/components/loader/",
  //   },
  //   banner3: {
  //     cloudinaryId: "test",
  //     cloudinaryUrl: "https://rsuitejs.com/components/loader/",
  //   },
  // });  // need to create first time

  const updatedImages = [];

  const isExist = await SystemConfig.findOne({
    systemConfigId: "system_config",
  });

  for (const item of payload) {
    await cloudinary.v2.uploader.destroy(isExist[item.bannerId].cloudinaryId);
  }

  for (const item of payload) {
    const result = await SystemConfig.findOneAndUpdate({
      systemConfigId: "system_config",
      [item.bannerId]: {
        cloudinaryId: item.cloudinaryId,
        cloudinaryUrl: item.cloudinaryUrl,
      },
    });

    updatedImages.push(result);
  }

  const systemConfig = await SystemConfig.findOne({
    systemConfigId: "system_config",
  });

  return systemConfig;
};

const windowImageUpload = async (payload) => {
  // const systemConfig = await SystemConfig.findOneAndUpdate({
  //   systemConfigId: "system_config",
  //   window1: {
  //     cloudinaryId: "test",
  //     cloudinaryUrl: "https://rsuitejs.com/components/loader/",
  //   },
  //   window2: {
  //     cloudinaryId: "test",
  //     cloudinaryUrl: "https://rsuitejs.com/components/loader/",
  //   },
  //   window3: {
  //     cloudinaryId: "test",
  //     cloudinaryUrl: "https://rsuitejs.com/components/loader/",
  //   },
  //   window4: {
  //     cloudinaryId: "test",
  //     cloudinaryUrl: "https://rsuitejs.com/components/loader/",
  //   },
  // });  // need to create first time

  const updatedImages = [];

  const isExist = await SystemConfig.findOne({
    systemConfigId: "system_config",
  });

  for (const item of payload) {
    await cloudinary.v2.uploader.destroy(isExist[item.windowId].cloudinaryId);
  }

  for (const item of payload) {
    const result = await SystemConfig.findOneAndUpdate({
      systemConfigId: "system_config",
      [item.windowId]: {
        cloudinaryId: item.cloudinaryId,
        cloudinaryUrl: item.cloudinaryUrl,
      },
    });

    updatedImages.push(result);
  }

  const systemConfig = await SystemConfig.findOne({
    systemConfigId: "system_config",
  });

  return systemConfig;
};

const bannerTitleUpdate = async (payload) => {
  const updatedSystemConfig = await SystemConfig.findOneAndUpdate(
    {
      systemConfigId: "system_config",
    },
    { bannerTitle: payload },
    { new: true }
  );

  return updatedSystemConfig;
};

const getSystemConfig = async () => {
  const systemConfig = await SystemConfig.findOne({
    systemConfigId: "system_config",
  });

  return systemConfig;
};

export const AdminService = {
  getAdminList,
  createAdmin,
  deleteOneAdmin,
  deleteManyAdmin,
  bannerImageUpload,
  windowImageUpload,
  bannerTitleUpdate,
  getSystemConfig,
  updateUser
};
