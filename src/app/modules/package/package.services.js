import { PaginationHelpers } from "../../../helper/paginationHelper.js";
import cloudinary from "../../middleware/cloudinary.js";
import Search from "../search/search.model.js";
import { packageSearchableFields } from "./package.constants.js";
import Package from "./package.model.js";

const createPackage = async (payload) => {
  const { area, country, countryCode, alias, packageTags, name } = payload;
  payload.locationDetails = {
    area,
    country,
    countryCode,
    alias,
  };

  if (packageTags) {
    let tags = [];
    for (const item of packageTags) {
      tags.push({
        title: item,
      });
    }
    payload.tags = tags;
  }

  const existedSearchParamsWithName = await Search.find({ title: name });
  const existedSearchParamsWithAlias = await Search.find({
    title: { $regex: alias, $options: "i" },
  });

  if (!existedSearchParamsWithName.length) {
    await Search.create({ title: name });
  }
  if (!existedSearchParamsWithAlias.length) {
    await Search.create({ title: alias });
  }

  const result = await Package.create(payload);

  return result;
};

const updateOnePackage = async (id, payload) => {
  const {
    area,
    country,
    countryCode,
    alias,
    packageTags,
    name,
    deletedFeaturedPicture,
    removedItems,
  } = payload;
  payload.locationDetails = {
    area,
    country,
    countryCode,
    alias,
  };

  if (packageTags) {
    let tags = [];
    for (const item of packageTags) {
      tags.push({
        title: item,
      });
    }
    payload.tags = tags;
  }

  if (deletedFeaturedPicture?.cloudinaryId) {
    await cloudinary.v2.uploader.destroy(deletedFeaturedPicture?.cloudinaryId);
  }

  if (removedItems.length) {
    for (const item of removedItems) {
      await cloudinary.v2.uploader.destroy(item?.cloudinaryId);
    }
  }

  const existedSearchParamsWithName = await Search.find({ title: name });
  const existedSearchParamsWithAlias = await Search.find({
    title: { $regex: alias, $options: "i" },
  });

  if (!existedSearchParamsWithName.length) {
    await Search.create({ title: name });
  }
  if (!existedSearchParamsWithAlias.length) {
    await Search.create({ title: alias });
  }

  const result = await Package.findByIdAndUpdate(id, payload);

  return result;
};

const getOnePackage = async (id) => {
  const result = await Package.findById(id);
  return result;
};

const getAllPackage = async (filters, paginationOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculationPagination(paginationOptions);

  const { location, searchTerm, ...filtersData } = filters;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: packageSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (location) {
    const query = await Search.findById(filters.location);
    andCondition.push({
      $or: packageSearchableFields.map((field) => ({
        [field]: {
          $regex: query.title,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        const filter = {};
        if (field.includes("regularPrice")) {
          const [minValue, maxValue] = value.split(",").map(Number);
          filter["regularPrice"] = {
            $gte: minValue,
            $lte: maxValue,
          };

          return filter;
        }
        if (field.includes("tags")) {
          return {
            ["tags.title"]: value.split(","),
          };
        }
        return {
          [field]: value,
        };
      }),
    });
  }

  const sortConditions = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Package.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Package.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateVisibility = async (id) => {
  const isExist = await Package.findById(id);

  const result = await Package.findByIdAndUpdate(
    { _id: id },
    { isSelected: !isExist.isSelected }
  );

  return result;
};

const updatePopularity = async (id) => {
  const isExist = await Package.findById(id);

  const result = await Package.findByIdAndUpdate(
    { _id: id },
    { isPopular: !isExist.isPopular }
  );

  return result;
};

const deleteOnePackage = async (id) => {
  const exist = await Package.findById(id);

  const featured = await cloudinary.v2.uploader.destroy(
    exist?.featuredPicture?.cloudinaryId
  );

  const deletedResult = [];
  for (const img of exist.pictures) {
    const picture = await cloudinary.v2.uploader.destroy(img.cloudinaryId);
    deletedResult.push(picture);
  }

  if (featured.result === "ok" && deletedResult.length) {
    const result = await Package.findByIdAndDelete(id);

    return result;
  }
};

const deleteManyPackage = async (ids) => {
  const result = await Package.find({ _id: { $in: ids } });

  const deletedResult = [];
  for (const item of result) {
    const deletedData = await cloudinary.v2.uploader.destroy(
      item?.featuredPicture?.cloudinaryId
    );
    deletedResult.push(deletedData);
    for (const imgItem of item.pictures) {
      const deletedData = await cloudinary.v2.uploader.destroy(
        imgItem?.cloudinaryId
      );
      deletedResult.push(deletedData);
    }
  }

  if (deletedResult.length) {
    await Package.deleteMany({ _id: { $in: ids } });
    return deletedResult;
  }
};

export const packageService = {
  createPackage,
  getOnePackage,
  getAllPackage,
  updateVisibility,
  updatePopularity,
  deleteOnePackage,
  deleteManyPackage,
  updateOnePackage,
};
