import httpStatus from "http-status";

const handleValidationError = (error) => {
  // Extract the error messages from the validation error
  const errors = Object.values(error.errors).map((el) => {
    return {
      path: el?.path,
      message: el?.message,
    };
  });

  const statusCode = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    message: "Validation Error",
    errorMessages: errors,
  };
};

export default handleValidationError;
