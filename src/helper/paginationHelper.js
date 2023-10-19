const calculationPagination = (options) => {
  // Extracts the page, limit, sortBy, and sortOrder from the options object
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";

  // Calculates the skip value based on the page and limit
  const skip = (page - 1) * limit;

  // Returns the calculated pagination options
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const PaginationHelpers = {
  calculationPagination,
};
