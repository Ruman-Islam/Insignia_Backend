const catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      // Execute the wrapped route handler function and await its result
      await fn(req, res, next);
    } catch (error) {
      // Forward any caught error to the next error handling middleware
      next(error);
    }
  };
};
export default catchAsync;
