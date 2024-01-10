import { searchSearchableFields } from "./search.const.js";
import Search from "./search.model.js";

const getAllQueries = async (filters) => {
  const { searchTerm } = filters;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: searchSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Search.find(whereConditions);

  const total = await Search.countDocuments(whereConditions);

  return {
    meta: {
      total,
    },
    data: result,
  };
};

export const SearchService = {
  getAllQueries,
};
